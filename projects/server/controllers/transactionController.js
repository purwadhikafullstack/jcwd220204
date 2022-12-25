const moment = require("moment")
const db = require("../models")
const automaticPaymentCheck = require("../schedule/paymentCheck")
const automaticSendMail = require("../schedule/reminderCheckin")
const emailer = require("../lib/emailer")

const fs = require("fs")
const handlebars = require("handlebars")

const transactionController = {
  paymentProof: async (req, res) => {
    try {
      const expDate = await db.Transaction.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["exp_date"],
      })
      const getExpDate = Object.values(expDate.dataValues)
      const currentDate = moment().format("YYYY-MM-DD HH:mm:ss")
      const expiredDate = moment(getExpDate[0]).format("YYYY-MM-DD HH:mm:ss")

      if (currentDate > expiredDate) {
        return res.status(400).json({
          message: "your invoice is expired",
        })
      }

      const postImg = await db.Transaction.update(
        {
          payment_proof: req.file.filename,
          status: "waiting for tenant confirmation",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )

      return res.status(200).json({
        message: "Payment successful",
        data: postImg,
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: err.message,
      })
    }
  },
  getDataTransaction: async (req, res) => {
    try {
      const get = await db.Transaction.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["exp_date", "price", "status"],
      })

      const date = Object.values(get.dataValues)
      const getPrice = Object.values(get.dataValues)

      const price = getPrice[1]
      const dateNow = moment(date[0]).add(-7, "hours").format("LLL")

      return res.status(200).json({
        message: "Get countdown",
        get,
        dateNow,
        price,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  createTransactionDummy: async (req, res) => {
    try {
      const expired_date = moment()
        .add(2, "hours")
        .format("YYYY-MM-DD HH:mm:ss")
      const start = moment().add(3, "days").format("YYYY-MM-DD HH:mm:ss")
      const end = moment().add(5, "days").format("YYYY-MM-DD HH:mm:ss")

      const foundUserById = await db.User.findByPk(req.user.id)

      const dummyTransaction = await db.Transaction.create({
        start_date: start,
        end_date: end,
        price: 30000,
        PropertyItemId: 1,
        PropertyId: 386,

        // UserId: 60,
        UserId: foundUserById.id,

        exp_date: expired_date,
        status: "waiting for payment",
      })

      automaticPaymentCheck(dummyTransaction)
      automaticSendMail(dummyTransaction)

      return res.status(200).json({
        message: "create transaction",
        data: dummyTransaction,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  transactionApprove: async (req, res) => {
    try {
      await db.Transaction.update(
        {
          status: "in progress",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )

      const findTransactionData = await db.Transaction.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          { model: db.Property },
          { model: db.PropertyItem },
          { model: db.User },
        ],
      })

      const findPropImg = await db.Property.findByPk(
        findTransactionData.Property.id,
        {
          include: [{ model: db.PropertyImage, attributes: ["image_url"] }],
        }
      )

      const findRoomImg = await db.PropertyItem.findByPk(
        findTransactionData.PropertyItem.id,
        {
          include: [{ model: db.Images, attributes: ["picture_url"] }],
        }
      )

      const getStatus = Object.values(findTransactionData.dataValues)[5]

      const getUserEmail = Object.values(findTransactionData.User.dataValues)[2]

      const getPropName = Object.values(
        findTransactionData.Property.dataValues
      )[1]

      const getPropAddress = Object.values(
        findTransactionData.Property.dataValues
      )[2]

      const getPropRules = Object.values(
        findTransactionData.Property.dataValues
      )[4]

      const getRoomType = Object.values(
        findTransactionData.PropertyItem.dataValues
      )[1]

      const getRoomCapacity = Object.values(
        findTransactionData.PropertyItem.dataValues
      )[3]

      const getStartDate = moment(findTransactionData.start_date).format(
        "DD-mm-YYYY"
      )

      const getEndDate = moment(findTransactionData.end_date).format(
        "DD-mm-YYYY"
      )
      const getPropImg = findPropImg.PropertyImages[0].image_url

      const getTotalPrice = findTransactionData.price
      const getRoomPrice = findTransactionData.PropertyItem.price
      const getRoomImg = findRoomImg.Images[0].picture_url

      const rawHtml = fs.readFileSync("templates/reminderDetail.html", "utf-8")
      const compiledHTML = handlebars.compile(rawHtml)
      const htmlresult = compiledHTML({
        getPropName,
        getPropAddress,
        getPropRules,
        getRoomType,
        getRoomCapacity,
        getStatus,
        getPropImg,
        getStartDate,
        getEndDate,
        getTotalPrice,
        getRoomPrice,
        getRoomImg,
      })

      await emailer({
        to: getUserEmail,
        html: htmlresult,
        subect: "Your Booking Detail",
        text: "Hallo",
      })

      return res.status(200).json({
        message: "payment approved",
        data: findTransactionData,
        findPropImg,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  transactionReject: async (req, res) => {
    try {
      await db.Transaction.update(
        {
          status: "waiting for payment",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      return res.status(200).json({
        message: "payment rejected",
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: err.message,
      })
    }
  },
  transactionCanceled: async (req, res) => {
    try {
      await db.Transaction.update(
        {
          status: "canceled",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      return res.status(200).json({
        message: "Canceled",
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: err.message,
      })
    }
  },
  getDataTransactionApproval: async (req, res) => {
    try {
      const findTransactionData = await db.Transaction.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          { model: db.Property },
          { model: db.PropertyItem },
          { model: db.User },
        ],
      })

      return res.status(200).json({
        message: "Get user transaction",
        data: findTransactionData,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = transactionController

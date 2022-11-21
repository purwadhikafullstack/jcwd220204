const db = require("../models")
const User = db.User
const { signToken } = require("../lib/jwt")
const { verifyGoogleToken } = require("../lib/firebase")

const authController = {
  loginWithGoogle: async (req, res) => {
    try {
      const { googleToken } = req.body

      const { email } = await verifyGoogleToken(googleToken)
      // console.log(googleToken)
      const [user] = await User.findOrCreate({
        where: { email },
        defaults: {
          is_verified: true,
        },
      })

      const token = signToken({
        id: user.id,
      })

      return res.status(201).json({
        message: "User logged in",
        data: user,
        token,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  refreshToken: async (req, res) => {
    try {
      const findUserById = await User.findByPk(req.user.id)

      const renewedToken = signToken({
        id: req.user.id,
      })

      return res.status(200).json({
        message: "Renewed user token",
        data: findUserById,
        token: renewedToken,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
}

module.exports = authController

const express = require("express")
const transactionController = require("../controllers/transactionController")
const { upload } = require("../lib/uploader")
const { verifyToken } = require("../middlewares/authMiddleware")

const router = express.Router()

router.patch(
  "/post/:id",
  upload({
    acceptedFileTypes: ["jpg", "png", "jpeg"],
    filePrefix: "payment_proof",
    maxSize: 1 * 1000000,
  }).single("payment_proof"),
  transactionController.paymentProof
)

router.post("/", verifyToken, transactionController.createTransactionDummy)

router.patch("/approve/:id", transactionController.transactionApprove)
router.patch("/reject/:id", transactionController.transactionReject)
router.patch("/canceled/:id", transactionController.transactionCanceled)
router.get("/data/:id", transactionController.getDataTransaction)
router.get("/user-data/:id", transactionController.getDataTransactionApproval)
//============
router.get("/:id", transactionController.getTransaction)
router.get("/user/:id", transactionController.getUserTransaction)

module.exports = router

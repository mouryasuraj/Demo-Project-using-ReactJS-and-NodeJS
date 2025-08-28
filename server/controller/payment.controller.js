import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import instance from "../connections/razorpay.js";
import Payment from "../models/payment.model.js";
import generateRandomNumber from "../utils/generateRandomNumber.js";
import User from "../models/user.model.js";

export const handleCreateOrder = async (req, res) => {
  try {
    const { type } = req.query;
    const loggedInUser = req.user;
    console.log(loggedInUser);

    const amount = type === "silver" ? 500000 : type === "gold" ? 700000 : 0;

    // Razor Pay - Create Order
    const options = {
      amount,
      currency: "INR",
      receipt: generateRandomNumber() + type + generateRandomNumber(),
      partial_payment: false,
      notes: {
        fullName: loggedInUser.fullName || "",
        memberShipType: type || "",
      },
    };
    const order = await instance.orders.create(options);

    const { id: orderId, currency, receipt, status, notes } = order;

    // Save order detail in DB
    const payment = new Payment({
      userId: loggedInUser._id,
      orderId,
      currency,
      amount,
      receipt,
      status,
      notes,
    });
    const savedPayment = await payment.save();
    res.json({
      message: "Order created successfully",
      order: {
        ...savedPayment.toJSON(),
        key_id: process.env.RAZORPAY_TEST_KEY_ID,
      },
    });
  } catch (error) {
    console.log("An error occured while createOrder: ", error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const handleRazorWebhook = async (req, res) => {
    try {
        const reqBody = req.body
        const signature = req.headers['X-Razorpay-Signature']
        const isWebhookValid = validateWebhookSignature(reqBody, signature, process.env.RazorPaySurajSecretKey || "RazorPaySurajSecretKey")
        console.log(isWebhookValid);
        if(!isWebhookValid){
            return res.status(400).json({message:"websignature is not valid"})
        }

        const paymentDetails = reqBody.payload.payment.entity

        // Change payment status 
        const payment = await Payment.findOne({orderId:paymentDetails.order_id})
        payment.status = paymentDetails.status

        // Make user as premium member
        if(reqBody.event==="payment.captured"){
            const user = await User.findById({_id:payment.userId})
            user.isPremium = true 
            user.memberShipType = payment.memeberShipType
        }
        // if(reqBody.event==="payment.failed"){

        // }
        
        //Send response back to razorpay
        res.json({message:"Webhook received successfully"})
        
    } catch (error) {
        console.log("An error occured in webhook: ",error)
        res.status(400).json({message:"Something went wrong"})
    }
};


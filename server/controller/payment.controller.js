import instance from "../connections/razorpay.js";
import Payment from "../models/payment.model.js";
import generateRandomNumber from "../utils/generateRandomNumber.js";

export const handleCreateOrder = async (req, res) =>{
    try {
        const {type} = req.query;
        const loggedInUser = req.user;
        console.log(loggedInUser);
        
        const amount = type==="silver" ? 500000 : type==="gold" ? 700000 : 0

        // Razor Pay - Create Order
        const options = {
            amount,
            currency:"INR",
            receipt:generateRandomNumber()+type+generateRandomNumber(),
            partial_payment:false,
            notes:{
                fullName:loggedInUser.fullName || "",
                memberShipType:type || ""
            }
        }
        const order = await instance.orders.create(options)

        const {id:orderId,currency,receipt,status,notes} = order
        

        // Save order detail in DB
        const payment = new Payment({
            userId:loggedInUser._id,
            orderId,
            currency,
            amount,
            receipt,
            status,
            notes
        })
        const savedPayment = await payment.save()
        res.json({message:"Order created successfully", order:{...savedPayment.toJSON(), key_id:process.env.RAZORPAY_TEST_KEY_ID}})
        
    } catch (error) {
        console.log("An error occured while createOrder: ",error)
        res.status(400).json({message:"Something went wrong"})
    }
}
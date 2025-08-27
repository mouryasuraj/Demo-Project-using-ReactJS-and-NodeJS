import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    receipt:{
        type:String,
        required:true
    },
    notes:{
        fullName:{
            type:String,
            required:true,
        },
        memberShipType:{
            type:String,
            required:true
        }
    },
    status:{
        type:String,
        required:true
    }
    
  },
  {
    timestamps: true,
  }
);


const Payment = mongoose.model("Payment",paymentSchema)

export default Payment;
import makeRequest from "../../../axios";

const handleVerifyPremium = async (setUser) =>{
  try {
    const res = await makeRequest.get("/user/ispremium")
    setUser(prev => {
      return {...prev, isPremium:res.data.isPremium}
    })
  } catch (error) {
    console.log("Someting went wrong: ",error)
  }
}


export const handlePayment = async (type, setUser) => {
  try {
    const res = await makeRequest.post(`/payment/createOrder?type=${type}`);
    const order = res.data.order || {}

    const {key_id, amount,currency,orderId,notes,} = order

    const options = {
      key: key_id,
      amount: amount, 
      currency: currency,
      name: "Developer Tinder",
      description: "Connect to developers accross the world",
      order_id: orderId,
      prefill: {
        name: notes.fullName,
        email: "",
        contact: "8356820591"
      },
      theme: {
        color: "#F37254",
      },
      handler:()=>{
        handleVerifyPremium(setUser)
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
};

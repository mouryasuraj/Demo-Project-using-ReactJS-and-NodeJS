import makeRequest from "../../../axios";


export const handlePayment = async (type) => {
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
        alert("Payment Successfully")
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
};

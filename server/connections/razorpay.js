import Razorpay from 'razorpay'

const instance = new Razorpay({
    key_id:process.env.RAZORPAY_TEST_KEY_ID || "rzp_test_R7flF27lPwszb6",
    key_secret:process.env.RAZORPAY_TEST_KEY_SECRET || "TALgEn1JPtRiUGRyzS4Faerl"
})

export default instance;
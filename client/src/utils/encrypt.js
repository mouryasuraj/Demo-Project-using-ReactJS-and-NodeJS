import CryptoJS from "crypto-js"

const encrypt = (dataToEncrypt) =>{
    try {
        const cipherText = CryptoJS.AES.encrypt(dataToEncrypt, import.meta.env.VITE_SECRET_KEY).toString()
        return cipherText
    } catch (error) {
        console.error("Something went wrong: ", error)
    }
    
}

export default encrypt
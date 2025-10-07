import crypto from 'crypto'
const generateRoomId = (userId, toUserId) =>{
    const id = crypto.createHash("sha256").update([userId, toUserId ].sort().join("_+=_")).digest("hex")
    return id
}

export default generateRoomId;
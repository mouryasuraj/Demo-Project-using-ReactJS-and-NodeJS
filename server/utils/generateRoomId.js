const generateRoomId = (userId, toUserId) =>{
    return [userId, toUserId ].sort().join("_+=_")
}

export default generateRoomId;
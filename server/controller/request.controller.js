import ConnectionRequest from "../models/connections.model.js";
import User from "../models/user.model.js";
import { validateReviewRequestBody, validateSendConnectionData } from "../utils/validations.js";

export const handleSendRequest = async (req, res) => {
  try {
    //Validate data
    validateSendConnectionData(req);
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    // Check to user exist in DB or not
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "toUser is not found" });
    }

    // Check connection is already sent
    const isExistingConnection = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (isExistingConnection) {
      throw new Error("Connection already exists");
    }

    // Add connection in DB
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const requestData = await connectionRequest.save();

    res.json({
      message: `${req.user.fullName} is ${status}${
        status === "interested" ? " in" : ""
      } ${toUser.fullName}`,
      data: requestData,
    });
  } catch (error) {
    console.log("Something went wrong : ", error);
    res.status(500).send("Something went wrong " + error.message);
  }
};

export const handleReviewRequest = async (req, res) => {
  try {
    validateReviewRequestBody(req);
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    const isConnectionExist = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!isConnectionExist) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    isConnectionExist.status = status;
    const acceptedUser = await isConnectionExist.save();

    res.json({
      message: "Connection request " + status + " successfully",
      acceptedUser,
    });
  } catch (error) {
    console.log("Something went wrong: ", error);
    res.status(400).json({ message: "Something went wrong" });
  }
};

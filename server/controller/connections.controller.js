import ConnectionRequest from "../models/connections.model.js";
import User from "../models/user.model.js";
import calculateSkip from "../utils/calculateSkip.js";
import { publicData } from "../utils/constants.js";

export const handleUserConnections = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const allAcceptedConnections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", publicData)
      .populate("toUserId", publicData);

    if (allAcceptedConnections.length === 0) {
      res.json({ message: "No Connection made" });
    } else {
      const filteredData = allAcceptedConnections.map((data) => {
        if (data.fromUserId._id.toString() === loggedInUser._id.toString()) {
          return data.toUserId;
        } else {
          return data.fromUserId;
        }
      });
      res.json({
        message: "Accepted Connections Request",
        data: filteredData,
      });
    }
  } catch (error) {
    console.log("Something went wrong:", error.message);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const handleUserRequests = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const allConnectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", publicData);

    if (allConnectionRequests.length === 0) {
      res.json({ message: "No request is found" });
    } else {
      res.json({ message: "Connections", data: allConnectionRequests });
    }
  } catch (error) {
    console.log("Something went wrong: ", error.message);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export const handleUserFeed = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    //Getting all the user which have connections
    const allConnectionReq = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });

    const hideFromUsersFeed = new Set();

    console.log(allConnectionReq);

    allConnectionReq.forEach((req) => {
      hideFromUsersFeed.add(req.fromUserId.toString());
      hideFromUsersFeed.add(req.toUserId.toString());
    });

    // Get all users except loggedin user and which have connections
    const users = await User.find({
      $and: [
        {
          _id: { $nin: Array.from(hideFromUsersFeed) },
        },
        {
          _id: { $ne: loggedInUser._id },
        },
      ],
    })
      .select(publicData)
      .skip(calculateSkip(page, limit))
      .limit(limit);

    if (users.length === 0) {
      return res.json({ message: "No user found" });
    }
    res.json({ message: "Feed", data: users });
  } catch (error) {
    console.log("an error occured during getting all the users", error);
    res.status(400).json({ message: "Something went wrong" });
  }
};


export const handleIsPremium = async (req,res) =>{
  try {
    const user = await User.findById(req.user._id)
    res.json({message:"isPremium", isPremium:user.isPremium})    
  } catch (error) {
    console.log("Someting went wrong: ",error)
    res.status(400).json({message:"Something went wrong"})
  }
}
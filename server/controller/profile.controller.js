import User from "../models/user.model.js";
import { publicData } from "../utils/constants.js";

export const handleProfileEdit = async (req, res) => {
  const userId = req.params.userId;
  const dataToUpdate = req.body;
  const isUpdateAllowed = Object.keys(dataToUpdate).every((field) =>
    publicData.includes(field)
  );

  try {
    if (!userId) {
      throw new Error("Id is required");
    } else if (!isUpdateAllowed) {
      throw new Error("Update is not allowed");
    } else if (req.body.skills && req.body.skills.length > 4) {
      throw new Error("Skill length exceeds 4");
    }
    const user = await User.findByIdAndUpdate(userId, dataToUpdate, {
      // returnDocument:"before",
      returnOriginal: false,
      runValidators: true, // Use to validate
    }).select(publicData);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.json({
      message: "Profile Updated Successfully",
      updatedData: user,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send("something went wrong " + error);
  }
};

const { default: mongoose } = require("mongoose");
const { Employee } = require("../models/emp.model");

const creatUser = async (req, res) => {
  // !   const { _id } = req.user; change below thing to this in future
  const { _id } = req.body;
  const { userDataBlob } = req.body;
  // * here array of object(s) should be sent always
  try {
    for (let element of userDataBlob) {
      if (!["superAdmin", "dev", "jrdev", "intern"].includes(element.empType)) {
        return res.status(400).json({
          message: `Invalid empType: ${element.empType}. Allowed values are 'superAdmin', 'dev', 'jrdev', or 'intern'.`,
        });
      }
    }

    const currentUser = await Employee.findById(
      new mongoose.Types.ObjectId(_id)
    ).select("empType -_id");

    if (currentUser && currentUser.empType === "superAdmin") {
      try {
        let newlyCreatedUsers = await Employee.create(userDataBlob);

        return res.status(200).json({
          message: "User(s) created successfully",
          userDoc: newlyCreatedUsers,
        });
      } catch (createError) {
        if (createError.name === "ValidationError") {
          return res.status(400).json({
            message: createError.errors.empPerms.message,
          });
        }

        return res.status(500).json({
          message: "Something went wrong during user creation",
          error: createError.message,
        });
      }
    } else {
      return res.status(403).json({
        message: "You are not authorized enough to perform this action.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something broke while checking creating an employee",
      error: error,
    });
  }
};

const readUserData = async (req, res) => {
  const { role, id } = req.body;

  if (!role) {
    return res.status(402).json({ message: "Role type is required" });
  }

  try {
    let query = {};
    if (role === "user" && id) {
      query = { _id: new mongoose.Types.ObjectId(id) };
    } else if (role === "superAdmin") {
      query = {};
    } else if (role === "dev" || role === "cust support") {
      query = { userType: "user" };
    } else {
      return res.status(402).json({ message: "invalid role type" });
    }
    const data = await Employee.find(query);
    return res.status(200).json({ userData: data, message: "ok!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = { creatUser, readUserData };

const jwt = require("jsonwebtoken");
const { Employee } = require("../models/emp.model");
const { default: mongoose } = require("mongoose");

const access = async (req, res, next) => {
  const { requiredPermission } = req.body;
  const { _id } = req.user;
  const ans = Employee.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(_id),
      },
      
    },
  ]);
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  // if (!token) {
  //     return res.status(401).json({ message: 'No token provided' });
  // }

  // try {
  //     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  //     req.user = decoded;
  //     next();
  // } catch (error) {
  //     if (error.name === 'TokenExpiredError') {
  //         console.log('token expire')
  //         return res.status(401).json({ message: 'Token expired', expired: true });
  //     }
  //     else {
  //         console.error(error);
  //         res.status(403).json({ message: 'Invalid token' });
  //     }
  // }
};

module.exports = access;

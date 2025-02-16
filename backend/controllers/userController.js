import asyncHandler from "express-async-handler";
import genarateToken from "../utils/genarateToken.js";
import TempUser from "../models/temp_user.model.js";
import tempEmployer from "../models/temp_emp.model.js";

export const test = (req, res) => {
  return res.status(200).json({ message: "hellow from test" });
};

// for : user register
// access: admin only
// uri : api/v1/users/register
// method : POST

export const register = asyncHandler(async (req, res) => {
  const {
    email,
    corporateTitle,
    dateJoined,
    department,
    employeeType,
    password,
  } = await req.body.data;

  const isExists = await tempEmployer.findOne({ email: email });

  if (isExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await tempEmployer.create({
    email: email,
    corporateTitle: corporateTitle,
    dateJoined: dateJoined,
    department: department,
    employeeType: employeeType,
    password: password,
  });
  // console.log(corporateTitle);
  return res.status(200).json({ message: user });
});

// for : user login
// access : anyone
// uri : api/v1/users/login
// method : POST

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const perUser = await TempUser.findOne({ username: username });
  const tempUser = await tempEmployer.findOne({ email: username });
  if (perUser && (await perUser.matchPassword(password))) {
    const token = await genarateToken(res, {
      username: username,
      role: perUser.role,
    });
    return res.status(200).json({ message: "Login successfull" });
  } else if (tempUser && (await tempUser.matchPassword(password))) {
    const token = await genarateToken(res, {
      username: username,
      role: "temperary",
    });
    return res.status(200).json({ message: "Login successfull" });
  } else {
    res.status(401);
    throw new Error("Username or password invalid");
  }
});

// for : user logout
// accees : logged user
// uri : api/v1/users/logout
// method: GET

export const logout = asyncHandler((req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: `logout succesfull` });
});

// for : user getDetails
// access : loged user
// uri : api/v1/users/getUser
// method : GET

export const getUser = asyncHandler(async (req, res) => {
  return res.status(200).json({ message: res.user });
});

export const regConfirm = asyncHandler(async (req, res) => {
  console.log("regConfirm");
  const { formData } = await req.body;
  // console.log(formData.get("fullname"));
  // console.log(formData.get("profilePhoto").name);
  console.log(formData.get("fullname"));
  return res.status(200).json({ message: "reg confimation" });
});

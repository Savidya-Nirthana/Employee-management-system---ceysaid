import asyncHandler from "express-async-handler";
import genarateToken from "../utils/genarateToken.js";

export const test = (req, res) => {
  return res.status(200).json({ message: "hellow from test" });
};

// for : user register
// access: admin only
// uri : api/v1/users/register
// method : POST

export const register = asyncHandler(async (req, res) => {
  res.status(200);
  throw new Error("something went wrong");
  return res.status(200).json({ message: "hellow from register" });
});

// for : user login
// access : anyone
// uri : api/v1/users/login
// method : POST

export const login = asyncHandler(async (req, res) => {
  // const {username, password} = req.body;

  const {username, password} = req.body;
  const token = await genarateToken(res, username);
  console.log(token);
  return res.status(200).json({ "username": username, "password" : password });

});

// for : user logout
// accees : logged user
// uri : api/v1/users/logout
// method: GET

export const logout = asyncHandler((req, res) => {
  return res.status(200).json({ message: "Hellow from logout" });
});

// for : user getDetails
// access : loged user
// uri : api/v1/users/getUser
// method : GET

export const getUser = asyncHandler(async(req, res) => {
  console.log(res.user);
  return res.status(200).json({ message: res.user });
});

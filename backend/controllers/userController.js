import asyncHandler from "express-async-handler";
import genarateToken from "../utils/genarateToken.js";
import tempEmployer from "../models/temp_emp.model.js";
import PermenentUser from "../models/permenent_emp.model.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const test = (req, res) => {
  return res.status(200).json({ message: "hellow from test" });
};

// for : user register
// access: admin only
// uri : api/v1/users/register
// method : POST

export const register = asyncHandler(async (req, res) => {
  const {
    userId,
    corporateTitle,
    dateJoined,
    department,
    employeeType,
    password,
  } = await req.body.data;

  const isExists = await tempEmployer.findOne({ userId: userId });

  if (isExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await tempEmployer.create({
    userId: userId,
    corporateTitle: corporateTitle,
    dateJoined: dateJoined,
    department: department,
    employeeType: employeeType,
    password: password,
  });
  // console.log(corporateTitle);
  return res.status(200).json({ message: "User create successfull" });
});

// for : user login
// access : anyone
// uri : api/v1/users/login
// method : POST

export const login = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;
  const perUser = await PermenentUser.findOne({ userId: userId });
  const tempUser = await tempEmployer.findOne({ userId: userId });
  if (perUser && (await perUser.matchPassword(password))) {
    const token = await genarateToken(res, {
      userId: userId,
      role: perUser.role,
    });
    return res.status(200).json({ message: "Login successfull" });
  } else if (tempUser && (await tempUser.matchPassword(password))) {
    const token = await genarateToken(res, {
      userId: userId,
      role: "temperary",
    });
    return res.status(200).json({ message: "Login successfull" });
  } else {
    res.status(401);
    throw new Error("UserId or password invalid");
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


export const getPermUser = asyncHandler(async(req, res) => {
  console.log(res.user);
  res.status(200);
  res.json(res.user);
  return res.user
})

export const regConfirm = asyncHandler(async (req, res) => {
  const { formData } = await req.body;
  return res.status(200).json({ message: "reg confimation" });
});

export const uploadImage = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "file not found" });
    }
    const filePath = req.file.path.replace(/\\/g, "/");
    res.status(200).json({ path: filePath });
  } catch (e) {
    console.log(e);
  }
});

export const permenentReg = asyncHandler(async (req, res) => {
  const formData = req.body;
  try {
    const changeData = await tempEmployer.findOneAndUpdate(
      { userId: formData.userId },
      { profile_status: "waiting" }
    );
    const newUser = await PermenentUser.create({
      userId: formData.userId,
      fullName: formData.fullname,
      address: {
        houseNo: formData.houseNo,
        street1: formData.street1,
        street2: formData.street2,
        city: formData.city,
        district: formData.district,
        postalCode: formData.postalCode,
        gsDivision: formData.gsDivision,
        gnDivision: formData.gnDivision,
      },
      telephone: formData.telephone,
      mobile: formData.mobile,
      email: formData.email,
      dob: formData.dob,
      gender: formData.gender,
      nic: formData.nic,
      nationality: formData.nationality,
      religion: formData.religion,
      corporateDetails: {
        corporateTitle: formData.corporateTitle,
        location: formData.location,
        dateJoined: formData.dateJoined,
        department: formData.department,
        employeeType: formData.employeeType,
      },
      attachments: {
        employeeImage: formData.profile,
        nicImage: formData.nicFile,
        gramaNiladhariCertificate: formData.gnFile,
        letterOfAppointment: formData.laFile,
      },
      password: formData.password,
    });

    return res.status(200).json({ message: "Details send for approval" });
  } catch (err) {
    throw new Error("user registration fail");
  }
});

// for : temp user getDetails
// access : loged temp user
// uri : api/v1/users/getTempUser
// method : GET

export const getTempUser = asyncHandler(async (req, res) => {
  const { userId, role } = res.user.user;
  const getuser = await tempEmployer.findOne({ userId: userId });

  if (getuser) {
    res.status(200);
    res.json({ user: getuser });
  } else {
    throw new Error("Error! unauthorized access");
  }
});

// for : get pending approval data
// access : admin
// uri : api/v1/users/approvalData
// method: post

export const approvalUsers = asyncHandler(async (req, res) => {
  try {
    const response = await PermenentUser.find(
      { profile_status: "pending" },
      { password: 0 }
    );
    if (response.length > 0) {
      res.status(200).json({ users: response, count: response.length });
    } else if (response.length === 0) {
      res.status(200).json({ users: response, count: 0 });
    }
  } catch (err) {
    console.log(err);
  }
}); 

// for : get pending one approval data by ID
// access : admin
// uri : api/v1/users/getPermUser
// mothod : post 

export const approvalUserById = asyncHandler(async (req, res) => {
  const { userId } = await req.body;
  try {
    const user = await PermenentUser.findOne({ userId: userId });
    if (user) {
      res.status(200);
      res.json({ user: user });
    }
  } catch (err) {
    throw new Error("user id not found");
  }
});

// for : register user permenantly
// access : admin
// uri : api/v1/users/registerPerm
// method : post

export const registerPerm = asyncHandler(async (req, res) => {
  const { user } = await req.body;
  try {
    const userReg = await PermenentUser.findOneAndUpdate(
      { userId: user.userId },
      {
        $set: {
          "corporateDetails.corporateTitle":
            user.corporateDetails.corporateTitle,
          "corporateDetails.location": user.corporateDetails.location,
          "corporateDetails.department": user.corporateDetails.department,
          "corporateDetails.employeeType": user.corporateDetails.employeeType,
          email: user.email,
          profile_status: "active",
          role: user.role
        },
      }
    );
    if (userReg) {
      const result = await tempEmployer.deleteOne({ userId: user.userId });
      if (res) {
        res.status(200).json({ message: "Approved success!" });
      }
    } else {
      throw new Error("Registration failed");
    }
  } catch (err) {
    throw new Error("Registration failed");
  }
});

// for : get all register users
// access : admin
// uri : api/v1/users/getPermUsers
// method : post

export const getAllRegUsers = asyncHandler(async (req, res) => {
  try {
    const data = await PermenentUser.find(
      { profile_status: "active" },
      { password: 0 }
    );
    if (data.length > 0) {
      res.status(200).json({ users: data });
    }
  } catch (err) {
    console.error(err);
  }
});

// for : get profile image
// access : admin
// uri : api/v1/users/getPermUsers
// method : post

export const getProfileImage = asyncHandler(async (req, res) => {
  const { user } = await res.user;
  try {
    const userImage = await PermenentUser.findOne({ userId: user.userId });
    res.status(200);
    res.sendFile(
      path.join(__dirname, "..", userImage.attachments.employeeImage)
    );
  } catch (err) {
    console.log(err);
  }
});

export const applyChanges = asyncHandler(async (req, res) => {
  const { user } = await req.body;
  try {
    const userReg = await PermenentUser.findOneAndUpdate(
      { userId: user.userId },
      {
        $set: {
          "corporateDetails.corporateTitle":
            user.corporateDetails.corporateTitle,
          "corporateDetails.location": user.corporateDetails.location,
          "corporateDetails.department": user.corporateDetails.department,
          "corporateDetails.employeeType": user.corporateDetails.employeeType,
          email: user.email,
          profile_status: "active",
        },
      }
    );
    if (userReg) {
      res.status(200).json({ message: "User update successfull" });
    }
  } catch (error) {
    res.status(500).json({ message: "User update fail" });
  }
});

// for : change password
// access : authorized users
// uri : api/v1/users/changePassword
// method : post

export const changePassword = asyncHandler(async (req, res) => {
  const { previousPassword, newPassword } = await req.body;
  const { userId } = res.user.user;
  let error;
  try {
    const user = await PermenentUser.findOne({ userId: userId });
    if (user) {
      if (await user.matchPassword(previousPassword)) {
        const result = await PermenentUser.findOneAndUpdate(
          { userId: userId },
          { password: newPassword }
        );
        if (result) {
          res.status(200);
          res.json({ message: "Passsword update successfully" });
        }
        error = "Password update fail try again later";
      }
      error = "Previous password is not martch";
      res.status(400).json({ message: error });
    }
  } catch (err) {
    throw new Error("Password change failed");
  }
});

import {CatchAsyncError} from "../middleware/CatchAsyncError.js";
import UserService from "../services/UserService.js";
import { validateFields } from "../utils/fieldsRequired.js";
import { errorResponse, successResponse } from "../utils/responseUtil.js";
import { sendToken } from "../utils/sendToken.js";



export const userRegistration = CatchAsyncError(async(req, res) => {
   const {name, mobile: phone} = req.body;
   const fieldValidate = validateFields(name, phone);
   if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
   }

   try {
    const user = await UserService.regiserUser(phone);
    if (!user.status) {
      return res.status(400).json(errorResponse(user.message));
    }
    return res.status(201).json(
      successResponse(user.message)
    );
   } catch (err) {
      return res.status(500).json(errorResponse(err.message || 'Error during registration'));
   }
});



export const verifyOtp = CatchAsyncError(async(req, res) => {
  const {name, phone, otp: rawOtp, utm_source, utm_medium, utm_campaign} = req.body;
  const otp = Array.isArray(rawOtp) ? rawOtp.join("") : rawOtp;
  const fieldValidate = validateFields(name, phone, rawOtp);
  if (fieldValidate) {
   return res.status(400).json(errorResponse(fieldValidate)); 
  }

  try {
   const result = await UserService.verifyOtp(name, phone, otp, utm_source, utm_medium, utm_campaign, res);

   if(!result.status) {
      return res.status(400).json(errorResponse(result.message));
   }

   sendToken(result.data, 200, result.message, res);
  } catch (err) {
    return res.status(500).json(errorResponse(err.message || 'Error verifying OTP'));
  }

});



export const userLogin = CatchAsyncError(async(req, res) => {
  const {phone} = req.body;
  const fieldValidate = validateFields(phone);
  if (fieldValidate) {
   return res.status(400).json(errorResponse(fieldValidate)); 
  }

  try {
   const result = await UserService.loginRequest(phone);

   if (!result.status) {
     return res.status(400).json(errorResponse(result.message));
   }
   return res.status(200).json(successResponse(result.message));
  } catch (err) {
     return res.status(500).json(errorResponse(err.message || 'Error in Login'));
  }
});



export const loginOtpVerify = CatchAsyncError(async(req, res) => {
  const { phone, otp: rawOtp, utm_source, utm_medium, utm_campaign } = req.body;
  const otp = Array.isArray(rawOtp) ? rawOtp.join("") : rawOtp;
  const fieldValidate = validateFields(phone, otp);
  if (fieldValidate) {
   return res.status(400).json(errorResponse(fieldValidate)); 
  }

  try {
   const result = await UserService.verifyLoginOtp(phone, otp, utm_source, utm_medium, utm_campaign, res);
  if(!result.status) {
   return res.status(400).json(errorResponse(result.message));
  }
  sendToken(result.data, 200, result.message, res);
  } catch (error) {
     return res.status(500).json(errorResponse(error.message || 'Error verifying OTP'));
  }
});



export const getUser = CatchAsyncError(async(req, res) => {
  const id = req.user.id;
  try {
   const result = await UserService.getUserById(id);

   if(!result) {
      return res.status(400).json(errorResponse(result.message));
   }
   return res.status(200).json(successResponse("Profile retrieved successfully", {user: result?.data}));
  } catch (err) {
     return res.status(500).json(errorResponse(err.message || "Failed to fetch Profile"));
  } 
});



export const updateUser = CatchAsyncError(async(req, res) => {
  const userId = req.user?.id;
  const updateData = req.body;

  const allowedUpdates = ["name", "email", "profilePic"];
  const updates = Object.keys(updateData);
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if(!isValidOperation) {
    return res.status(400).json(errorResponse("Invalid updates!"))
  }

  try {
   const result = await UserService.updateUserProfile(userId, updateData);
   if (!result) {
    return res.status(400).json(errorResponse(result.message))
   }
   return res.status(200).json(successResponse("Profile updated successfully", result));
  } catch (err) {
   return res.status(500).json(errorResponse(err.message || 'Failed to update profile'));
  }
});



export const getUserOrders = CatchAsyncError(async(req, res) => {
   const userId = req.headers['x-user-id'];
   try {
      const result = await UserService.getUserOrders(userId);
   } catch (error) {
      
   }
});
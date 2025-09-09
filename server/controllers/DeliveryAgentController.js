import { CatchAsyncError } from "../middleware/CatchAsyncError.js";
import DeliveryAgentService from "../services/DeliveryAgentService.js";
import { validateFields } from "../utils/fieldsRequired.js";
import { errorResponse, successResponse } from "../utils/responseUtil.js";



// DeliveryAgent - AUTH
export const loginDeliveryPartner = CatchAsyncError(async(req, res) => {
  const {email, password} = req.body;
  const fieldValidate = validateFields(email, password);
   if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
   };

   try {
    const result = await DeliveryAgentService.login(email, password);
    if (!result) {
        return res.status(400).json(errorResponse(result.message));
    }

    res.cookie("token", result.data?.token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json(successResponse("Login successful", {data: result.data?.agentdata}));
   } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
   }
});


export const getProfile = CatchAsyncError(async(req, res) => {
  const agentId = req.user?.id;
  const fieldValidate = validateFields(agentId);
   if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
   };

   try {
    const result = await DeliveryAgentService.getProfile(agentId);
    if (!result) {
        return res.status(400).json(errorResponse(result.message));
    }
    return res.status(200).json(successResponse("Profile fetched successful", {agent: result.data}));
   } catch (error) {
    return res.status(500).json(errorResponse(error.message || 'Error retrieving profile'));
   }
});



export const updateProfile = CatchAsyncError(async(req, res, next) => {
  const agentId = req.user?.id;
  const updateData = req.body;
  const fieldValidate = validateFields(agentId);
  if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
  }

  const allowedUpdates = ["name", "phone", "vehicleNumber", "profilePic", "account_number", "bank_name", "ifsc_code", "qrCode"];
  const updates = Object.keys(updateData);
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if(!isValidOperation) {
    return res.status(400).json(errorResponse("Invalid updates!"))
  }

  try {
    const result = await DeliveryAgentService.updateProfile(agentId, updateData);
    if (!result.status) {
        return res.status(404).json(errorResponse(result.message))
    }
    return res.status(200).json(successResponse("Profile updated successful", {
        agent: result.data
    }));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
  }

});



export const updatePassword = CatchAsyncError(async(req, res, next) => {
  const agentId = req.user?.id;
  const {currentPassword, newPassword} = req.body;
  const fieldValidate = validateFields(agentId, currentPassword, newPassword);
  if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
  }

  try {
    const result = await DeliveryAgentService.updatePassword(agentId, currentPassword, newPassword);
    
    if(!result.status) {
        return res.status(400).json(errorResponse(result.message));
    }

    return res.status(200).json(successResponse("Password changes successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
  }
});



export const updateDeliveryPartnerStatus = CatchAsyncError(async(req, res, next) => {
  const agentId = req.user?.id;
  const statusValue = req.body;
  const fieldValidate = validateFields(agentId, statusValue);
  if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
  }

  try {
    const result = DeliveryAgentService.updateStatus(agentId, statusValue);
    if (! result.status) {
        return res.status(400).json(errorResponse(result.message));
    }
    return res.status(200).json(successResponse("Status changed", {
        agent: result.data
    }));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
  }
});





// DeliveryAgent - ORDERS

export const getAvailableOrder = CatchAsyncError(async(req, res) => {
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 10;

  try {
    const result = await DeliveryAgentService.getActiveOrders(page, limit);
    if (!result) {
        return res.status(400).json(errorResponse(result.message)); 
    }

    const {count, orders} = result;
    const totalPages = Math.ceil(count / limit) || 1;
    return res.status(200).json(successResponse("Active orders retrieved successful", orders, {
        current_page: page,
        per_page: limit,
        total: count,
        last_page: totalPages,
        has_more_page: page < totalPages
    }));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
  }
});

export const getAndAcceptOrder = CatchAsyncError(async(req, res) => {
   const orderId = req.params;
   const agentId = req.user?.id;
   const fieldValidate = validateFields(orderId, agentId);
   if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
   }

   try {
    const result = await DeliveryAgentService.getSingleOrder(orderId, agentId);
    if(!result.status) {
        return res.status(400).json(errorResponse(result.message));
    }

    return res.status(400).json(successResponse("Order fetched successful", {order: result.data}));
   } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
   }
});
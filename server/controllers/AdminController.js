import { CatchAsyncError } from "../middleware/CatchAsyncError.js";
import AdminService from "../services/AdminService.js";
import { validateFields } from "../utils/fieldsRequired.js";
import { errorResponse, successResponse } from "../utils/responseUtil.js";



// Admin --- AUTH

export const loginAdmin = CatchAsyncError(async(req, res) => {
   const {email, password} = req.body;
   const fieldValidate = validateFields(email, password);
   if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
   };

   try {
    const result = await AdminService.login(email, password);
    if(!result.status) {
        return res.status(400).json(errorResponse(result.message));
    }

    res.cookie("token", result.data?.token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json(successResponse("Login successful", {admin: result.data?.admindata}));
   } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
   }
});



export const adminProfile = CatchAsyncError(async(req, res) => {
    const adminId = req.user?.id;
    const fieldValidate = validateFields(adminId);
    if (fieldValidate) {
       return res.status(400).json(errorResponse(fieldValidate)); 
    }

    try {
        const result = await AdminService.getProfile(adminId);
        if (!result) {
         return res.status(400).json(errorResponse(result.message));
        }

        return res.status(200).json(successResponse("Admin profile retrieved successful", {admin : result.data}))
    } catch (error) {
       return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
    }
}); 



export const updateProfile = CatchAsyncError(async(req, res) => {
   const adminId = req.user?.id;
   const updateData = req.body;
   const fieldValidate = validateFields(adminId);
   if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
   };

   const allowedUpdates = ["name", "profilePic"];
   const updates = Object.keys(updateData);
   const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if(!isValidOperation) {
    return res.status(400).json(errorResponse("Invalid updates!"))
  }

   try {
     const result = await AdminService.updateProfile(adminId, updateData);
    if(!result.status) {
        return res.status(400).json(errorResponse(result.message));
    }
    return res.status(200).json(successResponse("Profile updated successful", {admin: result.data}));

   } catch (error) {
      return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
   }

});



export const updatePassword = CatchAsyncError(async(req, res) => {
  const adminId = req.user?.id;
  const {currentPassword, newPassword} = req.body;
  const fieldValidate = validateFields(adminId, currentPassword, newPassword);
  if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
  };

  try {
    const result = await AdminService.updatePassword(adminId, currentPassword, newPassword);
    if(!result.status) {
      return res.status(400).json(errorResponse(result.message));
    }

    return res.status(200).json(successResponse("Password changes successfully"));

  } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
  }
});



export const addAdmin = CatchAsyncError(async(req, res) => {
   const {email, password} = req.body;
   const fieldValidate = validateFields(email, password);
   if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
   };

   try {
    const result = await AdminService.addAdmin(email, password);
    if(!result.status) {
      return res.status(400).json(errorResponse(result.message));
    }
    return res.status(200).json(successResponse("Admin added successful"));
   } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
   }
});



export const getAllAdmin = CatchAsyncError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

  try {

    const result = await AdminService.getAllAdmin(page, limit);

    if(!result.status) {
        return res.status(400).json(errorResponse(result.message));
    }

    const {count, admins} = result;
    const updatedAdmins = admins.map(admin => {
        const {id, name, email} =  admin;
        return {id, name, email};
    });

    const totalPages = Math.ceil(count / limit) || 1;

    return res.status(200).json(successResponse("Admins retieved successful", updatedAdmins, {
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





// Admin - VENDOR

export const getAllVendor = CatchAsyncError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {

    const result = await AdminService.getAllVendor(page, limit);

    if(!result.status) {
        return res.status(400).json(errorResponse(result.message));
    }

    const {count, vendors} = result;
    const updatedVendors = vendors.map(vendor => {
        const {id, shopname, location, phone} =  vendor;
        return {id, shopname, location, phone};
    });

    const totalPages = Math.ceil(count / limit) || 1;

    return res.status(200).json(successResponse("Vendors retieved successful", updatedVendors, {
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



export const addVendor = CatchAsyncError(async(req, res) => {
   const {email, password} = req.body;
   const fieldValidate = validateFields(email, password);
   if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
   };

   try {
    const result = await AdminService.addVendor(email, password);
    if(!result.status) {
      return res.status(400).json(errorResponse(result.error));
    }
    return res.status(200).json(successResponse("Vendor added successful"));
   } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
   }
});


export const getSingleVendor = CatchAsyncError(async(req, res) => {
   const vendorId = req.params;
    const fieldValidate = validateFields(vendorId);
   if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
   };

   try {
    const result = await AdminService.getVendorById(vendorId);
    if(!result.status) {
      return res.status(400).json(errorResponse(result.message));
    }
    return res.status(200).json(successResponse("Vendor fetched successful", {vendor: result.data}));
   } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
   }
});




// Admin -- USER

export const getAllUser = CatchAsyncError(async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {

    const result = await AdminService.getAllUser(page, limit);

    if(!result.status) {
        return res.status(400).json(errorResponse(result.message));
    }

    const {count, users} = result;
    const updatedUsers = users.map(user => {
        const {id, name, phone, email, address} =  user;
        return {id, name, phone, email, address};
    });

    const totalPages = Math.ceil(count / limit) || 1;

    return res.status(200).json(successResponse("Users retieved successful", updatedUsers, {
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




// Admin - DELIVERY AGENT

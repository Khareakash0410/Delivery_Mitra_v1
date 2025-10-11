import { CatchAsyncError } from "../middleware/CatchAsyncError.js";
import VendorService from "../services/VendorService.js";
import { validateFields } from "../utils/fieldsRequired.js";
import { errorResponse, successResponse } from "../utils/responseUtil.js";
import { sendCookie } from "../utils/sendToken.js";





// Vendor Auth

export const loginVendor = CatchAsyncError(async(req, res) => {
    const {email, password} = req.body;
    const fieldValidate = validateFields(email, password);
    if (fieldValidate) {
     return res.status(400).json(errorResponse(fieldValidate)); 
    }
    try {
        const result = await VendorService.login(email, password);
        if(!result.status) {
         return res.status(401).json(errorResponse(result.message));
        }
        sendCookie(result.vendor, 200, result.message, res);      
    } catch (error) {
        res.status(500).json(errorResponse(error.message || "Internal Server Error"));  
    } 
});



export const getVendorProfile = CatchAsyncError(async(req, res) => {
  const vendorId = req.user?.id;
  const fieldValidate = validateFields(vendorId);
  if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
  }

  try {
     const result = await VendorService.getVendorProfile(vendorId);

    if(!result.status) {
        return res.status(400).json(errorResponse(result.message));
    }

    return res.status(200).json(successResponse("Vendor profile fetched successfully", {
        vendor: result.data
    }));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message || 'Error retrieving vendor profile'));
  }
});



export const updateVendorProfile = CatchAsyncError(async(req, res) => {
  const vendorId = req.user?.id;
  const updateData = req.body;
  const fieldValidate = validateFields(vendorId);
  if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
  }

  const allowedUpdates = ["shop_name", "gst_number", "profilePic", "shop_address", "account_number", "bank_name", "ifsc_code", "qrCode"];
  const updates = Object.keys(updateData);
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if(!isValidOperation) {
    return res.status(400).json(errorResponse("Invalid updates!"))
  }

  try {
    const result = await VendorService.updateVendorProfile(vendorId, updateData)
    if (!result.status) {
        return res.status(404).json(errorResponse(result.message))
    }
    return res.status(200).json(successResponse("Profile updated successful", {
        vendor: result.data
    }));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
  }
});



export const updateVendorPassword = CatchAsyncError(async(req, res) => {
  const vendorId = req.user?.id;
  const {currentPassword, newPassword} = req.body;
  const fieldValidate = validateFields(vendorId, currentPassword, newPassword);
  if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
  }

  try {
    const result = await VendorService.updateVendorPassword(vendorId, currentPassword, newPassword);

    if(!result.status) {
        return res.status(400).json(errorResponse(result.message));
    }

    return res.status(200).json(successResponse("Password changes successfully"));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
  }
});



export const updateStoreStatus = CatchAsyncError(async(req, res) => {
  const vendorId = req.user?.id;
  const fieldValidate = validateFields(vendorId);
  if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
  }

  try {
    const result = await VendorService.updateStoreStatus(vendorId);
    if (!result.status) {
        return res.status(400).json(errorResponse(result.message));
    }
    return res.status(200).json(successResponse("Store status changed", {
        vendor: result.data
    }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
  }
});






// Vendor Products

export const getAllCategories = CatchAsyncError(async(req, res) => {
  try {
    const result = await VendorService.getAllCategory();
    if (!result.status) {
      return res.status(400).json(errorResponse(result.message));
    }
    return res.status(200).json(successResponse(result.message, {
        category: result.data
    }));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
  }
});


export const addProduct = CatchAsyncError(async(req, res) => {
  const userId = req.user?.id;
  const {name, category, variant, description, color, size, weight,  price, platformFeesPerUnit, images} = req.body;
  const fieldValidate = validateFields(name, category, variant, description, color, size, weight,  price, platformFeesPerUnit, images, userId);
  if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
  }

  try {
    const result = await VendorService.addProduct(name, category, variant, description, color, size, weight,  price, platformFeesPerUnit, images, userId);
    if (!result.status) {
      return res.status(400).json(errorResponse(result.message));
    }

    return res.status(200).json(successResponse(result.message));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
  }
});




export const allProducts = CatchAsyncError(async(req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const vendorId = req.user?.id;
  const fieldValidate = validateFields(vendorId);
  if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
  };

  try {

    const result = await VendorService.getAllVendorProduct(page, limit, vendorId);

    if(!result.status) {
        return res.status(400).json(errorResponse(result.message));
    }

    const {count, products} = result;

    const totalPages = Math.ceil(count / limit) || 1;

    return res.status(200).json(successResponse("Products retieved successful", products, {
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



export const getProduct = CatchAsyncError(async(req, res) => {
   const {id} = req.params;
   const fieldValidate = validateFields(id);
   if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
   };

   try {
    const result = await VendorService.getProductById(id);
    if (!result.status) {
        return res.status(400).json(errorResponse(result.message));
    }

    return res.status(200).json(successResponse("Product fetched successful", {product: result.data}));
   } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
   }
});



export const updateProduct = CatchAsyncError(async(req, res) => {
   const {id} = req.params;
   const updateData = req.body;
   const fieldValidate = validateFields(id);
   if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
   };

   const allowedUpdates = ["description", "price", "platformFeesPerUnit", "stocks", "images", "options"];
   const updates = Object.keys(updateData);
   const isValidOperation = updates.every(update => allowedUpdates.includes(update));

   if(!isValidOperation) {
    return res.status(400).json(errorResponse("Invalid updates!"))
   }

   try {
    const result = await VendorService.updateProductById(id, updateData);
    if(!result.status) {
        return res.status(400).json(errorResponse(result.message));
    }

    return res.status(200).json(successResponse("Product update successful", {product: result.data}));
   } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
   }
});



export const deleteProduct = CatchAsyncError(async(req, res) => {
   const {id} = req.params;
   const fieldValidate = validateFields(id);
   if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
   };

   try {
    const result = await VendorService.deleteProductById(id);
    if(!result.status) {
        return res.status(400).json(errorResponse(result.message));
    }

    return res.status(200).json(successResponse("Product deleted successful"));
   } catch (error) {
      return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
   }
});







// Vendor Orders

export const allOrder = CatchAsyncError(async(req, res) => {
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 10;
   const {id} = req.user?.id;
   const fieldValidate = validateFields(id);
   if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
   };

   try {
    const result = await VendorService.getAllOrders(page, limit, id);
    if(!result.status) {
        return res.status(400).json(errorResponse(result.message));
    }

    const {count, orders} = result;
    const updateOrders = orders.map(order => {
        const {id, createdAt} = order;
        return {id, createdAt};
    });

    const totalPages = Math.ceil(count / limit) || 1;

    return res.status(200).json(successResponse("Order retrieved successful", updateOrders, {
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



export const getOrder = CatchAsyncError(async(req, res) => {
  const vendorId = req.user?.id;
  const {orderId} = req.params;
  const fieldValidate = validateFields(orderId);
  if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
  };

  try {
    const result = await VendorService.getOrderById(orderId, vendorId);
    if (!result.status) {
        return res.status(400).json(errorResponse(result.message));
    }

    return res.status(200).json(successResponse("Order fetched successful", {order: result.data}));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error")); 
  }
});



export const updateOrder = CatchAsyncError(async(req, res) => {
   const vendorId = req.user?.id;
   const {orderId, status} = req.body;
   const fieldValidate = validateFields(orderId, status);
   if (fieldValidate) {
    return res.status(400).json(errorResponse(fieldValidate)); 
   };

   const allowedUpdates = ["Accepted", "Rejected"];
   const isValidOperation = allowedUpdates.includes(status);
   if(!isValidOperation) {
    return res.status(400).json(errorResponse("Invalid updates!"))
   }

   try {
    const result = await VendorService.updateOrderItemsStatus(vendorId, orderId, status);

    if(!result) {
        return res.status(400).json(errorResponse(result.message));
    }

    return res.status(200).json(successResponse(`You have ${status} this order`, {orderData: result.data}));
   } catch (error) {
     return res.status(500).json(errorResponse(error.message || "Internal Server Error")); 
   }

});




export const dispatchOrder = CatchAsyncError(async(req, res) => {
   const orderId = req.params;
   const vendorId = req.user?.id

   try {
    const result = await VendorService.dispatchOrderItems(orderId, vendorId);
    if(!result) {
     return res.status(400).json(errorResponse(result.message));
    }
    return res.status(200).json(successResponse(`You have dispatched this order`));
   } catch (error) {
     return res.status(500).json(errorResponse(error.message || "Internal Server Error")); 
   }
});










// Vendor Payments

export const getDailyPayments = CatchAsyncError(async(req, res) => {

});




export const getAllPaymentsInDay = CatchAsyncError(async(req, res) => {

});
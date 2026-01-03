import { DeliveryAgents, Users, Vendors } from "../models/index.js";
import { errorResponse } from "../utils/responseUtil.js";
import { CatchAsyncError } from "./CatchAsyncError.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = CatchAsyncError(async(req, res, next) => {
   try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json(error('Authentication required', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await Users.findOne({
          where: {user_id: decoded.id}
        });
        
        if (!user) {
         return res.status(401).json(error('Invalid or expired token', 401));
        } 

        req.user = {
            id: user.user_id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            role: user.role,
            phone: user.phone
        }
      return next();

   } catch (error) {
    console.log(error);
    return res.status(401).json(errorResponse('Invalid or expired token'));
   }
});



// export const areAuthenticated = CatchAsyncError(async(req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     if (!token) {
//       return res.status(401).json(error('Authentication required', 401));
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     if(decoded.email) {
//       const vendor = await Vendor.findByPk(decoded.id);
//       if (!vendor) {
//         return res.status(401).json(error('Invalid or expired token', 401));
//       } 

//       const vendordata = vendor.get({plain: true});
//       req.user = {
//         id: vendordata.id,
//         email: vendordata.email,
//         phone: vendordata.phone,
//       }
//      return next();
//     }

//     const agent = await DeliveryAgent.findByPk(decoded.id);
//     if (!agent) {
//       return res.status(401).json(error('Invalid or expired token', 401));
//     }

//     const agentData = agent.get({plain: true});

//     req.user = {
//       id: agentData.id,
//       name: agentData.name,
//       email: agentData.email,
//       phone: agentData.phone
//     };

//     return next();
//   } catch (error) {
//     return res.status(401).json(errorResponse('Invalid or expired token'));
//   }
// });
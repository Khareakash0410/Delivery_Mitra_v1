import { CatchAsyncError } from "../middleware/CatchAsyncError.js";
import { successResponse } from "../utils/responseUtil.js";

export const logout = CatchAsyncError(async(req, res) => {
   res.status(200).clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
   }).json(successResponse("Logged out successfully"));
});
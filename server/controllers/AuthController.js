import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { successResponse } from "../utils/responseUtil";

export const logout = CatchAsyncError(async(req, res) => {
   res.status(200).clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
   }).json(successResponse("Logged out successfully"));
});
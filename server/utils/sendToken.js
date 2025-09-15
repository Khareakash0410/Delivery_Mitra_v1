export const sendToken = (user, statusCode, message, res) => {
   const token = user.generateToken();
   return res.status(statusCode).cookie("token", token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: 'None',
   }).json({
    message,
    user,
    token
   });
}; 



export const sendCookie = (user, statusCode, message, res) => {
   const token = user.generateToken();
   return res.status(statusCode).cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
   }).json({
      message, 
      user,
      token
   });
}
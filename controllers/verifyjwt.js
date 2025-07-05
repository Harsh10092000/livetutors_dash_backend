import jwt from 'jsonwebtoken';

export const verifyJwt = (req, res, next) => {
  const secretKey = process.env.NEXTAUTH_SECRET || 'your-secret-key-change-this';
  console.log("secretKey : ", secretKey);
  const token = req.headers['x-access-token'];

  const obj = JSON.parse(token);
  const extractedToken = obj.token;

  console.log(extractedToken);

  try {
    console.log("verifiedToken jwt.jsx in process ");
    const verifiedToken = jwt.verify(extractedToken, secretKey);
    console.log("verifiedToken jwt.jsx : ", verifiedToken);
    next();
  } catch (error) {
    console.log("failed");
    return res.status(200).json("failed");
  }
} 
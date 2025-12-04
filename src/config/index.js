import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const envConfig = {
  mongoURI: process.env.MONGODB_URI,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
};

export default envConfig;

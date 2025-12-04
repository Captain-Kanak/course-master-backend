import app from "./app.js";
import config from "./config/index.js";
import connectDB from "./config/db.js";

const port = config.port || 5000;

//* Start server
const startServer = async () => {
  try {
    const dbConnectionStatus = await connectDB();

    if (!dbConnectionStatus.success) {
      console.error("Failed to Connect MongoDB:", dbConnectionStatus.message);
      process.exit(1);
    }

    console.log(dbConnectionStatus.message);

    app.listen(port, () => {
      console.log("Server Listening On Port:", port);
    });
  } catch (error) {
    console.error("Error Starting Server:", error.message);
    process.exit(1);
  }
};

startServer();

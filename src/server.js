import app from "./app.js";
import config from "./config/index.js";
import connectDB from "./config/db.js";

const port = config.port;

//* Start server
const startServer = async () => {
  const dbConnectionStatus = await connectDB();

  if (dbConnectionStatus.success) {
    console.log(dbConnectionStatus.message);

    app.listen(port, () => {
      console.log("Server Listening On Port:", port);
    });
  } else {
    console.error("Failed to Connect MongoDB:", dbConnectionStatus.message);
    process.exit(1);
  }
};

startServer();

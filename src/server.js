import app from "./app.js";
import envConfig from "./config/index.js";

const port = envConfig.port || 5000;

app.listen(port, () => {
  console.log("Server Listening On Port:", port);
});

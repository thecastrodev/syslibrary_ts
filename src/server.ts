import express from "express";
import "express-async-errors";
import config_env  from "./utils/config";

import { routes } from "./routes";
import { errorInterceptor } from "./middlewares/errorInterceptor";

const app = express();

app.use(express.json());
app.use(routes);
app.use("/api/v1", routes);
app.use( errorInterceptor );

const port  = config_env.port;
const hostname = config_env.hostname;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});






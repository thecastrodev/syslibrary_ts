import express from "express";
import "express-async-errors";
import config_env  from "./utils/config";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./libs/swagger_output.json";

import { routes } from "./routes";
import { errorInterceptor } from "./middlewares/errorInterceptor";

const app = express();
app.use( errorInterceptor );

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use("/api/v1", routes);


const port  = config_env.port;
const hostname = config_env.hostname;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/api/v1/`);
});

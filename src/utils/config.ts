import { config } from "dotenv";

config();

const config_env = {
  port: Number(process.env.PORT_API) || 3000,
  hostname: process.env.HOSTNAME_API || "localhost",
  jwt_key: process.env.JWT_KEY || ""
};

export default config_env;
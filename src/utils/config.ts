import { config } from "dotenv";

config();

const config_env = {
  port: Number(process.env.PORT_API) || 3000,
  hostname: process.env.HOSTNAME_API || "localhost",
  api_url: process.env.API_URL || "http://localhost:3000",
  jwt_key: process.env.JWT_KEY || "s"
};

export default config_env;
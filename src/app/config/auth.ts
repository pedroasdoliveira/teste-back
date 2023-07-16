export default {
  secret: process.env.ACCESS_TOKEN_SECRET || "mysecret",
  expiresIn: "2h",
  refreshSecret: process.env.REFRESH_TOKEN_SECRET || "mysecret",
  refreshExpiresIn: "24h",
};

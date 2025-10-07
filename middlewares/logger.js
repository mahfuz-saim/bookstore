const fs = require("fs");
exports.loggerMiddleware = function (req, res, next) {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}`;
  fs.appendFile("server.log", log + "\n", (err) => {
    if (err) console.error("Error writing to log file:", err);
  });
  next();
};

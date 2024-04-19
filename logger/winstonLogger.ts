import winston from "winston"

const devConfiguration = {
  transports: [
    new winston.transports.File({
      level: "error",
      filename: "logs/error/error.log",
    }),
    new winston.transports.File({
      level: "info",
      filename: "logs/info/info.log",
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    winston.format.align(),
    winston.format.printf(
      (info) => `${info.level} -> ${[info.timestamp]} :: ${info.message}`
    )
  ),
}

let logger

if (process.env.NODE_ENV == "development") {
  logger = winston.createLogger(devConfiguration)
}

export default logger

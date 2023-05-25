import fs from "fs";
import winston, { format } from "winston";
import "winston-daily-rotate-file";
import { logDir, logLevel } from "../config";

// Create log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

/**
 * Create a new winston logger.
 */
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      level: "info",
    }),
    new winston.transports.DailyRotateFile({
      format: format.combine(format.timestamp(), format.json()),
      maxFiles: "14d",
      level: logLevel,
      dirname: logDir,
      datePattern: "YYYY-MM-DD",
      filename: "%DATE%-debug.log",
    }),
  ],
});

export const logStream = {
  /**
   * A writable stream for winston logger.
   */
  write(message: any) {
    logger.info(message.toString());
  },
};

export default logger;

/**
 * @file setupEnv.js
 * @description
 * This file is responsible for setting up the environment variables for the application.
 * It uses the dotenv package to load environment variables from a .env file.
 * It checks the NODE_ENV variable to determine which .env file to load:
 * - If NODE_ENV is 'test', it loads variables from .env.test.
 * - Otherwise, it loads variables from the default .env file.
 */

const dotenv = require("dotenv");
const path = require("path");

if (process.env.NODE_ENV === "test") {
  dotenv.config({
    path: path.resolve(process.cwd(), ".env.test"),
  });
} else {
  dotenv.config();
}

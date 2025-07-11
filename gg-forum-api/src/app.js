// Entry point for the application

require("./Commons/setupEnv");

const createServer = require("./Infrastructures/http/createServer");
const container = require("./Infrastructures/container");

(async () => {
  const server = await createServer(container);
  await server.start();
  console.log(`server start at ${server.info.uri}`);
})();

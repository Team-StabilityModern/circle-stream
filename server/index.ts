import Fastify from "fastify";
import fastifyWebsocket, { SocketStream } from "fastify-websocket";
import controllers from "./src/controllers";
const fastify = Fastify({
  logger: {
    level: "trace",
  },
});

const options = {
  port: 3000,
  ip: "0.0.0.0",
};

fastify.register(fastifyWebsocket);

// Register all controllers.
controllers.forEach((c) => c(fastify));

fastify.listen(options.port, options.ip, (err) => {
  if (err) {
    fastify.log.error(err.toString());
    process.exit(1);
  }
});


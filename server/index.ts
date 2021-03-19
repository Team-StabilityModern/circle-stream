import Fastify from "fastify";
import fastifyWebsocket from "fastify-websocket";
import controllers from "./src/controllers";

/** The fastify instance */
const fastify = Fastify({
  logger: {
    level: "trace",
  },
});

/** The fastify options */
const options = {
  port: 3000,
  ip: "0.0.0.0",
};

// Register FastifyWebsocket.
fastify.register(fastifyWebsocket);

// Register all controllers.
controllers.forEach((c) => c(fastify));

// Listen.
fastify.listen(options.port, options.ip, (err) => {
  if (err) {
    fastify.log.error(err.toString());
    process.exit(1);
  }
});

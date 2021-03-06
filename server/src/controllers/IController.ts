import type { FastifyInstance } from "fastify";

/**
 * A standard controller.
 */
export type IController = (fastify: FastifyInstance) => void;

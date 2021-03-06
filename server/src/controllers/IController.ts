import type { FastifyInstance } from "fastify";

export type IController = (fastify: FastifyInstance) => void;

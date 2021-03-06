import type { FastifyRequest } from "fastify";
import type { RouteGenericInterface } from "fastify/types/route";
import type { Server, IncomingMessage } from "node:http";

/**
 * A FastifyRequest with the normal feature.
 */
export type FastifyNormalRequest = FastifyRequest<RouteGenericInterface, Server, IncomingMessage>;

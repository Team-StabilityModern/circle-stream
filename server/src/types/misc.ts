import { FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage } from "node:http";

export type FastifyNormalRequest = FastifyRequest<RouteGenericInterface, Server, IncomingMessage>;

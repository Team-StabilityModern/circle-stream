import type { SocketStream } from "fastify-websocket";
import type { IParam } from "../../types/IParam";
import { MessageType } from "../../types/MessageArchitect";
import Connections from '../../Connections';
import { createResponseJson } from "../../types/IResponse";
import type { FastifyNormalRequest } from "../../types/misc";

const connections = Connections.Instance;

/**
 * the action to do when somebody joined.
 */
export function joined(
  connection: SocketStream,
  { ip, log }: FastifyNormalRequest,
  { as }: IParam,
): void {
  const joinMessage = createResponseJson(as, ip, MessageType.USER_JOIN, "");
  log.info(`${as} (${ip}) joined.`);

  connections.push(connection);
  connections.forEach((c) => c.socket.send(joinMessage));
}

export function joinedWrapper(
  connection: SocketStream,
  request: FastifyNormalRequest,
  param: IParam,
): () => void {
  return () => joined(connection, request, param);
}
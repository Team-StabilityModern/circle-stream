import type { SocketStream } from "fastify-websocket";
import type { IParam } from "../../types/IParam";
import { MessageType } from "../../types/MessageArchitect";
import Connections from '../../Connections';
import { createResponseJson } from "../../types/IResponse";
import type { FastifyNormalRequest } from "../../types/misc";

const connections = Connections.Instance;

/**
 * the action to do when somebody left.
 */
export function left(
  connection: SocketStream,
  { ip, log }: FastifyNormalRequest,
  { as }: IParam,
): void {
  const message = createResponseJson(as, ip, MessageType.USER_LEFT, "");
  log.info(`${as} quitted.`);

  connections.push(connection);
  connections.forEach((c) => c.socket.send(message));
}

export function leftWrapper(
  connection: SocketStream,
  request: FastifyNormalRequest,
  param: IParam,
): () => void {
  return () => left(connection, request, param);
}

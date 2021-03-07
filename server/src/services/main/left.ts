import type { SocketStream } from "fastify-websocket";
import type { IParam } from "../../types/IParam";
import { MessageType } from "../../types/MessageArchitect";
import Connections from '../../Connections';
import { createResponseJson } from "../../types/IResponse";
import type { FastifyNormalRequest } from "../../types/misc";

/**
 * The action to do when somebody left (connection closed).
 */
export function left(
  connection: SocketStream,
  { log }: FastifyNormalRequest,
  { channel, as }: IParam,
): void {
  const connections = Connections.getInstance(channel);
  log.info(`${as} left.`);

  // Construct the response.
  const message = createResponseJson(as, MessageType.USER_LEFT, "");
  // Remove this connection from the connection pool.
  connections.remove(as);
  // Send the message to every connections.
  connections.forEach((c) => c.socket.send(message));
}

/**
 * The wrapper to be used on "close" event of WebSocket.
 * @param request The request from wsHandler()
 * @param params The parameter of the request from wsHandler()
 * @returns The function that can be used directly in `.on("close")`
 */
export function leftWrapper(
  connection: SocketStream,
  request: FastifyNormalRequest,
  param: IParam,
): () => void {
  return () => left(connection, request, param);
}

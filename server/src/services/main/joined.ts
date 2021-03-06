import type { SocketStream } from "fastify-websocket";
import type { IParam } from "../../types/IParam";
import { MessageType } from "../../types/MessageArchitect";
import Connections from '../../Connections';
import { createResponseJson } from "../../types/IResponse";
import type { FastifyNormalRequest } from "../../types/misc";

const connections = Connections.Instance;

/**
 * The action to do when somebody joined (connection opened).
 */
export function joined(
  connection: SocketStream,
  { ip, log }: FastifyNormalRequest,
  { as }: IParam,
): void {
  log.info(`${as} (${ip}) joined.`);

  // Construct the response.
  const joinMessage = createResponseJson(as, ip, MessageType.USER_JOIN, "");
  // Push this connection to the connection pool.
  connections.push(connection);
  // Send the joinMessage to every connections.
  connections.forEach((c) => c.socket.send(joinMessage));
}

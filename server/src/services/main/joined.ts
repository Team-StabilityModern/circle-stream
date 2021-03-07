import type { SocketStream } from "fastify-websocket";
import type { IParam } from "../../types/IParam";
import { MessageType } from "../../types/MessageArchitect";
import Connections from '../../Connections';
import { createResponseJson } from "../../types/IResponse";
import type { FastifyNormalRequest } from "../../types/misc";
import { CustomCloseCode } from "../../types/CustomCloseCode";

/**
 * The action to do when somebody joined (connection opened).
 */
export function joined(
  connection: SocketStream,
  { log }: FastifyNormalRequest,
  { channel, as }: IParam,
): void {
  const connections = Connections.getInstance(channel);
  // Push this connection to the connection pool.
  if (connections.push(as, connection)) {
    log.info(`${as} joined.`);
    // Construct the response.
    const joinMessage = createResponseJson(as, MessageType.USER_JOIN, "");
    // Send the joinMessage to every connections.
    connections.forEach((c) => c.socket.send(joinMessage));
  } else {
    log.info(`there are already a ${as} joined. ending this session.`);
    connection.socket.close(CustomCloseCode.UserDuplicated);
  }
}

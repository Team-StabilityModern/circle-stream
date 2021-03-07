import Connections from "../../Connections";
import type { IParam } from "../../types/IParam";
import { createResponseJson } from "../../types/IResponse";
import {
  IsMessageArchitectFromUser,
  MessageType,
} from "../../types/MessageArchitect";
import type { FastifyNormalRequest } from "../../types/misc";

/**
 * Return the suitable log based on the MessageType.
 * @param as The sender.
 * @param mt The message type.
 * @returns The suitable log message.
 */
const sendWhat = (as: string, mt: MessageType): string => {
  switch (mt) {
    case MessageType.BINARY:
      return `${as} sent a binary.`;
    case MessageType.PLAIN:
      return `${as} sent a plain text.`;
    default:
      return `${as} sent a ${mt}`;
  }
};

/**
 * The action to do when somebody sent a message. ("message" emitted)
 */
export function onMessage(
  { log }: FastifyNormalRequest,
  { channel, as }: IParam,
  message: string
): void {
  const connections = Connections.getInstance(channel);

  try {
    // WOULD RAISE AN EXCEPTION: wrapped with a try block.
    // The deserialized message in JSON.
    const deserialized = JSON.parse(message.toString());

    if (!IsMessageArchitectFromUser(deserialized)) {
      log.warn(`${as} sent a invalid message.`);
      console.warn(deserialized);
      return;
    }

    log.info(sendWhat(as, deserialized.type));

    // Construct the response.
    const data = createResponseJson(
      as,
      deserialized.type,
      deserialized.data
    );

    // Send the response to every connections.
    connections.forEach((c) => c.socket.send(data));
  } catch (e: unknown) {
    log.warn(
      `${as} sent something which made something throw an error`
    );
    log.debug(`Exception: ${(e as object).toString()}`);
    log.debug(`User sent: ${message}`);
  }
}

/**
 * The wrapper to be used on "message" event of WebSocket.
 * @param request The request from wsHandler()
 * @param params The parameter of the request from wsHandler()
 * @returns The function that can be used directly in `.on("message")`
 */
export function onMessageWrapper(
  request: FastifyNormalRequest,
  params: IParam,
): (message: string) => void {
  return (message) => onMessage(request, params, message);
}

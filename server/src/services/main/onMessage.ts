import Connections from "../../Connections";
import type { IParam } from "../../types/IParam";
import { createResponseJson } from "../../types/IResponse";
import {
  IsMessageArchitectFromUser,
  MessageType,
} from "../../types/MessageArchitect";
import type { FastifyNormalRequest } from "../../types/misc";

const connections = Connections.Instance;

const sendWhat = (as: string, mt: MessageType) => {
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
 * the action to do when somebody sent a message.
 */
export function onMessage(
  { ip, log }: FastifyNormalRequest,
  { as }: IParam,
  message: string
): void {
  try {
    const deserialized = JSON.parse(message.toString());
    if (!IsMessageArchitectFromUser(deserialized)) {
      log.warn(`${as} sent a invalid message.`);
      console.warn(deserialized);
      return;
    }

    log.info(sendWhat(as, deserialized.type));
    const data = createResponseJson(
      as,
      ip,
      deserialized.type,
      deserialized.data
    );

    connections.forEach((c) => c.socket.send(data));
  } catch (e: unknown) {
    log.warn(
      `${as} (${ip}) sent something which made something throw an error`
    );
    log.debug(`Exception: ${(e as object).toString()}`);
    log.debug(`User sent: ${message}`);
  }
}

export function onMessageWrapper(
  request: FastifyNormalRequest,
  params: IParam,
): (arg0: string) => void {
  return (message) => onMessage(request, params, message);
}

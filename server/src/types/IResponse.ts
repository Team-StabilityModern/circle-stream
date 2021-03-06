import { MessageArchitect, MessageType } from "./MessageArchitect";

export interface IResponse extends MessageArchitect {
  as: string;
  ip: string;
}

export function createResponse(
  as: string,
  ip: string,
  type: MessageType,
  data: string,
): IResponse {
  return { as, ip, type, data };
}

export function createResponseJson(
  as: string,
  ip: string,
  type: MessageType,
  data: string,
): string {
  return JSON.stringify(createResponse(as, ip, type, data));
}

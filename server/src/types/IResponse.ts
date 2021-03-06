import { MessageArchitect, MessageType } from "./MessageArchitect";

/**
 * The response to the client.
 * 
 * It depends on MessageArchitect, but add the sender and the source ip.
 */
export interface IResponse extends MessageArchitect {
  /** Who sent it? */
  as: string;
  /** Where is <as> from? */
  ip: string;
}

/**
 * The sugar function to create a IResponse.
 * @param as see IResponse.as
 * @param ip see IResponse.ip
 * @param type see MessageArchitect.type
 * @param data see MessageArchitect.data
 * @returns the constructed IResponse
 */
export function createResponse(
  as: string,
  ip: string,
  type: MessageType,
  data: string,
): IResponse {
  return { as, ip, type, data };
}

/**
 * Just like CreateResponse but serialize response with JSON.
 * @returns JSON.stringify(createResponse(...))
 */
export function createResponseJson(
  as: string,
  ip: string,
  type: MessageType,
  data: string,
): string {
  return JSON.stringify(createResponse(as, ip, type, data));
}

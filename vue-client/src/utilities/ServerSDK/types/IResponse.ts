// forked from server at bd78f1d58931880fd087a761a84bf85e4a2f9169.

import {
  IsMessageArchitect,
  MessageArchitect,
  MessageType,
} from "./MessageArchitect";

/**
 * The response to the client.
 *
 * It depends on MessageArchitect, but add the sender.
 */
export interface IResponse extends MessageArchitect {
  /** Who sent it? */
  as: string;
}

export function IsIResponse(data: unknown): data is IResponse {
  const d = data as IResponse;

  return IsMessageArchitect(data) && typeof d.as === "string";
}

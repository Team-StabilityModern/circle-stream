import type { MessageArchitect } from "./architect";
import type { MessageTypeForClient } from "./client";

export function CreateMessageArchitect(
  type: MessageTypeForClient,
  data: string,
  contentType?: string
): MessageArchitect {
  return { type, data, contentType };
}

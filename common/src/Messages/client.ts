import type { MessageType } from "./type";

export type MessageTypeForClient =
  | MessageType.PLAIN
  | MessageType.DATA_URI
  | MessageType.CUSTOM;

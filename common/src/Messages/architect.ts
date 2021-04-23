import type { MessageType } from "./type";

/**
 * A message architect. It is also the request from client.
 */
 export interface MessageArchitect {
  /**
   * The type of the message.
   */
  type: MessageType;
  /**
   * When the type is `custom`, it will need to
   * define it explicitly.
   */
  contentType?: string;
  /**
   * The data.
   *
   * If the type is plain, the data should be the plain text,
   * otherwise, it should be the text encoded with base64.
   *
   * For service notifications, it should be empty.
   */
  data: string;
}

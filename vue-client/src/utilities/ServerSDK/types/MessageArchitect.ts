export enum MessageType {
  /**
   * Plain text
   */
  PLAIN = "plain",
  /**
   * Binary data. When using it, the data should be
   * encoded with Base64.
   */
  BINARY = "binary",
  /**
   * Using when an user joined.
   * Can be only used when processing the response.
   */
  USER_JOIN = "user_join",
  /**
   * Using when an user left.
   * Can be only used when processing the response.
   */
  USER_LEFT = "user_left",
  /**
   * Using when remote has closed the connection.
   */
  CONNECTION_CLOSED = "connection_closed",
}

export type MessageTypeForClient = MessageType.BINARY | MessageType.PLAIN;

/**
 * A message architect. It is also the request from client.
 */
export interface MessageArchitect {
  /**
   * The type of the message.
   */
  type: MessageType;
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

export function IsMessageArchitect(val: unknown): val is MessageArchitect {
  const v = val as MessageArchitect;

  return (
    // val should be an object
    typeof val === "object" &&
    // val.type should be string (though it is a enum)
    typeof v.type === "string" &&
    // val.data should be string
    typeof v.data === "string"
  );
}

export function CreateMessageArchitect(
  type: MessageTypeForClient,
  data: string
): MessageArchitect {
  return { type, data };
}

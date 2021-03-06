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
   */
  USER_JOIN = "user_join",
  /**
   * Using when an user left.
   */
  USER_LEFT = "user_left",
}

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

export function IsMessageArchitectFromUser(val: unknown): val is MessageArchitect {
  const v = val as MessageArchitect;

  return (
    // val is an instance of MessageArchitect
    IsMessageArchitect(val)
    // and its v.type should be either PLAIN or BINARY.
    && (
      v.type === MessageType.PLAIN
      || v.type == MessageType.BINARY
    )
  );
}
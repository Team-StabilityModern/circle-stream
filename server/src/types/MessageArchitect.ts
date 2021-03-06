export enum MessageType {
  PLAIN = "plain",
  BINARY = "binary",
  USER_JOIN = "user_join",
  USER_LEFT = "user_left",
}

export interface MessageArchitect {
  type: MessageType;
  /**
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
    typeof val === "object" &&
    v.type &&
    typeof v.data === "string"
  );
}

export function IsMessageArchitectFromUser(val: unknown): val is MessageArchitect {
  const v = val as MessageArchitect;

  return (
    IsMessageArchitect(val)
    && (
      v.type === MessageType.PLAIN
      || v.type == MessageType.BINARY
    )
  );
}
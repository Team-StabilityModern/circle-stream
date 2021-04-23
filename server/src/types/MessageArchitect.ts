export enum MessageType {
  /**
   * Plain text
   */
  PLAIN = "plain",
  /**
   * A Data URI. Suitable for non-streamed data.
   * 
   * It should be a valid URI just like this:
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
   */
  DATA_URI = "data_uri",
  /**
   * A data with the custom content type.
   * 
   * You have to specify `contentType` explicitly.
   */
  CUSTOM = "custom",
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
  const hasContentType = (type: MessageType, contentType: string | undefined): boolean => {
    if (!(v.type === MessageType.CUSTOM)) return true;
    return !!contentType;
  }

  return (
    // val is an instance of MessageArchitect
    IsMessageArchitect(val)
    // and its v.type should be either PLAIN, DATA_URI and custom data.
    && (
      v.type === MessageType.PLAIN
      || v.type === MessageType.DATA_URI
      || v.type === MessageType.CUSTOM
    )
    && hasContentType(v.type, v.contentType)
  );
}
export enum MessageType {
  /**
   * Plain text
   */
  PLAIN = "plain",
  /**
   * A picture.
   *
   * You have to specify `contentType` explicitly.
   */
  PICTURE = "picture",
  /**
   * A picture.
   *
   * You have to specify `contentType` explicitly.
   */
  VIDEO = "video",
  /**
   * A picture.
   *
   * You have to specify `contentType` explicitly.
   */
  AUDIO_STREAM = "audio_stream",
  /**
   * A picture.
   *
   * You have to specify `contentType` explicitly.
   */
  VIDEO_STREAM = "video_stream",
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

export type MessageTypeForClient =
  | MessageType.PLAIN
  | MessageType.PICTURE
  | MessageType.VIDEO
  | MessageType.AUDIO_STREAM
  | MessageType.VIDEO_STREAM
  | MessageType.CUSTOM;

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

export function CreateMessageArchitect(
  type: MessageTypeForClient,
  data: string,
  contentType?: string
): MessageArchitect {
  return { type, data, contentType };
}

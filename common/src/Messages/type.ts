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
  /**
   * Using when the connection closed.
   */
  CONNECTION_CLOSED = "connection_closed",
}

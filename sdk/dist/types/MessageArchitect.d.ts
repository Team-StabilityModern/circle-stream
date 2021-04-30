export declare enum MessageType {
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
    CONNECTION_CLOSED = "connection_closed"
}
export declare type MessageTypeForClient = MessageType.PLAIN | MessageType.DATA_URI | MessageType.CUSTOM;
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
export declare function IsMessageArchitect(val: unknown): val is MessageArchitect;
export declare function CreateMessageArchitect(type: MessageTypeForClient, data: string, contentType?: string): MessageArchitect;
//# sourceMappingURL=MessageArchitect.d.ts.map
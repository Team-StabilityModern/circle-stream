"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageArchitect = exports.IsMessageArchitect = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    /**
     * Plain text
     */
    MessageType["PLAIN"] = "plain";
    /**
     * A Data URI. Suitable for non-streamed data.
     *
     * It should be a valid URI just like this:
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
     */
    MessageType["DATA_URI"] = "data_uri";
    /**
     * A data with the custom content type.
     *
     * You have to specify `contentType` explicitly.
     */
    MessageType["CUSTOM"] = "custom";
    /**
     * Using when an user joined.
     */
    MessageType["USER_JOIN"] = "user_join";
    /**
     * Using when an user left.
     */
    MessageType["USER_LEFT"] = "user_left";
    /**
     * Using when the connection closed.
     */
    MessageType["CONNECTION_CLOSED"] = "connection_closed";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
function IsMessageArchitect(val) {
    const v = val;
    return (
    // val should be an object
    typeof val === "object" &&
        // val.type should be string (though it is a enum)
        typeof v.type === "string" &&
        // val.data should be string
        typeof v.data === "string");
}
exports.IsMessageArchitect = IsMessageArchitect;
function CreateMessageArchitect(type, data, contentType) {
    return { type, data, contentType };
}
exports.CreateMessageArchitect = CreateMessageArchitect;
//# sourceMappingURL=MessageArchitect.js.map
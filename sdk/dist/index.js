"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotBrowserEnvironment_1 = require("./types/errors/NotBrowserEnvironment");
const IResponse_1 = require("./types/IResponse");
function debug(message) {
    console.debug(`ServerSdk: ${message}`);
}
function warn(message) {
    console.warn(`ServerSdk: ${message}`);
}
class CSBrowserSdk {
    constructor(address, channel, user) {
        this.address = address;
        this.channel = channel;
        this.user = user;
        this.closed = false;
        /**
         * The listener called when WebSocket received @see IResponse . To register, use the `.push()` method.
         */
        this.onMessageListeners = [];
        /**
         * The listener called when WebSocket closed. To register, use the `.push()` method.
         */
        this.onClosedListeners = [];
        debug("constructor() was called");
        if (!globalThis.WebSocket) {
            throw new NotBrowserEnvironment_1.NotBrowserEnvironment("globalThis.WebSocket is null.");
        }
        this.websocket = new WebSocket(`ws://${address}/${channel}/${user}`);
        this.websocket.addEventListener("close", this.onClose.bind(this));
        this.websocket.addEventListener("message", this.onMessage.bind(this));
    }
    get Address() {
        debug("getting Address");
        return this.address;
    }
    get Channel() {
        debug("getting Channel");
        return this.channel;
    }
    get User() {
        debug("getting User");
        return this.user;
    }
    get Closed() {
        debug("getting Closed");
        return this.closed;
    }
    get CloseCode() {
        debug("getting ClosedCode");
        return this.closeCode;
    }
    sendMessage(message) {
        debug("sendMessage() was called");
        if (this.Closed) {
            debug("remote has been closed; ignoring request.");
        }
        else {
            debug("remote is working; send request.");
            this.websocket.send(JSON.stringify(message));
        }
    }
    closeConnection() {
        this.websocket.close();
    }
    onClose(c) {
        debug("onClosed() was called");
        this.closed = true;
        this.closeCode = c.code;
        debug("starting calling all onClosedListeners");
        this.onClosedListeners.forEach((listener) => listener(c.code));
    }
    onMessage(m) {
        debug("onMessage() was called");
        try {
            debug("starting parsing received data");
            const message = JSON.parse(m.data.toString());
            if (IResponse_1.IsIResponse(message)) {
                debug("recevied a valid IResponse");
                debug("starting calling all onMessageListeners");
                this.onMessageListeners.forEach((listener) => listener(message));
            }
            else {
                warn(`Received an invalid object`);
                console.warn(message);
            }
        }
        catch (e) {
            warn(`Received an unparsable object.`);
            if (e)
                warn(e.toString());
        }
    }
}
exports.default = CSBrowserSdk;
//# sourceMappingURL=index.js.map
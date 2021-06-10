import { onClosedListener } from "./types/listeners/onClosedListener";
import { onMessageListener } from "./types/listeners/onMessageListener";
import { MessageArchitect } from "./types/MessageArchitect";
export default class CSBrowserSdk {
    private address;
    private channel;
    private user;
    private readonly websocket;
    private closed;
    private closeCode;
    /**
     * The listener called when WebSocket received @see IResponse . To register, use the `.push()` method.
     */
    readonly onMessageListeners: onMessageListener[];
    /**
     * The listener called when WebSocket closed. To register, use the `.push()` method.
     */
    readonly onClosedListeners: onClosedListener[];
    constructor(address: string, channel: string, user: string);
    get Address(): string;
    get Channel(): string;
    get User(): string;
    get Closed(): boolean;
    get CloseCode(): number | undefined;
    sendMessage(message: MessageArchitect): void;
    private onClose;
    private onMessage;
}
//# sourceMappingURL=index.d.ts.map
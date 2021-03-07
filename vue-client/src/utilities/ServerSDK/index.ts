import { IsIResponse } from "./types/IResponse";
import { onClosedListener } from "./types/listeners/onClosedListener";
import { onMessageListener } from "./types/listeners/onMessageListener";
import { MessageArchitect } from "./types/MessageArchitect";

function debug(message: string): void {
  console.debug(`ServerSdk: ${message}`);
}

function warn(message: string): void {
  console.warn(`ServerSdk: ${message}`);
}

export default class ServerSdk {
  private readonly websocket: WebSocket;
  private closed: boolean = false;
  private closeCode: number | undefined;

  /**
   * The listener called when WebSocket received @see IResponse . To register, use the `.push()` method.
   */
  readonly onMessageListeners: onMessageListener[] = [];
  /**
   * The listener called when WebSocket closed. To register, use the `.push()` method.
   */
  readonly onClosedListeners: onClosedListener[] = [];

  constructor(private ip: string, private user: string) {
    debug("constructor() was called");
    this.websocket = new WebSocket(`ws://${ip}:3000/${user}`);
    this.websocket.addEventListener('close', this.onClose.bind(this));
    this.websocket.addEventListener('message', this.onMessage.bind(this));
  }

  get IP(): string {
    debug("getting IP");
    return this.ip;
  }

  get User(): string {
    debug("getting User");
    return this.user;
  }

  get Closed(): boolean {
    debug("getting Closed");
    return this.closed;
  }

  get CloseCode(): number | undefined {
    debug("getting ClosedCode");
    return this.closeCode;
  }

  sendMessage(message: MessageArchitect): void {
    debug("sendMessage() was called");
    
    if (this.Closed) {
      debug("remote has been closed; ignoring request.")
    } else {
      debug("remote is working; send request.")
      this.websocket.send(JSON.stringify(message));
    }
  }

  private onClose(c: CloseEvent) {
    debug("onClosed() was called");
    this.closed = true;
    this.closeCode = c.code;

    debug("starting calling all onClosedListeners");
    this.onClosedListeners.forEach(listener => listener(c.code));
  }

  private onMessage(m: MessageEvent) {
    debug("onMessage() was called");

    try {
      debug("starting parsing received data");
      const message: unknown = JSON.parse(m.data.toString());

      if (IsIResponse(message)) {
        debug("recevied a valid IResponse");
        debug("starting calling all onMessageListeners");
        this.onMessageListeners.forEach(listener => listener(message));
      } else {
        warn(`Received an invalid object`);
        console.warn(message);
      }
    } catch (e) {
      warn(`Received an unparsable object: ${(e as object).toString()}`);
    }
  }
}

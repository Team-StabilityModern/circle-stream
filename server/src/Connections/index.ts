import type { SocketStream } from "fastify-websocket";
import Pino from "pino";

const log = Pino();

/**
 * The pool stored all the WebSocket connections.
 */
export default class Connections {
  /**
   * The data structure stored all the WebSocket connections.
   */
  private readonly connections: SocketStream[] = [];
  /**
   * The singleton instance.
   */
  private static instance: Connections;

  private constructor() {
    log.trace("called constructor()")
  }

  static set logLevel(level: string) {
    log.level = level;
  }

  /**
   * Get the singleton instance.
   */
  static get Instance() {
    log.trace("getting Instance")
    if (!this.instance) {
      log.debug("Instance was not created before, creating one.")
      this.instance = new Connections();
    } else {
      log.debug("Instance was created before, reusing one.")
    }
    return this.instance;
  }

  /**
   * Push the connection to this pool.
   */
  push(connection: SocketStream): void {
    log.trace("called push()");
    this.connections.push(connection);
  }

  /**
   * Run the callbackfn for every connections in this pool.
   */
  forEach(callbackfn: (value: SocketStream, index: number, array: SocketStream[]) => void): void {
    log.trace("called forEach()");
    this.connections.forEach(callbackfn);
  }

  /**
   * Remove the given connection from this pool.
   */
  remove(connection: SocketStream): void {
    log.trace("called remove()");
    this.connections.filter((v) => v !== connection);
  }
}

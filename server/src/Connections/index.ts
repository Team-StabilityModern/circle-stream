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
  private connections: Record<string, SocketStream> = {};
  /**
   * The singleton instance.
   */
  private static instances: Record<string, Connections> = {};

  private constructor() {
    log.trace("called constructor()");
  }

  static set logLevel(level: string) {
    log.level = level;
  }

  /**
   * Get the singleton instance.
   */
  static getInstance(id: string) {
    log.trace(`getting Instance ${id}`);

    if (!this.instances[id]) {
      log.debug("Instance was not created before, creating one.");
      this.instances[id] = new Connections();
    } else {
      log.debug("Instance was created before, reusing one.");
    }
    return this.instances[id];
  }

  /**
   * Push the connection to this pool.
   * 
   * @returns Are there are any duplicated items?
   */
  push(id: string, connection: SocketStream): boolean {
    log.trace("called push()");
    
    if (this.get(id)) {
      log.debug(`there are already a ${id} in connections.`);
      return false;
    }

    log.debug(`there are no ${id} in connections. pushing one.`)
    this.connections[id] = connection;
    return true;
  }

  /**
   * Get the specified connection.
   * @param id the Connection id
   * @returns If there are none, return null.
   */
  get(id: string): SocketStream | null {
    log.trace("called get()");
    return this.connections[id] || null;
  }

  /**
   * List all online ID.
   */
  listAllId(): string[] {
    return Object.keys(this.connections);
  }

  /**
   * Run the callbackfn for every connections in this pool.
   */
  forEach(
    callbackfn: (
      value: SocketStream,
      id: String
    ) => void
  ): void {
    log.trace("called forEach()");

    this.listAllId().forEach((key) => callbackfn(this.connections[key], key));
  }

  /**
   * Remove the given connection from this pool.
   */
  remove(id: string): void {
    log.trace("called remove()");
    delete this.connections[id];
  }
}

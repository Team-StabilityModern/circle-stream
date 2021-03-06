import type { SocketStream } from "fastify-websocket";
import Pino from "pino";

const log = Pino();

export default class Connections {
  private readonly connections: SocketStream[] = [];
  private static instance: Connections;
  private constructor() {
    log.trace("called constructor()")
  }

  static set logLevel(level: string) {
    log.level = level;
  }

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

  push(connection: SocketStream): void {
    log.trace("called push()");
    this.connections.push(connection);
  }

  forEach(callbackfn: (value: SocketStream, index: number, array: SocketStream[]) => void): void {
    log.trace("called forEach()");
    this.connections.forEach(callbackfn);
  }

  remove(connection: SocketStream): void {
    log.trace("called remove()");
    this.connections.filter((v) => v !== connection);
  }
}

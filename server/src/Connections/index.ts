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
    if (!this.instance) this.instance = new Connections();
    return this.instance;
  }

  push(connection: SocketStream): void {
    this.connections.push(connection);
  }

  forEach(callbackfn: (value: SocketStream, index: number, array: SocketStream[]) => void): void {
    this.connections.forEach(callbackfn);
  }

  remove(connection: SocketStream): void {
    this.connections.filter((v) => v !== connection);
  }
}

export class NotBrowserEnvironment extends Error {
  constructor(why: string) {
    super(`Not a browser environment, because ${why}`);
    this.name = "NotBrowserEnvironment";
  }
}

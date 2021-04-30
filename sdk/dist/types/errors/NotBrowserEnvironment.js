"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotBrowserEnvironment = void 0;
class NotBrowserEnvironment extends Error {
    constructor(why) {
        super(`Not a browser environment, because ${why}`);
        this.name = "NotBrowserEnvironment";
    }
}
exports.NotBrowserEnvironment = NotBrowserEnvironment;
//# sourceMappingURL=NotBrowserEnvironment.js.map
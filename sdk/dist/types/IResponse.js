"use strict";
// forked from server at bd78f1d58931880fd087a761a84bf85e4a2f9169.
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsIResponse = void 0;
const MessageArchitect_1 = require("./MessageArchitect");
function IsIResponse(data) {
    const d = data;
    return MessageArchitect_1.IsMessageArchitect(data) && typeof d.as === "string";
}
exports.IsIResponse = IsIResponse;
//# sourceMappingURL=IResponse.js.map
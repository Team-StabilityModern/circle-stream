"use strict";
// forked from e93fedcbd7180d9c570d6ab37543b67972aa0207
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHumanReadableCloseCode = exports.CustomCloseCode = void 0;
var CustomCloseCode;
(function (CustomCloseCode) {
    CustomCloseCode[CustomCloseCode["UserDuplicated"] = 4000] = "UserDuplicated";
})(CustomCloseCode = exports.CustomCloseCode || (exports.CustomCloseCode = {}));
const customCloseCodeDesc = {
    4000: "有人已經用您指定的名稱加入此頻道了。",
};
function getHumanReadableCloseCode(code) {
    return customCloseCodeDesc[code] || code.toString();
}
exports.getHumanReadableCloseCode = getHumanReadableCloseCode;
//# sourceMappingURL=CustomCloseCode.js.map
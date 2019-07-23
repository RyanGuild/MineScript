"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function func(options) {
    return function fooBar() {
        var foo = 1;
        if (options) {
            foo = 2;
        }
        return foo;
    };
}
exports.default = func;
//# sourceMappingURL=index.js.map
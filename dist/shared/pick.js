"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keyArray) => {
    const finalObj = {};
    for (const key of keyArray) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    return finalObj;
};
exports.default = pick;

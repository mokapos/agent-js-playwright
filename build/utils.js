"use strict";
/*
 *  Copyright 2022 EPAM Systems
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToRpStatus = exports.isErrorLog = exports.getAttachments = exports.sendEventToReporter = exports.getCodeRef = exports.getSystemAttributes = exports.getAgentInfo = exports.promiseErrorHandler = exports.isFalse = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
// @ts-ignore
var package_json_1 = require("../package.json");
var constants_1 = require("./constants");
var fsPromises = fs_1.default.promises;
var isFalse = function (value) {
    return [false, 'false'].includes(value);
};
exports.isFalse = isFalse;
var promiseErrorHandler = function (promise, message) {
    if (message === void 0) { message = ''; }
    return promise.catch(function (err) {
        console.error(message, err);
    });
};
exports.promiseErrorHandler = promiseErrorHandler;
var getAgentInfo = function () { return ({
    version: package_json_1.version,
    name: package_json_1.name,
}); };
exports.getAgentInfo = getAgentInfo;
var getSystemAttributes = function (skippedIssue) {
    if (skippedIssue === void 0) { skippedIssue = true; }
    var systemAttributes = [
        {
            key: 'agent',
            value: "".concat(package_json_1.name, "|").concat(package_json_1.version),
            system: true,
        },
    ];
    if ((0, exports.isFalse)(skippedIssue)) {
        var skippedIssueAttribute = {
            key: 'skippedIssue',
            value: 'false',
            system: true,
        };
        systemAttributes.push(skippedIssueAttribute);
    }
    return systemAttributes;
};
exports.getSystemAttributes = getSystemAttributes;
var getCodeRef = function (testItem, itemTitle, pathToExclude) {
    if (!itemTitle) {
        return '';
    }
    var filteredTitlesPath = testItem
        .titlePath()
        .filter(function (itemPath) { return itemPath !== '' && itemPath !== pathToExclude; });
    var itemIndex = filteredTitlesPath.indexOf(itemTitle);
    return filteredTitlesPath
        .slice(0, itemIndex + 1)
        .join('/')
        .replace(new RegExp('\\'.concat(path_1.default.sep), 'g'), '/');
};
exports.getCodeRef = getCodeRef;
var sendEventToReporter = function (type, data, suite) {
    process.stdout.write(JSON.stringify({ type: type, data: data, suite: suite }));
};
exports.sendEventToReporter = sendEventToReporter;
var getAttachments = function (attachments) { return __awaiter(void 0, void 0, void 0, function () {
    var readFilePromises;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                readFilePromises = attachments
                    .filter(function (attachment) { return attachment.body || attachment.path; })
                    .map(function (_a) {
                    var name = _a.name, attachmentPath = _a.path, contentType = _a.contentType, body = _a.body;
                    return __awaiter(void 0, void 0, void 0, function () {
                        var fileContent;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!body) return [3 /*break*/, 1];
                                    fileContent = body;
                                    return [3 /*break*/, 3];
                                case 1:
                                    if (!fs_1.default.existsSync(attachmentPath)) {
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, fsPromises.readFile(attachmentPath)];
                                case 2:
                                    fileContent = _b.sent();
                                    _b.label = 3;
                                case 3: return [2 /*return*/, {
                                        name: name,
                                        type: contentType,
                                        content: fileContent,
                                    }];
                            }
                        });
                    });
                });
                return [4 /*yield*/, Promise.all(readFilePromises)];
            case 1: return [2 /*return*/, (_a.sent()).filter(Boolean)];
        }
    });
}); };
exports.getAttachments = getAttachments;
var isErrorLog = function (message) {
    return message.toLowerCase().includes('error');
};
exports.isErrorLog = isErrorLog;
// https://playwright.dev/docs/api/class-testresult#test-result-status
var convertToRpStatus = function (status) {
    var isRpStatus = Object.values(constants_1.STATUSES).includes(status);
    if (isRpStatus) {
        return status;
    }
    return constants_1.STATUSES.FAILED;
};
exports.convertToRpStatus = convertToRpStatus;
//# sourceMappingURL=utils.js.map
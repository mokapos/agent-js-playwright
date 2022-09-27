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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPReporter = void 0;
var client_javascript_1 = __importDefault(require("@reportportal/client-javascript"));
var strip_ansi_1 = __importDefault(require("strip-ansi"));
var constants_1 = require("./constants");
var utils_1 = require("./utils");
var events_1 = require("@reportportal/client-javascript/lib/constants/events");
var RPReporter = /** @class */ (function () {
    function RPReporter(config) {
        this.config = config;
        this.suites = new Map();
        this.suitesInfo = new Map();
        this.testItems = new Map();
        this.promises = [];
        this.customLaunchStatus = '';
        this.launchLogs = new Map();
        this.nestedSteps = new Map();
        var agentInfo = (0, utils_1.getAgentInfo)();
        this.client = new client_javascript_1.default(this.config, agentInfo);
    }
    RPReporter.prototype.addRequestToPromisesQueue = function (promise, failMessage) {
        this.promises.push((0, utils_1.promiseErrorHandler)(promise, failMessage));
    };
    RPReporter.prototype.onStdOut = function (chunk, test) {
        try {
            var _a = JSON.parse(String(chunk)), type = _a.type, data = _a.data, suiteName = _a.suite;
            switch (type) {
                case events_1.EVENTS.ADD_ATTRIBUTES:
                    this.addAttributes(data, test, suiteName);
                    break;
                case events_1.EVENTS.SET_DESCRIPTION:
                    this.setDescription(data, test, suiteName);
                    break;
                case events_1.EVENTS.SET_TEST_CASE_ID:
                    this.setTestCaseId(data, test, suiteName);
                    break;
                case events_1.EVENTS.SET_STATUS:
                    this.setStatus(data, test, suiteName);
                    break;
                case events_1.EVENTS.SET_LAUNCH_STATUS:
                    this.setLaunchStatus(data);
                    break;
                case events_1.EVENTS.ADD_LOG:
                    this.sendTestItemLog(data, test, suiteName);
                    break;
                case events_1.EVENTS.ADD_LAUNCH_LOG:
                    this.sendLaunchLog(data);
                    break;
            }
        }
        catch (e) {
            if (test) {
                this.sendTestItemLog({ message: String(chunk) }, test);
            }
        }
    };
    RPReporter.prototype.onStdErr = function (chunk, test) {
        if (test) {
            var message = String(chunk);
            var level = (0, utils_1.isErrorLog)(message) ? constants_1.LOG_LEVELS.ERROR : constants_1.LOG_LEVELS.WARN;
            this.sendTestItemLog({ level: level, message: message }, test);
        }
    };
    RPReporter.prototype.addAttributes = function (attr, test, suiteName) {
        if (suiteName) {
            var suiteItem = this.suitesInfo.get(suiteName);
            var attributes = ((suiteItem === null || suiteItem === void 0 ? void 0 : suiteItem.attributes) || []).concat(attr);
            this.suitesInfo.set(suiteName, __assign(__assign({}, suiteItem), { attributes: attributes }));
        }
        else if (test) {
            var fullTestName = (0, utils_1.getCodeRef)(test, test.title);
            var testItem = this.testItems.get(fullTestName);
            if (testItem) {
                var attributes = (testItem.attributes || []).concat(attr);
                this.testItems.set(fullTestName, __assign(__assign({}, testItem), { attributes: attributes }));
            }
        }
    };
    RPReporter.prototype.setDescription = function (description, test, suiteName) {
        if (suiteName) {
            this.suitesInfo.set(suiteName, __assign(__assign({}, this.suitesInfo.get(suiteName)), { description: description }));
        }
        else if (test) {
            var fullTestName = (0, utils_1.getCodeRef)(test, test.title);
            var testItem = this.testItems.get(fullTestName);
            if (testItem) {
                this.testItems.set(fullTestName, __assign(__assign({}, testItem), { description: description }));
            }
        }
    };
    RPReporter.prototype.setTestCaseId = function (testCaseId, test, suiteName) {
        if (suiteName) {
            this.suitesInfo.set(suiteName, __assign(__assign({}, this.suitesInfo.get(suiteName)), { testCaseId: testCaseId }));
        }
        else if (test) {
            var fullTestName = (0, utils_1.getCodeRef)(test, test.title);
            var testItem = this.testItems.get(fullTestName);
            if (testItem) {
                this.testItems.set(fullTestName, __assign(__assign({}, testItem), { testCaseId: testCaseId }));
            }
        }
    };
    RPReporter.prototype.setStatus = function (status, test, suiteName) {
        if (suiteName) {
            this.suitesInfo.set(suiteName, __assign(__assign({}, this.suitesInfo.get(suiteName)), { status: status }));
        }
        else if (test) {
            var fullTestName = (0, utils_1.getCodeRef)(test, test.title);
            var testItem = this.testItems.get(fullTestName);
            if (testItem) {
                this.testItems.set(fullTestName, __assign(__assign({}, testItem), { status: status }));
            }
        }
    };
    RPReporter.prototype.setLaunchStatus = function (status) {
        this.customLaunchStatus = status;
    };
    RPReporter.prototype.sendTestItemLog = function (log, test, suiteName) {
        if (suiteName) {
            var suiteItem = this.suitesInfo.get(suiteName);
            var logs = ((suiteItem === null || suiteItem === void 0 ? void 0 : suiteItem.logs) || []).concat(log);
            this.suitesInfo.set(suiteName, __assign(__assign({}, suiteItem), { logs: logs }));
        }
        else if (test) {
            var fullTestName = (0, utils_1.getCodeRef)(test, test.title);
            var testItem = this.testItems.get(fullTestName);
            if (testItem) {
                this.sendLog(testItem.id, log);
            }
        }
    };
    RPReporter.prototype.sendLaunchLog = function (log) {
        var currentLog = this.launchLogs.get(log.message);
        if (!currentLog) {
            this.sendLog(this.launchId, log);
            this.launchLogs.set(log.message, log);
        }
    };
    RPReporter.prototype.sendLog = function (tempId, _a) {
        var _b = _a.level, level = _b === void 0 ? constants_1.LOG_LEVELS.INFO : _b, _c = _a.message, message = _c === void 0 ? '' : _c, file = _a.file;
        var promise = this.client.sendLog(tempId, {
            message: message,
            level: level,
            time: this.client.helpers.now(),
        }, file).promise;
        (0, utils_1.promiseErrorHandler)(promise, 'Failed to send log');
    };
    RPReporter.prototype.finishSuites = function () {
        var _this = this;
        var suitesToFinish = Array.from(this.suites).filter(function (_a) {
            var _b = __read(_a, 2), testCount = _b[1].testCount;
            return testCount < 1;
        });
        suitesToFinish.forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], _c = _b[1], id = _c.id, status = _c.status, logs = _c.logs;
            if (logs) {
                logs.map(function (log) {
                    _this.sendLog(id, log);
                });
            }
            var finishSuiteObj = __assign({ endTime: _this.client.helpers.now() }, (status && { status: status }));
            var promise = _this.client.finishTestItem(id, finishSuiteObj).promise;
            _this.addRequestToPromisesQueue(promise, 'Failed to finish suite.');
            _this.suites.delete(key);
        });
    };
    RPReporter.prototype.onBegin = function () {
        var _a = this.config, launch = _a.launch, description = _a.description, attributes = _a.attributes, skippedIssue = _a.skippedIssue, rerun = _a.rerun, rerunOf = _a.rerunOf, mode = _a.mode;
        var systemAttributes = (0, utils_1.getSystemAttributes)(skippedIssue);
        var startLaunchObj = {
            name: launch,
            startTime: this.client.helpers.now(),
            description: description,
            attributes: attributes && attributes.length ? attributes.concat(systemAttributes) : systemAttributes,
            rerun: rerun,
            rerunOf: rerunOf,
            mode: mode || constants_1.LAUNCH_MODES.DEFAULT,
        };
        var _b = this.client.startLaunch(startLaunchObj), tempId = _b.tempId, promise = _b.promise;
        this.addRequestToPromisesQueue(promise, 'Failed to launch run.');
        this.launchId = tempId;
    };
    RPReporter.prototype.createSuitesOrder = function (suite, suitesOrder) {
        if (!(suite === null || suite === void 0 ? void 0 : suite.title)) {
            return;
        }
        suitesOrder.push(suite);
        this.createSuitesOrder(suite.parent, suitesOrder);
    };
    RPReporter.prototype.createSuites = function (test) {
        var _a, _b, _c;
        var orderedSuites = [];
        this.createSuitesOrder(test.parent, orderedSuites);
        var lastSuiteIndex = orderedSuites.length - 1;
        var projectName = test.parent.project().name;
        for (var i = lastSuiteIndex; i >= 0; i--) {
            var currentSuite = orderedSuites[i];
            var currentSuiteTitle = currentSuite.title;
            var fullSuiteName = (0, utils_1.getCodeRef)(test, currentSuiteTitle);
            if ((_a = this.suites.get(fullSuiteName)) === null || _a === void 0 ? void 0 : _a.id) {
                continue;
            }
            var testItemType = i === lastSuiteIndex ? constants_1.TEST_ITEM_TYPES.SUITE : constants_1.TEST_ITEM_TYPES.TEST;
            var codeRef = (0, utils_1.getCodeRef)(test, currentSuiteTitle, projectName);
            var _d = this.suitesInfo.get(currentSuiteTitle) || {}, attributes = _d.attributes, description = _d.description, testCaseId = _d.testCaseId, status_1 = _d.status, logs = _d.logs;
            var startSuiteObj = __assign(__assign(__assign({ name: currentSuiteTitle, startTime: this.client.helpers.now(), type: testItemType, codeRef: codeRef }, (attributes && { attributes: attributes })), (description && { description: description })), (testCaseId && { testCaseId: testCaseId }));
            var parentSuiteName = (0, utils_1.getCodeRef)(test, (_b = orderedSuites[i + 1]) === null || _b === void 0 ? void 0 : _b.title);
            var parentId = (_c = this.suites.get(parentSuiteName)) === null || _c === void 0 ? void 0 : _c.id;
            var suiteObj = this.client.startTestItem(startSuiteObj, this.launchId, parentId);
            this.addRequestToPromisesQueue(suiteObj.promise, 'Failed to start suite.');
            var allSuiteTests = currentSuite.allTests();
            var descendants = allSuiteTests.map(function (testCase) { return (0, utils_1.getCodeRef)(testCase, testCase.title); });
            var testCount = allSuiteTests.length;
            // TODO: cover with tests
            if (test.retries) {
                var possibleInvocations = test.retries + 1;
                testCount = testCount * possibleInvocations;
            }
            this.suites.set(fullSuiteName, __assign(__assign({ id: suiteObj.tempId, name: currentSuiteTitle, testCount: testCount, descendants: descendants }, (status_1 && { status: status_1 })), (logs && { logs: logs })));
            this.suitesInfo.delete(currentSuiteTitle);
        }
        return projectName;
    };
    RPReporter.prototype.onTestBegin = function (test) {
        var _a;
        var playwrightProjectName = this.createSuites(test);
        var fullSuiteName = (0, utils_1.getCodeRef)(test, test.parent.title);
        var parentSuiteObj = this.suites.get(fullSuiteName);
        // create step
        if (parentSuiteObj) {
            var includePlaywrightProjectNameToCodeReference = this.config.includePlaywrightProjectNameToCodeReference;
            var codeRef = (0, utils_1.getCodeRef)(test, test.title, !includePlaywrightProjectNameToCodeReference && playwrightProjectName);
            var fullTestName = (0, utils_1.getCodeRef)(test, test.title);
            var parentId = parentSuiteObj.id;
            var startTestItem = {
                name: test.title,
                startTime: this.client.helpers.now(),
                type: constants_1.TEST_ITEM_TYPES.STEP,
                codeRef: codeRef,
                retry: ((_a = test.results) === null || _a === void 0 ? void 0 : _a.length) > 1,
            };
            var stepObj = this.client.startTestItem(startTestItem, this.launchId, parentId);
            this.addRequestToPromisesQueue(stepObj.promise, 'Failed to start test.');
            this.testItems.set(fullTestName, {
                name: test.title,
                id: stepObj.tempId,
            });
        }
    };
    RPReporter.prototype.onStepBegin = function (test, result, step) {
        var includeTestSteps = this.config.includeTestSteps;
        if (!includeTestSteps)
            return;
        var fullTestName = (0, utils_1.getCodeRef)(test, test.title);
        var parent;
        if (step.parent) {
            var stepParentName = (0, utils_1.getCodeRef)(step.parent, step.parent.title);
            var fullStepParentName = "".concat(fullTestName, "/").concat(stepParentName);
            parent = this.nestedSteps.get(fullStepParentName);
        }
        else {
            parent = this.testItems.get(fullTestName);
        }
        if (!parent)
            return;
        var stepStartObj = {
            name: step.title,
            type: constants_1.TEST_ITEM_TYPES.STEP,
            hasStats: false,
            startTime: this.client.helpers.now(),
        };
        var stepName = (0, utils_1.getCodeRef)(step, step.title);
        var fullStepName = "".concat(fullTestName, "/").concat(stepName);
        var _a = this.client.startTestItem(stepStartObj, this.launchId, parent.id), tempId = _a.tempId, promise = _a.promise;
        this.addRequestToPromisesQueue(promise, 'Failed to start nested step.');
        this.nestedSteps.set(fullStepName, {
            name: step.title,
            id: tempId,
        });
    };
    RPReporter.prototype.onStepEnd = function (test, result, step) {
        var includeTestSteps = this.config.includeTestSteps;
        if (!includeTestSteps)
            return;
        var fullTestName = (0, utils_1.getCodeRef)(test, test.title);
        var stepName = (0, utils_1.getCodeRef)(step, step.title);
        var fullStepName = "".concat(fullTestName, "/").concat(stepName);
        var testItem = this.nestedSteps.get(fullStepName);
        if (!testItem)
            return;
        var stepFinishObj = {
            status: step.error ? constants_1.STATUSES.FAILED : constants_1.STATUSES.PASSED,
            endTime: this.client.helpers.now(),
        };
        var promise = this.client.finishTestItem(testItem.id, stepFinishObj).promise;
        this.addRequestToPromisesQueue(promise, 'Failed to finish nested step.');
        this.nestedSteps.delete(fullStepName);
    };
    RPReporter.prototype.onTestEnd = function (test, result) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var fullTestName, _b, testItemId, attributes, description, testCaseId, predefinedStatus, withoutIssue, testDescription, status, attachmentsFiles, stacktrace, finishTestItemObj, promise, fullParentName;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        fullTestName = (0, utils_1.getCodeRef)(test, test.title);
                        _b = this.testItems.get(fullTestName), testItemId = _b.id, attributes = _b.attributes, description = _b.description, testCaseId = _b.testCaseId, predefinedStatus = _b.status;
                        testDescription = description;
                        status = predefinedStatus || (0, utils_1.convertToRpStatus)(result.status);
                        if (status === constants_1.STATUSES.SKIPPED) {
                            withoutIssue = (0, utils_1.isFalse)(this.config.skippedIssue);
                        }
                        if (!((_a = result.attachments) === null || _a === void 0 ? void 0 : _a.length)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, utils_1.getAttachments)(result.attachments)];
                    case 1:
                        attachmentsFiles = _c.sent();
                        attachmentsFiles.map(function (file) {
                            _this.sendLog(testItemId, {
                                message: "Attachment ".concat(file.name, " with type ").concat(file.type),
                                file: file,
                            });
                        });
                        _c.label = 2;
                    case 2:
                        if (result.error) {
                            stacktrace = (0, strip_ansi_1.default)(result.error.stack || result.error.message);
                            this.sendLog(testItemId, {
                                level: constants_1.LOG_LEVELS.ERROR,
                                message: stacktrace,
                            });
                            testDescription = (description || '').concat("\n```error\n".concat(stacktrace, "\n```"));
                        }
                        finishTestItemObj = __assign(__assign(__assign(__assign({ endTime: this.client.helpers.now(), status: status }, (withoutIssue && { issue: { issueType: 'NOT_ISSUE' } })), (attributes && { attributes: attributes })), (testDescription && { description: testDescription })), (testCaseId && { testCaseId: testCaseId }));
                        promise = this.client.finishTestItem(testItemId, finishTestItemObj).promise;
                        this.addRequestToPromisesQueue(promise, 'Failed to finish test.');
                        this.testItems.delete(fullTestName);
                        this.updateAncestorsTestCount(test, result, status);
                        fullParentName = (0, utils_1.getCodeRef)(test, test.parent.title);
                        // if all children of the test parent have already finished, then finish all empty ancestors
                        if (this.suites.get(fullParentName).testCount < 1) {
                            this.finishSuites();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // TODO: cover with tests
    RPReporter.prototype.updateAncestorsTestCount = function (test, result, calculatedStatus) {
        var _this = this;
        // decrease by 1 by default as only one test case finished
        var decreaseIndex = 1;
        // TODO: post an issue on GitHub for playwright/test to provide more clear output for this purpose
        var isTestFinishedFromHook = result.workerIndex === -1; // in case test finished by hook error it will be retried
        var nonRetriedResult = calculatedStatus === constants_1.STATUSES.PASSED ||
            (calculatedStatus === constants_1.STATUSES.SKIPPED && !isTestFinishedFromHook);
        // if test case has retries, and it will not be retried anymore
        if (test.retries > 0 && nonRetriedResult) {
            var possibleInvocations = test.retries + 1;
            var possibleInvocationsLeft = possibleInvocations - test.results.length;
            // we need to decrease also all the rest possible invocations as the test case will not be retried anymore
            decreaseIndex = decreaseIndex + possibleInvocationsLeft;
        }
        var fullTestName = (0, utils_1.getCodeRef)(test, test.title);
        this.suites.forEach(function (value, key) {
            var descendants = value.descendants, testCount = value.testCount;
            if (descendants.length && descendants.includes(fullTestName)) {
                var newTestCount = testCount - decreaseIndex;
                _this.suites.set(key, __assign(__assign({}, value), { testCount: newTestCount, descendants: newTestCount < 1
                        ? descendants.filter(function (testName) { return testName !== fullTestName; })
                        : descendants }));
            }
        });
    };
    RPReporter.prototype.onEnd = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promise = this.client.finishLaunch(this.launchId, __assign({ endTime: this.client.helpers.now() }, (this.customLaunchStatus && { status: this.customLaunchStatus }))).promise;
                        this.addRequestToPromisesQueue(promise, 'Failed to finish launch.');
                        return [4 /*yield*/, Promise.all(this.promises)];
                    case 1:
                        _a.sent();
                        this.launchId = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    return RPReporter;
}());
exports.RPReporter = RPReporter;
//# sourceMappingURL=reporter.js.map
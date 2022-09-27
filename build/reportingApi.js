"use strict";
/*
 *  Copyright 2021 EPAM Systems
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportingApi = void 0;
var events_1 = require("@reportportal/client-javascript/lib/constants/events");
var utils_1 = require("./utils");
var constants_1 = require("./constants");
exports.ReportingApi = {
    addAttributes: function (attrs, suite) {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.ADD_ATTRIBUTES, attrs, suite);
    },
    setDescription: function (description, suite) {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_DESCRIPTION, description, suite);
    },
    setTestCaseId: function (testCaseId, suite) {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_TEST_CASE_ID, testCaseId, suite);
    },
    setStatus: function (status, suite) {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_STATUS, status, suite);
    },
    setStatusPassed: function (suite) {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_STATUS, constants_1.STATUSES.PASSED, suite);
    },
    setStatusFailed: function (suite) {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_STATUS, constants_1.STATUSES.FAILED, suite);
    },
    setStatusSkipped: function (suite) {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_STATUS, constants_1.STATUSES.SKIPPED, suite);
    },
    setStatusStopped: function (suite) {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_STATUS, constants_1.STATUSES.STOPPED, suite);
    },
    setStatusInterrupted: function (suite) {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_STATUS, constants_1.STATUSES.INTERRUPTED, suite);
    },
    setStatusCancelled: function (suite) {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_STATUS, constants_1.STATUSES.CANCELLED, suite);
    },
    setStatusInfo: function (suite) {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_STATUS, constants_1.STATUSES.INFO, suite);
    },
    setStatusWarn: function (suite) {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_STATUS, constants_1.STATUSES.WARN, suite);
    },
    setLaunchStatus: function (status) {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_LAUNCH_STATUS, status);
    },
    setLaunchStatusPassed: function () { return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_LAUNCH_STATUS, constants_1.STATUSES.PASSED); },
    setLaunchStatusFailed: function () { return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_LAUNCH_STATUS, constants_1.STATUSES.FAILED); },
    setLaunchStatusSkipped: function () {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_LAUNCH_STATUS, constants_1.STATUSES.SKIPPED);
    },
    setLaunchStatusStopped: function () {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_LAUNCH_STATUS, constants_1.STATUSES.STOPPED);
    },
    setLaunchStatusInterrupted: function () {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_LAUNCH_STATUS, constants_1.STATUSES.INTERRUPTED);
    },
    setLaunchStatusCancelled: function () {
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_LAUNCH_STATUS, constants_1.STATUSES.CANCELLED);
    },
    setLaunchStatusInfo: function () { return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_LAUNCH_STATUS, constants_1.STATUSES.INFO); },
    setLaunchStatusWarn: function () { return (0, utils_1.sendEventToReporter)(events_1.EVENTS.SET_LAUNCH_STATUS, constants_1.STATUSES.WARN); },
    log: function (level, message, file, suite) {
        if (level === void 0) { level = constants_1.LOG_LEVELS.INFO; }
        if (message === void 0) { message = ''; }
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.ADD_LOG, { level: level, message: message, file: file }, suite);
    },
    launchLog: function (level, message, file) {
        if (level === void 0) { level = constants_1.LOG_LEVELS.INFO; }
        if (message === void 0) { message = ''; }
        return (0, utils_1.sendEventToReporter)(events_1.EVENTS.ADD_LAUNCH_LOG, { level: level, message: message, file: file });
    },
    trace: function (message, file, suite) {
        return exports.ReportingApi.log(constants_1.LOG_LEVELS.TRACE, message, file, suite);
    },
    debug: function (message, file, suite) {
        return exports.ReportingApi.log(constants_1.LOG_LEVELS.DEBUG, message, file, suite);
    },
    info: function (message, file, suite) {
        return exports.ReportingApi.log(constants_1.LOG_LEVELS.INFO, message, file, suite);
    },
    warn: function (message, file, suite) {
        return exports.ReportingApi.log(constants_1.LOG_LEVELS.WARN, message, file, suite);
    },
    error: function (message, file, suite) {
        return exports.ReportingApi.log(constants_1.LOG_LEVELS.ERROR, message, file, suite);
    },
    fatal: function (message, file, suite) {
        return exports.ReportingApi.log(constants_1.LOG_LEVELS.FATAL, message, file, suite);
    },
    launchTrace: function (message, file) {
        return exports.ReportingApi.launchLog(constants_1.LOG_LEVELS.TRACE, message, file);
    },
    launchDebug: function (message, file) {
        return exports.ReportingApi.launchLog(constants_1.LOG_LEVELS.DEBUG, message, file);
    },
    launchInfo: function (message, file) {
        return exports.ReportingApi.launchLog(constants_1.LOG_LEVELS.INFO, message, file);
    },
    launchWarn: function (message, file) {
        return exports.ReportingApi.launchLog(constants_1.LOG_LEVELS.WARN, message, file);
    },
    launchError: function (message, file) {
        return exports.ReportingApi.launchLog(constants_1.LOG_LEVELS.ERROR, message, file);
    },
    launchFatal: function (message, file) {
        return exports.ReportingApi.launchLog(constants_1.LOG_LEVELS.FATAL, message, file);
    },
};
//# sourceMappingURL=reportingApi.js.map
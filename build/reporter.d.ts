/// <reference types="node" />
import RPClient from '@reportportal/client-javascript';
import { Reporter, Suite as PWSuite, TestCase, TestResult, TestStep } from '@playwright/test/reporter';
import { Attribute, LogRQ, ReportPortalConfig } from './models';
import { STATUSES } from './constants';
export interface TestItem {
    id: string;
    name: string;
    status?: STATUSES;
    attributes?: Attribute[];
    description?: string;
    testCaseId?: string;
}
interface Suite extends TestItem {
    logs?: LogRQ[];
    testCount?: number;
    descendants?: string[];
}
export declare class RPReporter implements Reporter {
    config: ReportPortalConfig;
    client: RPClient;
    launchId: string;
    suites: Map<string, Suite>;
    suitesInfo: Map<string, Omit<Suite, 'id'>>;
    promises: Promise<void>[];
    testItems: Map<string, TestItem>;
    customLaunchStatus: string;
    launchLogs: Map<string, LogRQ>;
    nestedSteps: Map<string, TestItem>;
    constructor(config: ReportPortalConfig);
    addRequestToPromisesQueue(promise: Promise<void>, failMessage: string): void;
    onStdOut(chunk: string | Buffer, test?: TestCase): void;
    onStdErr(chunk: string | Buffer, test?: TestCase): void;
    addAttributes(attr: Attribute[], test: TestCase, suiteName: string): void;
    setDescription(description: string, test: TestCase, suiteName: string): void;
    setTestCaseId(testCaseId: string, test: TestCase, suiteName: string): void;
    setStatus(status: STATUSES, test: TestCase, suiteName: string): void;
    setLaunchStatus(status: STATUSES): void;
    sendTestItemLog(log: LogRQ, test: TestCase, suiteName?: string): void;
    sendLaunchLog(log: LogRQ): void;
    sendLog(tempId: string, { level, message, file }: LogRQ): void;
    finishSuites(): void;
    onBegin(): void;
    createSuitesOrder(suite: PWSuite, suitesOrder: PWSuite[]): void;
    createSuites(test: TestCase): string;
    onTestBegin(test: TestCase): void;
    onStepBegin(test: TestCase, result: TestResult, step: TestStep): void;
    onStepEnd(test: TestCase, result: TestResult, step: TestStep): void;
    onTestEnd(test: TestCase, result: TestResult): Promise<void>;
    updateAncestorsTestCount(test: TestCase, result: TestResult, calculatedStatus: STATUSES): void;
    onEnd(): Promise<void>;
}
export {};

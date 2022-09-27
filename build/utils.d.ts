/// <reference types="node" />
import { TestCase, TestStatus } from '@playwright/test/reporter';
import { Attribute } from './models';
import { Attachment } from './models/reporting';
import { STATUSES } from './constants';
export declare const isFalse: (value: string | boolean | undefined) => boolean;
export declare const promiseErrorHandler: (promise: Promise<void>, message?: string) => Promise<void>;
export declare const getAgentInfo: () => {
    version: string;
    name: string;
};
export declare const getSystemAttributes: (skippedIssue?: boolean) => Array<Attribute>;
declare type testItemPick = Pick<TestCase, 'titlePath'>;
export declare const getCodeRef: (testItem: testItemPick, itemTitle: string, pathToExclude?: string) => string;
export declare const sendEventToReporter: (type: string, data: any, suite?: string) => void;
declare type attachments = {
    name: string;
    path?: string;
    body?: Buffer;
    contentType: string;
}[];
export declare const getAttachments: (attachments: attachments) => Promise<Attachment[]>;
export declare const isErrorLog: (message: string) => boolean;
export declare const convertToRpStatus: (status: TestStatus) => STATUSES;
export {};

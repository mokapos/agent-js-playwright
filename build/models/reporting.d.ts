/// <reference types="node" />
import { Attribute, Issue } from './common';
import { TEST_ITEM_TYPES, LOG_LEVELS, LAUNCH_MODES } from '../constants';
export interface StartLaunchObjType {
    startTime?: Date | number;
    attributes?: Array<Attribute>;
    description?: string;
    name?: string;
    rerun?: boolean;
    rerunOf?: string;
    mode?: LAUNCH_MODES;
}
export interface StartTestObjType {
    name: string;
    type: TEST_ITEM_TYPES;
    attributes?: Array<Attribute>;
    description?: string;
    startTime?: Date | number;
    codeRef?: string;
    testCaseId?: string;
    retry?: boolean;
}
export interface FinishTestItemObjType {
    endTime?: Date | number;
    status?: string;
    attributes?: Attribute[];
    description?: string;
    testCaseId?: string;
    issue?: Issue;
}
export interface Attachment {
    name: string;
    type: string;
    content: string | Buffer;
}
export interface LogRQ {
    level?: LOG_LEVELS;
    message?: string;
    time?: number;
    file?: Attachment;
}

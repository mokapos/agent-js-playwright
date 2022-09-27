/// <reference types="node" />
import { AxiosRequestConfig } from 'axios';
import { AgentOptions } from 'https';
import { Attribute } from './common';
import { LAUNCH_MODES } from '../constants';
export interface RestClientConfig extends AxiosRequestConfig {
    agent?: AgentOptions;
}
export interface ReportPortalConfig {
    token: string;
    project: string;
    endpoint: string;
    launch: string;
    debug?: boolean;
    attributes?: Array<Attribute>;
    description?: string;
    rerun?: boolean;
    rerunOf?: string;
    mode?: LAUNCH_MODES;
    isLaunchMergeRequired?: boolean;
    skippedIssue?: boolean;
    includeTestSteps?: boolean;
    restClientConfig?: RestClientConfig;
    includePlaywrightProjectNameToCodeReference?: boolean;
}

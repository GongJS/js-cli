/// <reference types="node" />
import cp from 'child_process';
import log from './log';
import * as http from './getNpmInfo';
import request from './request';
declare const isObject: (o: any) => boolean;
declare const formatPath: (p: string) => string;
declare const spawn: (command: string, args: string[], options?: {}) => cp.ChildProcessWithoutNullStreams;
declare const execSpawn: (command: string, args: string[], options?: {}) => Promise<unknown>;
declare const spinnerStart: (msg?: string, spinnerString?: string) => any;
declare const sleep: () => void;
declare const kebabCase: (str: string) => string;
declare const readFile: (path: string, options?: {}) => string | {
    type: "Buffer";
    data: number[];
} | null;
declare const writeFile: (path: string, data: any, { rewrite }?: {
    rewrite?: boolean | undefined;
}) => boolean;
export { log, http, isObject, formatPath, spawn, execSpawn, spinnerStart, sleep, kebabCase, request, readFile, writeFile };

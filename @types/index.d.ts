import { Response } from "node-fetch";

export interface Status {
    ram(): string;
    ramUsed(): string;
    ramTotal(): string;
}

export interface Terminal {
    info(message: unknown): void;
    warn(message: unknown): void;
    error(message: unknown): void;
    success(message: unknown): void;
    debug(message: unknown): void;
}

export interface Registry {
    /**
    * Conveniently saves information in a .log/.txt file.
    * @param message Message that will be saved in the log file. (Date is automatically added)
    * @param archive Directory/log file name.
    * @param timeZone (Default: America/Sao_Paulo).
    */
    add(message: string, archive: string, timeZone: string): void;

    /**
    * Delete the log file.
    * @param archive Directory/log file name.
    */
    del(archive: string): void;

    /**
    * Check that the log file directory/name exists.
    * @param archive Directory/log file name.
    */
    check(archive: string): boolean;
}

export function prototype(): void;

/**
* It monitors a function and if an error is caught, it is stored / distributed.
* @param fn Function to monitor.
* @param path Error return. File or webhook.
*/
export function apply(fn: Function, path: string): Promise<unknown | Response>;

/**
* Send a Discord Webhook easily and conveniently.
* @param object Webhook object or string. Example: { content: "hi content :)" }.
* @param webhook Webhook URL.
*/
export function webhook(object: string | object, webhook: string): Promise<Response>;
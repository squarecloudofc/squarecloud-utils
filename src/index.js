/*
Copyright 2021-2023 Square Cloud - All rights reserved.
*/

const { appendFile, unlinkSync, existsSync } = require("node:fs");
const { ram, ramTotal, ramUsed } = require("@squarecloud/status");

module.exports = {

    // Square Cloud Status;
    Status: { ram, ramUsed, ramTotal },

    // Console messages;
    Terminal: {
        info: (str) => console.log(str),
        warn: (str) => console.log(`\x1b[33m${str}\x1b[0m`),
        error: (str) => console.log(`\x1b[31m${str}\x1b[0m`),
        success: (str) => console.log(`\x1b[32m${str}\x1b[0m`),
        debug: (str) => console.log(`\x1b[36m${str}\x1b[0m`),
    },

    Registry: {

        /**
        * Conveniently saves information in a .log/.txt file.
        * @param {String} message Message that will be saved in the log file. (Date is automatically added)
        * @param {String} archive Directory/log file name.
        * @param {String} timeZone (Default: America/Sao_Paulo).
        */
        add: (message, archive, timeZone = "America/Sao_Paulo") => {
            appendFile(archive ?? "square.log", `${new Date().toLocaleString("pt-br", { timeZone })} -> ${message}\n`, (err) => {
                if (err) throw new Error("Unable to log, check file directory location.");
            });
        },

        /**
        * Delete the log file.
        * @param {String} archive Directory/log file name.
        */
        del: (archive) => unlinkSync(archive),

        /**
        * Check that the log file directory/name exists.
        * @param {String} archive Directory/log file name.
        */
        check: (archive) => existsSync(archive),

    },

    prototypes: () => {
        String.prototype.capitalize = function () { return this.charAt(0).toUpperCase() + this.slice(1); }
        Array.prototype.random = function () { return this[Math.floor((Math.random() * this.length))]; }
    },

    /**
    * It monitors a function and if an error is caught, it is stored / distributed.
    * @param {Function} fn Function to monitor.
    * @param {String} path Error return. File or webhook.
    */
    apply: async (fn, path) => {
        try {
            return await fn.apply(this, arguments);
        } catch (exception) {
            if (path.match(/discord.com\/api\/webhooks/)) {
                return fetch(path, { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify({ content: exception }) });
            }
            require("./index").Registry.add(exception, path);
        }
    },

    /**
    * Send a Discord Webhook easily and conveniently.
    * @param {String} object Webhook object or string. Example: { content: "hi content :)" }.
    * @param {String} webhook Webhook URL.
    */
    webhook: (object, webhook) => {
        try {
            return fetch(webhook, { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify(typeof object == "string" ? { content: object } : object ?? { content: "hello world" }) });
        } catch {
            throw new Error("Could not send webhook.");
        }
    }

};
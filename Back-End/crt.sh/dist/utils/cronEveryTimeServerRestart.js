"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const daysToMilliseconds_js_1 = __importDefault(require("./daysToMilliseconds.js"));
const Subscribers_js_1 = require("../db/entities/Subscribers.js");
const fetchData_js_1 = __importDefault(require("./fetchData.js"));
const cron_1 = require("cron");
const wakeUp = async () => {
    try {
        const subscribers = await Subscribers_js_1.Subscribers.find();
        subscribers.map(async (subscriber) => {
            const response = await (0, fetchData_js_1.default)(`https://crt.sh/?q=${subscriber.domain}&exclude=expired&output=json`);
            setTimeout(() => {
                response.map((e) => {
                    const scheduledDate = new Date(new Date(e.not_after).getTime() -
                        (0, daysToMilliseconds_js_1.default)(subscriber.notificationPeriod));
                    if (Number(scheduledDate) > Date.now()) {
                        const cronTime = new cron_1.CronTime(scheduledDate);
                        let job = new cron_1.CronJob(cronTime.source, () => {
                            //  sendEmail(subscriber.email, `certificate with ID : ${e.id} will expired soon`, "certificate expiration notification")
                            console.log("email sended");
                        }, null, true);
                        job.start();
                    }
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = wakeUp;

import daysToMilliseconds from './daysToMilliseconds.js';
import { Subscribers } from '../db/entities/Subscribers.js';
import fetchData from './fetchData.js';
import { CronJob, CronTime } from "cron";
import { sendEmail } from './sesServiceAWS.js';
import { Gen } from '../@types/generic.js';

const wakeUp = async () => {
    try {
        const subscribers = await Subscribers.find()
        subscribers.map(async subscriber => {

            const response = await fetchData(
                `https://crt.sh/?q=${subscriber.domain}&exclude=expired&output=json`
            );
            setTimeout(() => {
                response.map((e: Gen.certificate) => {
                    const scheduledDate = new Date(
                        new Date(e.not_after).getTime() -
                        daysToMilliseconds(subscriber.notificationPeriod)
                    );


                    if (Number(scheduledDate) > Date.now()) {
                        const cronTime = new CronTime(scheduledDate);

                        let job = new CronJob(
                            cronTime.source,
                            () => {
                                //  sendEmail(subscriber.email, `certificate with ID : ${e.id} will expired soon`, "certificate expiration notification")
                                console.log("email sended");
                            },
                            null,
                            true
                        );
                        job.start();
                    }
                });
            });
        })
    } catch (error) {
        console.log(error);

    }
}

export default wakeUp
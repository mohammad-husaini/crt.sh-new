import { subscribe } from 'diagnostics_channel';
import express from 'express';
import { Subscribers } from '../db/entities/Subscribers';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const email = req.body.email;
        const notificationPeriod = req.body.notificationPeriod;

        const exist = await Subscribers.find({ where: { email: email, domain: search.toString(), notificationPeriod: notificationPeriod } })

        if (exist.length > 0) {
            res.status(202).send("You are already subscribed")
        } else {
            const subscriber = new Subscribers()
            subscriber.email = email
            subscriber.domain = search?.toString()
            subscriber.notificationPeriod = notificationPeriod

            subscriber.save()
            res.status(201).send('Subscription successful');
        }


    } catch (error) {
        res.status(500).send(error)
    }


});

router.delete('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const email = req.body.email;
        const notificationPeriod = req.body.notificationPeriod;

        const exist = await Subscribers.findOne({ where: { email: email, domain: search.toString(), notificationPeriod: notificationPeriod } })

        if (exist) {
            await Subscribers.remove(exist)
            res.status(200).send("successfully unsubscribe")
        } else {
            res.status(200).send("You have no subscription for this domain and period")
        }


    } catch (error) {
        res.status(500).send(error)
    }


});


export default router
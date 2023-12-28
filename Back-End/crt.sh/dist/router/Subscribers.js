"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Subscribers_1 = require("../db/entities/Subscribers");
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const email = req.body.email;
        const notificationPeriod = req.body.notificationPeriod;
        const exist = await Subscribers_1.Subscribers.find({ where: { email: email, domain: search.toString(), notificationPeriod: notificationPeriod } });
        if (exist.length > 0) {
            res.status(202).send("You are already subscribed");
        }
        else {
            const subscriber = new Subscribers_1.Subscribers();
            subscriber.email = email;
            subscriber.domain = search?.toString();
            subscriber.notificationPeriod = notificationPeriod;
            subscriber.save();
            res.status(201).send('Subscription successful');
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
router.delete('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const email = req.body.email;
        const notificationPeriod = req.body.notificationPeriod;
        const exist = await Subscribers_1.Subscribers.findOne({ where: { email: email, domain: search.toString(), notificationPeriod: notificationPeriod } });
        if (exist) {
            await Subscribers_1.Subscribers.remove(exist);
            res.status(200).send("successfully unsubscribe");
        }
        else {
            res.status(200).send("You have no subscription for this domain and period");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.default = router;

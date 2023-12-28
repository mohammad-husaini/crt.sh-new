import express from 'express';
import fetchData from '../utils/fetchData';

const router = express.Router();

router.get("/", async (req, res) => {
    const search = req.query.search;
    const expired = req.query.exclude;
    try {
        const response = await fetchData(
            `https://crt.sh/?q=${search}&exclude=${expired}&output=json`
        );
        res.status(200).send(response);
    } catch (error) {
        res.status(404).send(error);
    }
});

export default router
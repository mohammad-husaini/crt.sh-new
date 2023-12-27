import express from "express";
import cors from "cors";
import cron from "cron";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;

//Cron

const fetchData = async (url) => {
  const res = await fetch(url);
  return await res.json();
};

const daysToMilliseconds = (days) => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return days * millisecondsPerDay;
};

app.post("/subscription", async (req, res) => {
  const search = req.query.search;
  const expired = req.query.exclude;
  const email = req.body.email;
  const notificationPeriod = req.body.notificationPeriod;

  console.log(search, email, notificationPeriod);
  try {
    const response = await fetchData(
      `https://crt.sh/?q=${search}&exclude=${expired}&output=json`
    );
    setTimeout(() => {
      response.map((e) => {
        const scheduledDate = new Date(
          new Date(e.not_after).getTime() - daysToMilliseconds(30)
        );
        if (scheduledDate > Date.now()) {
          const cronTime = new cron.CronTime(scheduledDate);

          let job = new cron.CronJob(
            cronTime.source,
            () => {
              console.log("job created");
            },
            null,
            true
          );
          job.start();
        }
      });
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send(error);
  }
});

app.get("/", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

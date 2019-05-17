const bluebird = require("bluebird");
const redis = require("redis");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.post("/api", async (req, res) => {
    const destination = req.body.to;

    try {
        const stats = await client.hgetallAsync(destination);

        // Found in Redis
        if (stats !== null) {
            // Convert popularity back to int after being cast to string by redis
            stats.popularity = parseInt(stats.popularity);

            // Increment popularity by 1
            stats.popularity++;

            // Update in Redis
            await client.hmsetAsync(destination, stats);
        }
        // Not found in Redis
        else {
            await client.hmsetAsync(destination, {popularity: 1});
        }

        res.json("Success");
    } catch(e) {
        console.log(e);
    }
});

app.get("/api/popular/:destination", async (req, res) => {
    try {
        const stats = await client.hgetallAsync(req.params.destination);

        // Found in Redis
        if (stats !== null) {
            res.json(stats);
        }
        // Not found in Redis
        else {
            res.json({popularity: 0});
        }
    } catch(e) {
        console.log(e);
    }
});

app.get("*", (req, res) => {
    res.status(404).send("Page not found");
});

app.listen(4000, () => {
    console.log("Express server running on http://localhost:4000");
});
"use strict";

const rp = require("request-promise");

const apiKey = process.env.API_KEY;

const uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze";

const imageUrl = "https://pbs.twimg.com/media/ECYVjocUYAEyOvs?format=jpg&name=large";

const params = {
    "visualFeatures": "Categories, Color, Description, Tags",
    "detail": "",
    "language": "ja"
};

const options = {
    uri: uriBase,
    qs: params,
    body: "{'url': " + "'" + imageUrl + "'}",
    headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiKey
    }
};

(async () => {
    const result = await rp.post(options).catch((err) => {
        console.log(err);
    });
    let jsonResponse = JSON.stringify(JSON.parse(result), null, '  ');
    console.log(jsonResponse);
})()
"use strict";

const express = require("express");
const router = express.Router();
const rp = require("request-promise");

// multer setup
const multer = require("multer");
const memorystorage = multer.memoryStorage();
const uploader = multer({
    storage: memorystorage,
    limits: {
        fileSize: 4 * 1024 * 1024
    }
}).single("image");

router.post("/", uploader, async (req, res, next) => {
    if (!req.file) {
        const fileNotSelectedError = new Error("ファイルが選択されませんでした");
        fileNotSelectedError.status = 404;
        next(fileNotSelectedError);
    }

    const apiKey = process.env.API_KEY;

    const uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze";

    const params = {
        "visualFeatures": "Categories, Color, Description, Tags",
        "detail": "",
        "language": "ja"
    };

    const options = {
        uri: uriBase,
        qs: params,
        headers: {
            "Content-Type": "application/octet-stream",
            "Ocp-Apim-Subscription-Key": apiKey
        },
        body: req.file.buffer,
    };

    const result = await rp.post(options).catch((err) => {
        const apiConnectionError = new Error("API通信においてエラーが発生しました");
        apiConnectionError.status = 404;
        next(apiConnectionError);
    });

    const jsonResponse = JSON.parse(result);
    const tags = shapeTags(jsonResponse.tags);
    
    res.render("index", {
        "tags": tags
    });
});

// tagのconfidenceが0.987654...のような値になっているので整数%に修正
function shapeTags(tags) {
    const shapedTags = [];
    tags.forEach((tag) => {
        const shapedTag = tag;
        shapedTag.confidence = String(Math.round(tag.confidence * 100)) + "%";
        shapedTags.push(shapedTag);
    });
    return tags;
}

module.exports = router;
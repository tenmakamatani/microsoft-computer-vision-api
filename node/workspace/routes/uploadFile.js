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

    // request URL
    const uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze";

    // request param
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

    // API connection
    const result = await rp.post(options).catch((err) => {
        const apiConnectionError = new Error("API通信においてエラーが発生しました");
        apiConnectionError.status = 404;
        next(apiConnectionError);
    });

    // parse json result
    const jsonResponse = JSON.parse(result);
    const tags = shapeTags(jsonResponse.tags);
    
    // encode binary to base64
    const base64Image = req.file.buffer.toString("base64");
    
    res.render("index", {
        "tags": tags,
        "imageType": req.file.mimetype,
        "imageData": base64Image
    });
});

// fix tag confidence to integer
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
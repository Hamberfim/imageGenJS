import * as dotenv from "dotenv";
dotenv.config();

import { Configuration, OpenAIApi } from "openai";

// create a config object to access the apikey
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

//initializes the openai sdk
const openai = new OpenAIApi(configuration);

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
// middleware - json format only
app.use(express.json());

// first endpoint - uri/url, callback request, response
app.post("/dream", async (req, res) => {
  // access the prompt-desc of the image the user wants to generate
  const aiResponse = await openai.createImage({
    prompt,
    // number of images to generate
    n: 1,
    // image resolution
    size: "1024x1024",
  });
  // response object from openai
  const image = aiResponse.data.data[0].url;
  // use the send method on the response object to send it to the client as a response as json
  res.send({ image });
});
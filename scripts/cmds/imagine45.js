const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "image",
    aliases: [],
    author: "ArYAN",
    version: "1.0",
    cooldowns: 5,
    role: 0,
    shortDescription: "Generate an image based on a prompt.",
    longDescription: "Generates an image using the provided prompt.",
    category: "image",
    guide: "{pn} <prompt>",
  },
  onStart: async function ({ message, args, api, event }) {
    const obfuscatedAuthor = String.fromCharCode(65,114,89,65,78);
    const permission = global.GoatBot.config.DEV;
 if (!permission.includes(event.senderID)) {
 api.sendMessage("❌ | Only bot's admin Dev user can use the command", event.threadID, event.messageID);
 return;
 }
    if (this.config.author !== obfuscatedAuthor) {
      return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
    }

    const prompt = args.join(" ");
    const apikey = 'UPoLxyzFM-69vsg';

    if (!prompt) {
      return api.sendMessage("👀 Please provide a prompt.", event.threadID);
    }

    api.sendMessage("⏳ Generating your imagination....", event.threadID, event.messageID);

    try {
      const imagineApiUrl = `https://upol-ai-docs.onrender.com/imagine?prompt=${encodeURIComponent(prompt)}&apikey=${apikey}`;

      const imagineResponse = await axios.get(imagineApiUrl, {
        responseType: "arraybuffer"
      });

      const cacheFolderPath = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }
      const imagePath = path.join(cacheFolderPath, `${Date.now()}_generated_image.png`);
      fs.writeFileSync(imagePath, Buffer.from(imagineResponse.data, "binary"));

      const stream = fs.createReadStream(imagePath);
      api.sendMessage({
        body: "",
        attachment: stream
      }, event.threadID, () => {
        fs.unlinkSync(imagePath);
      });
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("❌ | An error occurred. Please try again later.", event.threadID, event.messageID);
    }
  }
}

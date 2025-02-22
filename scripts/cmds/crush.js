module.exports = {
  config: {
    name: "crush",
    role: 0,
    author: "ArYAN",
    countDown: 5,
    longDescription: "Randomvideo",
    category: "video",
    guide:{
      en: "{pn} <video>"
    } 
  },
   onStart: async function({ api, event }) {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  var ArYan = ["https://aryan-noobs-apis.onrender.com/video/crush"]
  var ArYan1 = ArYan[Math.floor(Math.random() * ArYan.length)]
  axios.get(ArYan1).then(res => {
  let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
  let count = res.data.count;
  let ArYan2 = res.data.ArYan;
  let callback = function () {
          api.sendMessage({
            body: `Crush video ❤\n\n｢ 𝗜𝘁𝘇 𝗔𝗿𝗬𝗔𝗡 ｣`,
            attachment: fs.createReadStream(__dirname + `/cache/ArYan.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/ArYan.mp4`), event.messageID);
        }
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/ArYan.mp4`)).on("close", callback);
      })
   } 
}

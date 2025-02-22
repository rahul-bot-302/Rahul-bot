const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`
  );
  return base.data.api;
};

(module.exports = {
  config: {
    name: "quiz2",
    aliases: ["qz"],
    version: "1.0",
    author: "asif",//Editing by ArYan 🐔
    countDown: 0,
    role: 0,
    category: "game",
    guide: "{p}quiz2\n{pn}qz bn \n{p}qz en",
  },

  onStart: async function ({ api, event, usersData, args }) {
    const input = args.join('').toLowerCase() || "bn";
    let timeout = 300;
    let category = "bangla";
    if (input === "bn" || input === "bangla") {
      category = "bangla";
    } else if (input === "en" || input === "english") {
      category = "english";
 }

    try {
      const response = await axios.get(
        `${await baseApiUrl()}/quiz2?category=${category}&q=random`,
      );

      const quizData = response.data.question;
      const { question, correctAnswer, options } = quizData;
      const { a, b, c, d } = options;
      const namePlayerReact = await usersData.getName(event.senderID);
      const quizMsg = {
        body: `\n 🎮 𝗤𝘂𝗶𝘇 (𝖻𝖾𝗍𝖺)\n☺︎︎━━━━━━━━━━━━━☺︎︎\n\n${question}\n\n├☔︎ 𝖠) ${a}\n├☔︎ 𝖡) ${b}\n├☔︎ 𝖢) ${c}\n├☔︎ 𝖣) ${d}\n☀︎︎━━━━━━━━━━━━━☀︎︎\n\n𝖱𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗐𝗂𝗍𝗁 𝗒𝗈𝗎𝗋 𝖺𝗇𝗌𝗐𝖾𝗋.`,
      };

      api.sendMessage(
        quizMsg,
        event.threadID,
        (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            type: "reply",
            commandName: this.config.name,
            author: event.senderID,
            messageID: info.messageID,
            dataGame: quizData,
            correctAnswer,
            nameUser: namePlayerReact,
            attempts: 0
          });
          setTimeout(() => {
            api.unsendMessage(info.messageID);
          }, timeout * 1000);
        },
        event.messageID,
      );
    } catch (error) {
      console.error("𝗖𝗼𝗻𝘀𝗼𝗹𝗲\n━━━━━━━━━━━━━\n ⚠ 𝖤𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 \n☀︎︎━━━━━━━━━━━━━☀︎︎", error);
      api.sendMessage(error.message, event.threadID, event.messageID);
    }
  },

  onReply: async ({ event, api, Reply, usersData }) => {
const { correctAnswer, nameUser, author } = Reply;
    if (event.senderID !== author)
      return api.sendMessage(
        "⚠ 𝗘𝗿𝗿𝗼𝗿 \n☺︎︎━━━━━━━━━━━━━☺︎︎\n𝖲𝗈𝗋𝗋𝗒 𝖻𝖺𝖻𝗒 😔\n☀︎︎━━━━━━━━━━━━━☀︎︎",
        event.threadID,
        event.messageID
      );
    const maxAttempts = 2;

    switch (Reply.type) {
      case "reply": {
        let userReply = event.body.toLowerCase();
        if (Reply.attempts >= maxAttempts) {
          await api.unsendMessage(Reply.messageID);
          const incorrectMsg = `📕 𝗠𝘀𝗴 \n☺︎︎━━━━━━━━━━━━━☺︎︎\n⚠ ${nameUser}\n 𝖸𝗈𝗎 𝗁𝖺𝗏𝖾 𝗋𝖾𝖺𝖼𝗁𝖾𝖽 𝗍𝗁𝖾 𝗆𝖺𝗑𝗂𝗆𝗎𝗆 𝗇𝗎𝗆𝖻𝖾𝗋 𝗈𝖿𝖿 𝖺𝗍𝗍𝖾𝗆𝗉𝗍𝗌 (2).\n𝖳𝗁𝖾 𝖼𝗈𝗋𝗋𝖾𝖼𝗍 𝖺𝗇𝗌𝗐𝖾𝗋 𝗂𝗌:\n ${correctAnswer}\n☀︎︎━━━━━━━━━━━━━☀︎︎`;
          return api.sendMessage(incorrectMsg, event.threadID, event.messageID);
        }
        if (userReply === correctAnswer.toLowerCase()) {
          api.unsendMessage(Reply.messageID)
          .catch(console.error);
          let rewardCoins = 300;
          let rewardExp = 100;
          let userData = await usersData.get(author);
          await usersData.set(author, {
          money: userData.money + rewardCoins,
            exp: userData.exp + rewardExp,
            data: userData.data,
          });
          let correctMsg = `👑 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘂𝗹𝗮𝘁𝗶𝗼𝗻𝘀\n☺︎︎━━━━━━━━━━━━━☺︎︎\n 𝖭𝖺𝗆𝖾 : ${nameUser} \n\n🌟🎉𝖰𝗎𝗂𝗓 𝖢𝗁𝖺𝗆𝗉𝗂𝗈𝗇🏆\n\n𝖸𝗈𝗎𝗋 𝗏𝖾 𝖾𝖺𝗋𝗇𝖾𝖽 ${rewardCoins} 𝗖𝗼𝗶𝗻𝘀 💰 𝖺𝗇𝖽  ${rewardExp} 𝖤𝖷𝖯 🌟\n\n𝖪𝖾𝖾𝗉 𝗎𝗉 𝗍𝗁𝖾 𝗀𝗋𝖾𝖺𝗍 𝗐𝗈𝗋𝗄 🏐\n☀︎︎━━━━━━━━━━━━━☀︎︎`;
          api.sendMessage(correctMsg, event.threadID, event.messageID);
        } else {
          Reply.attempts += 1;
global.GoatBot.onReply.set(Reply.messageID, Reply);
          api.sendMessage(
            `⚠ 𝗪𝗿𝗼𝗻𝗴 𝗔𝗻𝘀𝘄𝗲𝗿 \n☺︎︎━━━━━━━━━━━━━☺︎︎\n 𝖸𝗈𝗎 𝗁𝖺𝗏𝖾 ${maxAttempts - Reply.attempts} 𝖺𝗍𝗍𝖾𝗆𝗉𝗍𝗌 𝗅𝖾𝖿𝗍 .\n✅  𝖳𝗋𝗒 𝖠𝗀𝖺𝗂𝗇\n☀︎︎ ━━━━━━━━━━━━━☀︎︎`,
            event.threadID,
            event.messageID,
          );
        }
        break;
      }
      default:
        break;
    }
  },
})

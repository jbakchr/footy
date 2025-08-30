const axios = require("axios");
const cheerio = require("cheerio");

const { BASE_URL } = require("../constants");

const fetchStatsData = async (league, stat) => {
  try {
    const url = `${BASE_URL}/${league}/${stat}`;

    const html = (await axios.get(url)).data;

    const data = extractStatsData(stat, html);

    return data;
  } catch (error) {
    console.log(error);
  }
};

const extractStatsData = (stat, html) => {
  switch (stat) {
    case "stilling":
      return extractStandingData(html);
    case "topscorere":
      return extractTopscorerData(html);
    case "assists":
      return extractAssistsData(html);
    case "kort":
      return extractCardsData(html);
  }
};

const extractStandingData = (html) => {
  const $ = cheerio.load(html);
  const standingsData = [];

  const trs = $("tbody tr");

  trs.each((i, el) => {
    const tds = $(el).find("td");

    standingsData.push({
      "#": tds.eq(0).find(".rank-number").text(),
      Klub: tds.eq(0).find(".league-standings-link span").text().trim(),
      K: tds.eq(1).text(),
      V: tds.eq(2).text(),
      U: tds.eq(3).text(),
      T: tds.eq(4).text(),
      "+": tds.eq(5).text(),
      "-": tds.eq(6).text(),
      P: tds.eq(7).text(),
    });
  });

  return standingsData;
};

const extractTopscorerData = (html) => {
  const $ = cheerio.load(html);
  const topscorer = [];

  const lis = $(".list-player-item");

  for (let i = 0; i < 20; i++) {
    const el = lis.eq(i);

    topscorer.push({
      Spiller: el.find(".player-name").text(),
      Klub: el.find(".team-name").text(),
      Mål: el.find(".goals").text(),
    });
  }

  return topscorer;
};

const extractAssistsData = (html) => {
  const $ = cheerio.load(html);
  const assists = [];

  const lis = $(".list-player-item");

  for (let i = 0; i < 20; i++) {
    const el = lis.eq(i);

    assists.push({
      Spiller: el.find(".player-name").text(),
      Klub: el.find(".team-name").text(),
      Assists: el.find(".goals").text(),
    });
  }

  return assists;
};

const extractCardsData = (html) => {
  const $ = cheerio.load(html);
  const cards = [];

  const cardTable = $(".cards-table");
  const cardBodies = cardTable.eq(0).find(".card-body");

  cardBodies.each((i, el) => {
    const spans = $(el).find("span");

    cards.push({
      Klub: spans.eq(0).text(),
      Gult: spans.eq(1).text(),
      Rødt: spans.eq(2).text(),
      Total: spans.eq(3).text(),
    });
  });

  return cards;
};

module.exports = {
  fetchStatsData,
};

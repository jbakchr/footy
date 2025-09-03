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
      Pos: tds.eq(0).find(".rank-number").text(),
      Team: tds.eq(0).find(".league-standings-link span").text().trim(),
      Pl: tds.eq(1).text(),
      W: tds.eq(2).text(),
      D: tds.eq(3).text(),
      L: tds.eq(4).text(),
      GF: tds.eq(5).text(),
      GA: tds.eq(6).text(),
      Pts: tds.eq(7).text(),
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
      Player: el.find(".player-name").text(),
      Team: el.find(".team-name").text(),
      Goals: el.find(".goals").text(),
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
      Player: el.find(".player-name").text(),
      Team: el.find(".team-name").text(),
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
      Team: spans.eq(0).text(),
      Yellow: spans.eq(1).text(),
      Red: spans.eq(2).text(),
      Total: spans.eq(3).text(),
    });
  });

  return cards;
};

module.exports = {
  fetchStatsData,
};

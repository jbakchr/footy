#!/usr/bin/env node

require("dotenv").config();
const { program } = require("commander");
const axios = require("axios");

const leagues = require("./leagues/leagues");
const { version } = require("./package.json");

program
  .name("footy")
  .description("CLI for showing football league standings in the terminal")
  .version(version)
  .argument("<league>", "league to show standings for")
  .action(async (league) => {
    const options = {
      method: "GET",
      url: "https://free-api-live-football-data.p.rapidapi.com/football-get-standing-all",
      params: { leagueid: leagues[league] },
      headers: {
        "x-rapidapi-key": process.env.API_KEY,
        "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.response.standing);
    } catch (error) {
      console.log(error);
    }
  });

program.parse();

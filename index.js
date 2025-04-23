#!/usr/bin/env node

require("dotenv").config();
const { program } = require("commander");
const axios = require("axios");
const { Table } = require("console-table-printer");

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

      const p = new Table({
        columns: [
          { name: "#", alignment: "right" },
          { name: "Team", alignment: "left" },
          { name: "Pl", alignment: "right" },
          { name: "W", alignment: "right" },
          { name: "D", alignment: "right" },
          { name: "L", alignment: "right" },
          { name: "Pts", alignment: "right", color: "yellow" },
        ],
      });

      response.data.response.standing.forEach(
        ({ idx, name, played, wins, draws, losses, pts }) => {
          p.addRow({
            "#": idx,
            Team: name,
            Pl: played,
            W: wins,
            D: draws,
            L: losses,
            Pts: pts,
          });
        }
      );

      p.printTable();
    } catch (error) {
      console.log(error);
    }
  });

program.parse();

#!/usr/bin/env node

const { program } = require("commander");
const { version } = require("./package.json");
const leagues = require("./leagues/leagues");

program
  .name("footy")
  .description("CLI for showing football league standings in the terminal")
  .version(version)
  .argument("<league>", "league to show standings for")
  .action((league) => {
    const leagueId = leagues[league];
    console.log(leagueId);
  });

program.parse();

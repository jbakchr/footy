#!/usr/bin/env node

const { program } = require("commander");

const { version } = require("../package.json");
const { LEAGUES, STAT } = require("./constants");
const { fetchStatsData } = require("./utils/scraper.js");
const { printStatsTable } = require("./utils/printer.js");

program
  .name("footy")
  .description("CLI for showing football league stats in the terminal")
  .version(version);

program.option("-s, --stat <stat>", "statistic to show", "standing");

program.argument("<league>", "league to show").action(async (league) => {
  const l = LEAGUES[league] || "superligaen";
  const stat = STAT[program.opts().stat] || "standing";

  const data = await fetchStatsData(l, stat);

  printStatsTable(data);
});

program.parse();

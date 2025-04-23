#!/usr/bin/env node

const { program } = require("commander");
const { version } = require("./package.json");

program
  .name("footy")
  .description("CLI for showing football league standings in the terminal")
  .version(version)
  .argument("<league>", "league to show standings for")
  .action((league) => {
    console.log(league);
  });

program.parse();

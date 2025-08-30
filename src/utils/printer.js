const { Table } = require("console-table-printer");

const printStatsTable = (data) => {
  const table = new Table();
  table.addRows(data);
  table.printTable();
};

module.exports = {
  printStatsTable,
};

require('dotenv').config();

const fs = require('fs');
const {logger} = require('./Logger.js');

class CsvUtil {
  constructor() {
    this.basePath = './' || process.env.CSV_PATH
  }

  async saveCsv(buffer, fileName) {
    fs.writeFile(`./${fileName}.csv`, buffer, (err) => {
      if(err) throw err;
      logger.info(`${fileName}.csv has been saved`)
    })
  }
}

module.exports = {
  CsvUtil
}

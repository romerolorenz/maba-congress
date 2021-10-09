require('dotenv').config();

const fs = require('fs');
const csv = require('csv-parser');
const { logger } = require('./Logger.js');

class CsvUtil {
  constructor() {
    this.basePath = './' || process.env.CSV_PATH
  }

  async saveCsv(buffer, fileName) {
    fs.writeFile(`./${fileName}.csv`, buffer, (err) => {
      if (err) throw err;
      logger.info(`${fileName}.csv has been saved`)
    })
  }

  async readCsv(fileName) {
    const res = [];
    return new Promise((resolve, reject) => {
      try {
        fs.createReadStream(this.basePath + fileName + '.csv')
          .pipe(csv())
          .on('data', (data) => res.push(data))
          .on('end', () => {
            console.log('hi');
            resolve(res);
          })
      } catch (error) {
        reject(error)
      }
    });
  };
}

module.exports = {
  CsvUtil
}

const { AppError, AppSuccess, logger, CsvUtil } = require('../utilities/');
const RepHandlers = require('../handlers/RepHandlers.js');
const { SqlService } = require('../services/SqlService');
csv = new CsvUtil()

function uploadRepresentativeFile(req, res, next) {
  const repData = (req.swagger.params.repData.value);
  try {
    csv.saveCsv(repData.buffer, 'representative')
    res.json(new AppSuccess())
  } catch (error) {
    logger.error(error.message)
    next(new AppError(error))
  }
}

function seedRepresentativeFile(req, res, next) {
  try {
    csv.readCsv('representative')
      .then(result => {
        RepHandlers.batchSaveRepresentative(result)
          .then(result => {
            res.json(new AppSuccess('File processed'));
          })
      })
  } catch (error) {
    logger.error(error)
    next(new AppError(error))
  }
}

function getRepresentative(req, res, next) {
  const repParams = (req.swagger.params);
  const firstName = repParams.firstName.value;
  const lastName = repParams.lastName.value;
  const district = repParams.district.value;
  const region = repParams.region.value;

  const filter = { firstName, lastName, district, region };

  try {
    RepHandlers.getRepresentative(filter)
      .then(result => {
        res.json({ result })
      })
  } catch (error) {
    logger.error(error.message)
    next(new AppError(error))
  }
}

function updateRepresentative(req, res, next) {
  const repParams = (req.swagger.params.updateDetails.value);
  const firstName = repParams.firstName;
  const lastName = repParams.lastName;
  const district = repParams.district;
  const region = repParams.region;
  const id = req.swagger.params.id.value;

  const update = { firstName, lastName, district, region };

  const where = {
    id: id
  };

  try {
    RepHandlers.updateRepresentative(update, where)
      .then(result => {
        res.json(new AppSuccess(`Updated ${result} record/s`))
      })
  } catch (error) {
    console.log(error)
    next(new AppError(error))
  }
}

function insertRepresentative(req, res, next) {
  const repDetails = (req.swagger.params.repDetails.value);
  RepHandlers.insertRepresentative([repDetails])
    .then(result => {
      res.json(new AppSuccess(result))
    })
    .catch(error => {
      logger.error(error.error)
      next(new AppError(error))
    })
}

module.exports = {
  uploadRepresentativeFile,
  seedRepresentativeFile,
  getRepresentative,
  updateRepresentative,
  insertRepresentative
}
const { AppError, AppSuccess, logger, CsvUtil } = require('../utilities/');
const AssetHandlers = require('../handlers/AssetHandlers.js');
csv = new CsvUtil()

function getAsset(req, res, next) {
  const params = (req.swagger.params);
  console.log(params)
  const representativeId = params.representativeId.value;

  const filter = { representativeId };

  try {
    AssetHandlers.getAsset(filter)
      .then(result => {
        res.json({ result })
      })
  } catch (error) {
    logger.error(error.message)
    next(new AppError(error))
  }
}

function insertAsset(req, res, next) {
  const assetDetails = (req.swagger.params.assetDetails.value);
  assetDetails.date = new Date(assetDetails.date)
  console.log(assetDetails)
  AssetHandlers.insertAsset([assetDetails])
    .then(result => {
      res.json(new AppSuccess(result))
    })
    .catch(error => {
      logger.error(error.error)
      next(new AppError(error))
    })
}

module.exports = {
  getAsset,
  insertAsset
}
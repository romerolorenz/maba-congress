const {AppError, AppSuccess, logger, CsvUtil} = require('../utilities/');
csv = new CsvUtil()




function uploadRepresentativeFile(req, res, next) {
  const repData = (req.swagger.params.repData.value);
  
  try{
    csv.saveCsv(repData.buffer, 'representative')
    res.json(new AppSuccess())
  } catch(error) {
    logger.error(error.message)
    next(new AppError(error))
  }
}

module.exports = {
  uploadRepresentativeFile
}
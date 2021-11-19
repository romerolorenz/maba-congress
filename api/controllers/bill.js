const { AppError, AppSuccess, logger, CsvUtil } = require('../utilities/');
const BillHandlers = require('../handlers/BillHandlers.js');
csv = new CsvUtil()

const knex_params = require('../../knexfile.js');
const { pickBy, isEmpty, isNil } = require('lodash');
const knex = require('knex')(knex_params);

function getBillJoin(req, res, next) {
  const params = (req.swagger.params);
  const billNumber = params.billNumber.value;
  const primaryReferralCommittee = params.primaryReferralCommittee.value;
  const representativeId = params.representativeId.value;
  const firstName = params.firstName.value;
  const lastName = params.lastName.value;


  const filter = { 
    'bill.billNumber': billNumber, 
    'bill.primaryReferralCommittee': primaryReferralCommittee,
    'representative.id': representativeId,
    'representative.firstName': firstName,
    'representative.lastName': lastName
  };

  knex('bill')
    .join('authorship', 'authorship.billNumber', 'bill.billNumber')
    .join('representative', 'representative.id', 'authorship.representativeId')
    .select(
      'bill.billNumber',
      'bill.dateFiled',
      'bill.dateRead',
      'bill.primaryReferralCommittee',
      'bill.title',
      'bill.status',
      'representative.id',
      'representative.firstName',
      'representative.lastName'
    )
    .where(pickBy(filter, (query) => !isNil(query) && query !== ''))
    .then(result => {
      res.json({ result })
    })
}

function getBill(req, res, next) {
  const params = (req.swagger.params);
  const billNumber = params.billNumber.value;
  const primaryReferralCommittee = params.primaryReferralCommittee.value;

  const filter = { billNumber, primaryReferralCommittee };

  try {
    BillHandlers.getBill(filter)
      .then(result => {
        res.json({ result })
      })
  } catch (error) {
    logger.error(error.message)
    next(new AppError(error))
  }
}

function updateBill(req, res, next) {
  const billParams = (req.swagger.params.updateDetails.value);
  const dateRead = billParams.dateRead;
  const motherBillStatus = billParams.motherBillStatus;
  const status = billParams.status;
  const billNumber = req.swagger.params.billNumber.value;

  const update = { dateRead, motherBillStatus, status };

  const where = {
    billNumber
  };

  try {
    BillHandlers.updateBill(update, where)
      .then(result => {
        res.json(new AppSuccess(`Updated ${result} record/s`))
      })
  } catch (error) {
    logger.error(error.error)
    next(new AppError(error))
  }
}

function insertBill(req, res, next) {
  const billDetails = (req.swagger.params.billDetails.value);
  authors = billDetails.authorship
  delete billDetails.authorship

  BillHandlers.insertBill([billDetails], )
    .then(async result => {
      for(let i = 0; authors.length > i; i++) {
        authDetails = {
          billNumber: billDetails.billNumber,
          representativeId: authors[i]
        }
        console.log(authDetails)
        await BillHandlers.insertAuthorship(authDetails)
      }
      res.json(new AppSuccess(result))
    })
    .catch(error => {
      logger.error(error.error)
      next(new AppError(error))
    })
}

module.exports = {
  getBill,
  getBillJoin,
  updateBill,
  insertBill
}
const { Types: { ObjectId } } = require('mongoose')
const log = require('../services/logger')
const ReactionInstance = require('../models/reaction-instances')

/**
 * Create reactionInstance
 * @method create
 * @param  {object} reactionInstance
 * @return {promise}
 */

exports.create = function create (reactionInstance) {
  log.debug('create reactionInstance')
  return (new ReactionInstance(reactionInstance)).save()
}

/**
 * Get reactionInstance by id
 * @method get
 * @param  {string} id
 * @return {promise}
 */

exports.get = function get (id) {
  log.debug('get reactionInstance')
  return ReactionInstance.findOne({ _id: ObjectId(id) })
}

/**
 * Get list of reactionInstances
 * @method list
 * @param  {object} opts
 * @param  {number} opts.limit
 * @param  {number} opts.page
 * @return {promise}
 */

exports.list = function list ({ filter, limit, page, ids }) {
  log.debug('get reactionInstance list')
  if (filter !== undefined) {
    let filterToJSON = JSON.parse(filter)
    // Not neccesary ATM
    // if (filterToJSON.title || filterToJSON.q) {
    //   filterToJSON.title = { $regex: (filterToJSON.title || filterToJSON.q), $options: 'i' }
    //   delete filterToJSON.q
    // }
    return ReactionInstance.paginate(filterToJSON, { page, limit })
  }
  if (ids) {
    const idsToArray = JSON.parse(ids)
    idsToArray.map((id) => {
      return ObjectId(id)
    })
    return ReactionInstance.paginate({ '_id': { $in: idsToArray } }, { page, limit })
  }
  return ReactionInstance
    .paginate({}, { page, limit })
}

/**
 * Update listResultsByPost
 * @method list
 * @param  {object} id
 * @param  {string} limit
 * @param  {object} page
 * @return {promise}
 */

exports.listResultsByPost = function listResultsByPost ({ id }) {
  log.debug('get reactionInstances results list by post id')
  return ReactionInstance.find({ resourceId: ObjectId(id) })
    .populate({ path: 'results', populate: { path: 'userId', select: 'name _id' } })
    .populate('reactionId')
}

/**
 * Update getResult
 * @method get
 * @param  {object} id
 * @param  {string} limit
 * @param  {object} page
 * @return {promise}
 */

exports.getResult = function getResult ({ id }) {
  log.debug('get reactionInstance result')
  return ReactionInstance.findOne({ _id: ObjectId(id) })
    .populate({ path: 'results', populate: { path: 'userId', select: 'name _id' } })
    .populate('reactionId')
}

/**
 * Update reactionInstance
 * @method update
 * @param  {object} opts
 * @param  {string} opts.id
 * @param  {object} opts.reactionInstance
 * @return {promise}
 */

exports.update = function update ({ id, reactionInstance }) {
  log.debug('update reactionInstance')
  // return Promise.resolve()
  return ReactionInstance.findOne({ _id: ObjectId(id) })
    .then((_ReactionInstance) => Object.assign(_ReactionInstance, reactionInstance).save())
}

/**
 * Remove reactionInstance
 * @method delete
 * @param  {string} id
 * @return {promise}
 */

exports.remove = function remove (id) {
  log.debug('remove reactionInstance')
  return ReactionInstance.findOne({ _id: ObjectId(id) })
    .then((ReactionInstance) => ReactionInstance.remove())
}

// TODO

/**
 * Get reactionInstance by resourceId
 */

/**
 * Get list of active reactionInstances (not closed)
 *   Param: (Opt) dateFrom: Date (Default: start of the current year)
 *   Param: (Opt) dateTo: Date (Default: current day-month-year)
 */

/**
 * Get list of closed reactionInstances in a range of date
 *   Param: (Opt) dateFrom: Date (Default: start of the current year)
 *   Param: (Opt) dateTo: Date (Default: current day-month-year)
 */

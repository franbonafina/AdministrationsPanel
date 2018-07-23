const { Types: { ObjectId } } = require('mongoose')
const log = require('../services/logger')
const ReactionRule = require('../models/reaction-rules')

/**
 * Create ReactionRule
 * @method create
 * @param  {object} ReactionRule
 * @return {promise}
 */

exports.create = function create (reactionRule) {
  log.debug('create ReactionRule')
  return (new ReactionRule(reactionRule)).save()
}

/**
 * Get ReactionRule by id
 * @method get
 * @param  {string} id
 * @return {promise}
 */

exports.get = function get (id) {
  log.debug('get ReactionRule')
  return ReactionRule.findOne({ _id: ObjectId(id) })
}

/**
 * Get list of ReactionRules by name
 * @method getByName
 * @param  {string} reactionName
 * @param  {number} opts.limit
 * @param  {number} opts.page
 * @return {promise}
 */

exports.listByName = function listByName ({ name, limit, page }) {
  log.debug('get list of ReactionRules by name')
  return ReactionRule.paginate({ name: { $regex: name, $options: 'i' } }, { page, limit })
}
/**
 * Get ReactionRule by name
 * @method getOneByName
 * @param  {string} reactionName
 * @return {promise}
 */

exports.getByName = function getByName (reactionName) {
  log.debug('get one ReactionRule by name')
  return ReactionRule.findOne({ name: reactionName })
}

/**
 * Get list of ReactionRules
 * @method list
 * @param  {object} opts
 * @param  {number} opts.limit
 * @param  {number} opts.page
 * @return {promise}
 */

exports.list = function list ({ filter, limit, page }) {
  log.debug('get ReactionRule list')
  log.info('filter: ' + filter)
  if (filter !== undefined) {
    let filterToJSON = JSON.parse(filter)
    if (filterToJSON.name) {
      filterToJSON.name = { $regex: filterToJSON.name, $options: 'i' }
    }
    return ReactionRule.paginate(filterToJSON, { page, limit })
  } else {
    return ReactionRule.paginate({}, { page, limit })
  }
}

/**
 * Update ReactionRule
 * @method update
 * @param  {object} opts
 * @param  {string} opts.id
 * @param  {object} opts.ReactionRule
 * @return {promise}
 */

exports.update = function update ({ id, reactionRule }) {
  log.debug('update ReactionRule')
  // return Promise.resolve()
  return ReactionRule.findOne({ _id: ObjectId(id) })
    .then((_ReactionRule) => Object.assign(_ReactionRule, reactionRule).save())
}

/**
 * Remove ReactionRule
 * @method delete
 * @param  {string} id
 * @return {promise}
 */

exports.remove = function remove (id) {
  log.debug('remove ReactionRule')
  return ReactionRule.findOne({ _id: ObjectId(id) })
    .then((ReactionRule) => ReactionRule.remove())
}

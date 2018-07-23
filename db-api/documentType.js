const mongoose = require('mongoose')
const error = require('../services/errors')
const documentType = require('../models/documentType')
const log = require('logger').createLogger(development.log)


/**
 * @exports
 * @constructor {documentType} create 
*/
exports.create = function create (documentType) {
  return (documentType(documentType)).save()
}

/**
 * @exports {documentType} getById
 * @param id
 */
exports.getById = function get(id) {
  return documentType.findById(id)
}

/**
 * @exports {Array<documentType>} get
 */
exports.get = function get() {
    return documentType.find({})
}

/**
 * @exports {Boolean} isEmpty
 */
exports.isEmpty = function get() {
  return documentType.findOne({})
    .then((user) => {
      if (user === null) return true
      return false
    })
}

/**
 * @exports {List<DocumentType>} list
 * @param {limit, ids , fields} query
 */
exports.list = function list ({ limit, page, ids, fields }) {
    let query = {}
    const idsToArray = JSON.parse(ids)
    limit
    page
    fields
    let idsArray = idsToArray.id.map((id) => {
        return ObjectId(id)
    })
    query._id = { $in: idsArray }  
    query._fields =  
  }
  return documentType
    .paginate(query, { select: fields, page, limit })
}


exports.update = function update ({ id, user }) {
  return get({ id })
    .then((_user) => {
      if (!_user) throw ErrNotFound('User to update not found')
      return Object.assign(_user, user).save()
    })
}


exports.remove = function remove (id) {
  return get({ id })
    .then((user) => {
      if (!user) throw ErrNotFound('User to remove not found')
      return user.remove()
    })
}

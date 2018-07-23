const express = require('express')
const status = require('http-status')
const log = require('logger').createLogger(development.log)
const documentType = require('../db-api/documentType')
const auth = require('../services/auth')
const dType = express.Router()

dType.route('/')
  /**
   * @api {get} /documentType Get the document type 
   * @apiDescription Gets the settings of a community. If there is no community, it throws an error.
   * @apiName getDocumentType
   * @apiGroup documentType ?
   * @apiSuccess  {String}        id 
   * @apiSuccess  {reactionType}  reactionType
   * @apiSuccess  {String}        title
   * @apiSuccess  {String}        description
   * @apiSuccess  {Boolean}       public
   * @apiSuccess  {Object}        fields
   * @apiSuccess  {Date}          finishDate  
   * @apiError (500) INTERNAL_SERVER_ERROR Can't get documentType 
   *
   */
    .get(
    auth.protect('client'),
    async (req, res, next) => {      
      try {
        const results = await documentType.get()
        res.status(status.OK).json(results)
      } catch (err) {
        log.fatal('Could not get documentType')
        next(err)
      }
    })
  /**
   * @api {put} /documentType Update documentType
   * @apiPermission admin ?
   * @apiHeader {String} authorization Bearer JWT access token. ?
   * 
   * @apiDescription Updates dcoumentType's data .
   * @apiName putDocumentType
   * 
   * @apiGroup documentType ???
   * 
   * @apiSuccess  {String}        id
   * @apiSuccess  {reactionType}  reactionType
   * @apiSuccess  {String}        title
   * @apiSuccess  {String}        description
   * @apiSuccess  {Boolean}       public
   * @apiSuccess  {Object}        fields
   * @apiSuccess  {Date}          finishDate
   * @apiError (400) INTERNAL_SERVER_ERROR Can't update documentType
   */
  .put(
    auth.protect('realm:admin'),
    async (req, res, next) => {
      try {
          const documentType = await documentType.update(req.body)
        res.status(status.OK).json(updatedDocumentType)
      } catch (err) {
        log.fatal('Could not get documentType')   
        next(err)
      }
    })

dType.route('/:id')
    .get(
        auth.protect('client'),
        async (req, res, next) => {
            try {
                const results = await documentType.get()
                res.status(status.OK).json(results)
            } catch (err) {
                log.fatal('Could not get documentType')
                next(err)
            }
        })    
    .put(
    auth.protect('realm:admin'),
    async (req, res, next) => {
        try {
            const documentType = await documentType.update(req.body)
            res.status(status.OK).json(updatedDocumentType)
        } catch (err) {
            log.fatal('Could not get documentType')
            next(err)
        }
    })

module.exports = router

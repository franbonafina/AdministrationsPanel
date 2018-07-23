var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

/**
   * @name {documentType schema} 
   *
   */
const documentType = new mongoose.Schema({
  id: String, //??
  reactionType: { type: mongoose.Schema.Types.Enum, ref: 'reactionType' },
  title: String,
  description: String,
  public: Boolean,
  fields: Object,
  finishDate: Date,
}, { timestamps: true })

/** @description { 'mongoose-paginate' plugin extension, let u to limit amount of register via overload method '.paginate()' }*/
documentType.plugin(mongoosePaginate)

/**@exports */
module.exports = mongoose.model('DocumentType', documentType) 

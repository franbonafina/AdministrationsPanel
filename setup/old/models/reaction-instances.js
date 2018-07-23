const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

/**
 * Define `ReactionInstance` Schema
 */

const ReactionInstance = new mongoose.Schema({
  title: String,
  instruction: String,
  reactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'ReactionRule' },
  resourceType: String,
  resourceId: String,
  results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ReactionVote' }]
}, { timestamps: true })

/**
 * Define Schema Indexes
 */
/**
* Model's Plugin Extensions
*/

ReactionInstance.plugin(mongoosePaginate)

/**
 * Expose `ReactionInstance` Model
 */

module.exports = mongoose.model('ReactionInstance', ReactionInstance)

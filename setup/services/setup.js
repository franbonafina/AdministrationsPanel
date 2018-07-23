// Requires winston lib for log
const { log } = require('../main/logger')
const { ADMIN_EMAIL } = require('../main/config')
const Settings = require('../cms/db-api/settings')
const User = require('../users/db-api/user')

const setup = async (req, res, next) => {
  log.debug('setup middleware')
  // Find if settings is already init
  try {
    await Settings.getOne()
    // If Settings are init return next()
    return next()
    // If not, search if ADMIN_MAIL is set
  } catch (e) {
    if (ADMIN_EMAIL !== null) {
      // If ADMIN_MAIL is setted and is saved in DB there is no content to show, so redirect to 'li
      const admin = await User.get({ email: ADMIN_EMAIL, role: 'admin' })
      if (admin !== null) return res.redirect('/limbo')
      // If ADMIN_MAIL is not saved in DB redirect to init page so platform can be initialized
      return res.redirect('/init')
    } else {
      // If ADMIN_MAIL is not setted find other admin users in db
      const admins = await User.list({
        filter: JSON.stringify({ role: 'admin' }),
        page: 1,
        limit: 10
      })
      // If there are other admin users return next()
      if (admins.docs.length >= 1) return res.redirect('/limbo')
      // If no admin users in DB redirect to init page
      return res.redirect('/init')
    }
  }
}

module.exports = {
  setup
}

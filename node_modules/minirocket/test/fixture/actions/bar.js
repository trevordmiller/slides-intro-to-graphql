const logger = require('../logger')

module.exports = argv => logger.log(`Hello, ${argv.name}!`)

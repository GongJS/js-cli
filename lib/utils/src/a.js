const log = require('npmlog')
const info = log.info
// log.info = (message, prefix = '') => {
//   info(prefix, message)
// }
console.log(log.info('', 'test'))

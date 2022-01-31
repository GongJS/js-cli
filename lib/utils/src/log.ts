import log from 'npmlog'

log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info'

log.heading = 'js-cli'
log.addLevel('success', 2000, {fg: 'green', bold: true})
const info = log.info
log.info = (message: string, prefix = '') => {
  info(prefix, message)
}
export default log

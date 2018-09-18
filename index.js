const Lynx = require('lynx')

module.exports = params => store => next => action => {
  try {
    const { statsd_url, statsd_port, frequency, prefix } = params
    if (!statsd_url) {
      throw new Error('Missing statsd_url')
    }
    const metrics = new Lynx(statsd_url, statsd_port || 8125, prefix || '')
    metrics.increment(action.type, frequency || 1)
    next(action)
  } catch (e) {
    throw e
  }
}

const compression = require('compression')
const express = require('express')
const winston = require('winston'); require('winston-daily-rotate-file')

// create logger
const logger = winston.createLogger({
  level: 'info',
  format:
        winston.format.printf(({ message }) => {
          const now = new Date()
          const date = `${now.getFullYear()}-${(`0${now.getMonth() + 1}`).slice(-2)}-${(`0${now.getDate()}`).slice(-2)}`
          const time = `${(`0${now.getHours()}`).slice(-2)}:${(`0${now.getMinutes()}`).slice(-2)}:${(`0${now.getSeconds()}`).slice(-2)}`
          return `[${date}.${time}] ${message}`
        }),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      level: 'info',
      dirname: 'logs/',
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '10d',
    }),
  ],
})

// create express instance
const app = express()
const port = 5001

// trust one layer of proxies (cf)
app.set('trust proxy', 1)
app.use(compression())

// get referrer if available
app.use('/', async (req, res, next) => {
  const ip = (req.headers['cf-connecting-ip'] || req.ip)
  const fip = ip.split(ip.length > 15 ? ':' : '.').map(n => (`000${n}`).slice(ip.length > 15 ? -4 : -3)).join(ip.length > 15 ? ':' : '.')
  if (req.get('Referrer') && !req.get('Referrer').includes('https://adibarra.com/'))
    logger.info(`[${fip}] [Referred By: ${req.get('Referrer')}]`)
  next()
})

// set ./dist as root directory, serve request with no extension as .html
app.use(express.static('dist', { extensions: ['html'] }))

// default all other requests to the 404 page
app.use(async (req, res) => {
  res.status(404).sendFile('dist/index.html', { root: __dirname })
  const ip = (req.headers['cf-connecting-ip'] || req.ip)
  const fip = ip.split(ip.length > 15 ? ':' : '.').map(n => (`000${n}`).slice(ip.length > 15 ? -4 : -3)).join(ip.length > 15 ? ':' : '.')
  logger.info(`[${fip}] [❌ 404] [GET ${req.url}]`)
})

// start the server
app.listen(port, () => logger.info(`Server running on port: ${port}`))

// handle sigint
process.on('SIGINT', () => {
  logger.info('Gracefully shutting down from SIGINT (Ctrl-C)\n')
  process.exit(0)
})

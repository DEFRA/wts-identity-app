const createServer = require('./server')
const os = require('os')

createServer()
  .then(server => {
    server.start()
    console.log(`starting : ${process.version} / ${os.platform} / ${os.type} / ${os.version} / ${os.release}`)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })

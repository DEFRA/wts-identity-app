const routes = [].concat(
  require('../routes/home'),
  require('../routes/about'),
  require('../routes/agencyofficer-dashboard'),
  require('../routes/exporter-dashboard'),
  require('../routes/login'),
  require('../routes/public')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}

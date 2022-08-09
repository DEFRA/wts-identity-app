module.exports = [{
  method: 'GET',
  path: '/home',
  handler: (request, h) => {
    return h.view('home', {
      title: 'Hello',
      message: 'Damian'
    })
  }
}]

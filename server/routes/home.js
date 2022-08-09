module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: {
        view: 'home'
    }
  },
  {
  method: 'GET',
  path: '/home',
  handler: (request, h) => {
    return h.view('home', {
      title: 'Hello',
      message: 'Damian'
    })
  }
}]

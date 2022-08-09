module.exports = [{
    method: 'GET',
    path: '/',
    handler: {
        view: 'login'
    }
},
{
    method: 'GET',
    path: '/login',
    handler: {
        view: 'login'
    }
},
{
    method: 'POST',
    path: '/',
    handler: (request, h) => {
        const payload = request.payload;
        if (payload.userId === "paulweller") {
            return h.view('exporter-dashboard', {
                title: 'Hello',
                message: payload.userId,
            })
        } else {
            return h.view('agencyofficer-dashboard', {
                title: 'Hello',
                message: payload.userId,
            })
        }
    }
},
{
    method: 'POST',
    path: '/login',
    handler: (request, h) => {
        const payload = request.payload;
        if (payload.userId === "paulweller") {
            return h.view('exporter-dashboard', {
                title: 'Hello',
                message: payload.userId,
            })
        } else {
            return h.view('agencyofficer-dashboard', {
                title: 'Hello',
                message: payload.userId,
            })
        }
    }
},
]

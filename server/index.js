const hapi = require('@hapi/hapi')
const { v4: uuidv4 } = require('uuid');
const config = require('./config')
const { Provider } = require('oidc-provider');
const Account = require('./repository/Account');
const configuration = {
  // ... see the available options in Configuration options section
  clients: [
    {
      client_id: "myclientid",
      client_secret: "myclientsecret",
      grant_types: ["refresh_token", "authorization_code", "implicit"],
      redirect_uris: [
        "https://jwt.io/",
        "http://localhost:4000/login/return",
        "https://rwd-wts-glw-dev-fe.azurewebsites.net/login/return"
      ],
      response_types: ["code", "id_token"],
    }
  ],
  claims: {
    openid: {
      exp: null,
      relationships: null,
      roles: null,
      serviceId: null,
      correlationId: null,
      currentRelationshipId: null,
      sessionId: null,
      email: null,
      contactId: null,
      firstName: null,
      lastName: null,
    },
  },
  features: {
    claimsParameter: { enabled: true },
    resourceIndicators: {},
  },
  findAccount: Account.findAccount,
  jwks: {
    keys: [
      {
        d: 'VEZOsY07JTFzGTqv6cC2Y32vsfChind2I_TTuvV225_-0zrSej3XLRg8iE_u0-3GSgiGi4WImmTwmEgLo4Qp3uEcxCYbt4NMJC7fwT2i3dfRZjtZ4yJwFl0SIj8TgfQ8ptwZbFZUlcHGXZIr4nL8GXyQT0CK8wy4COfmymHrrUoyfZA154ql_OsoiupSUCRcKVvZj2JHL2KILsq_sh_l7g2dqAN8D7jYfJ58MkqlknBMa2-zi5I0-1JUOwztVNml_zGrp27UbEU60RqV3GHjoqwI6m01U7K0a8Q_SQAKYGqgepbAYOA-P4_TLl5KC4-WWBZu_rVfwgSENwWNEhw8oQ',
        dp: 'E1Y-SN4bQqX7kP-bNgZ_gEv-pixJ5F_EGocHKfS56jtzRqQdTurrk4jIVpI-ZITA88lWAHxjD-OaoJUh9Jupd_lwD5Si80PyVxOMI2xaGQiF0lbKJfD38Sh8frRpgelZVaK_gm834B6SLfxKdNsP04DsJqGKktODF_fZeaGFPH0',
        dq: 'F90JPxevQYOlAgEH0TUt1-3_hyxY6cfPRU2HQBaahyWrtCWpaOzenKZnvGFZdg-BuLVKjCchq3G_70OLE-XDP_ol0UTJmDTT-WyuJQdEMpt_WFF9yJGoeIu8yohfeLatU-67ukjghJ0s9CBzNE_LrGEV6Cup3FXywpSYZAV3iqc',
        e: 'AQAB',
        kty: 'RSA',
        n: 'xwQ72P9z9OYshiQ-ntDYaPnnfwG6u9JAdLMZ5o0dmjlcyrvwQRdoFIKPnO65Q8mh6F_LDSxjxa2Yzo_wdjhbPZLjfUJXgCzm54cClXzT5twzo7lzoAfaJlkTsoZc2HFWqmcri0BuzmTFLZx2Q7wYBm0pXHmQKF0V-C1O6NWfd4mfBhbM-I1tHYSpAMgarSm22WDMDx-WWI7TEzy2QhaBVaENW9BKaKkJklocAZCxk18WhR0fckIGiWiSM5FcU1PY2jfGsTmX505Ub7P5Dz75Ygqrutd5tFrcqyPAtPTFDk8X1InxkkUwpP3nFU5o50DGhwQolGYKPGtQ-ZtmbOfcWQ',
        p: '5wC6nY6Ev5FqcLPCqn9fC6R9KUuBej6NaAVOKW7GXiOJAq2WrileGKfMc9kIny20zW3uWkRLm-O-3Yzze1zFpxmqvsvCxZ5ERVZ6leiNXSu3tez71ZZwp0O9gys4knjrI-9w46l_vFuRtjL6XEeFfHEZFaNJpz-lcnb3w0okrbM',
        q: '3I1qeEDslZFB8iNfpKAdWtz_Wzm6-jayT_V6aIvhvMj5mnU-Xpj75zLPQSGa9wunMlOoZW9w1wDO1FVuDhwzeOJaTm-Ds0MezeC4U6nVGyyDHb4CUA3ml2tzt4yLrqGYMT7XbADSvuWYADHw79OFjEi4T3s3tJymhaBvy1ulv8M',
        qi: 'wSbXte9PcPtr788e713KHQ4waE26CzoXx-JNOgN0iqJMN6C4_XJEX-cSvCZDf4rh7xpXN6SGLVd5ibIyDJi7bbi5EQ5AXjazPbLBjRthcGXsIuZ3AtQyR0CEWNSdM7EyM5TRdyZQ9kftfz9nI03guW3iKKASETqX2vh0Z8XRjyU',
        use: 'sig',
      }, {
        crv: 'P-256',
        d: 'K9xfPv773dZR22TVUB80xouzdF7qCg5cWjPjkHyv7Ws',
        kty: 'EC',
        use: 'sig',
        x: 'FWZ9rSkLt6Dx9E3pxLybhdM6xgR5obGsj5_pqmnz5J4',
        y: '_n8G69C-A2Xl4xUW2lF0i8ZGZnk_KPYrhv4GbTGu5G4',
      },
    ],
  },
  pkce: {
    required: Account.pkceRequired,
  },
  scope: ["openid", "offline_access"],
  scopes: ["offline_access openid", "openid", "offline_access"],
  // ...
};
const serviceId = uuidv4();
const broker = {
    orgId: uuidv4(),
    orgName: "Guildford Waste Brokers",
};
const dealer = {
    orgId: uuidv4(),
    orgName: "Woking Waste Dealers",
};
const relationship_1 = uuidv4();
const relationship_2 = uuidv4();
const relationship_3 = uuidv4();
const userData = [
  {
    aal: 1,
    accountId: "User001",
    id: "User001",
    pwd: "xxx",
    firstName: "Paul",
    lastName: "Weller",
    contactId: uuidv4(),
    correlationId: uuidv4(),
    currentRelationshipId: relationship_1,
    enrolmentCount: 1,
    enrolmentRequestCount: 1,
    loa: 0,
    serviceId,
    sessionId: uuidv4(),
    relationships: [
      {
        relationshipId: relationship_1,
        organisationId: broker.orgId,
        organisationName: broker.orgName,
        organisationLoa: 0,
        relationship: "Employee",
        relationshipLoa: 0,
      },
    ],
    roles: [
      {
        relationshipId: relationship_1,
        roleName: "WINRecorder",
        status: 3,
      }
    ],
    uniqueReference : uuidv4(),
  },
  {
    aal: 1,
    accountId: "User002",
    id: "User002",
    pwd: "xxx",
    firstName: "Bruce",
    lastName: "Foxton",
    contactId: uuidv4(),
    correlationId: uuidv4(),
    currentRelationshipId: relationship_2,
    enrolmentCount: 1,
    enrolmentRequestCount: 1,
    loa: 0,
    serviceId,
    sessionId: uuidv4(),
    relationships: [
      {
          relationshipId: relationship_2,
          organisationId: dealer.orgId,
          organisationName: dealer.orgName,
          organisationLoa: 0,
          relationship: "Employee",
          relationshipLoa: 0,
      },
    ],
    roles: [
        {
            relationshipId: relationship_2,
            roleName: "WINRecorder",
            status: 3,
        }
    ],
    uniqueReference : uuidv4(),
  },
  {
    aal: 1,
    accountId: "User003",
    id: "User003",
    pwd: "xxx",
    firstName: "Rick",
    lastName: "Buckler",
    contactId: uuidv4(),
    correlationId: uuidv4(),
    currentRelationshipId: relationship_3,
    enrolmentCount: 1,
    enrolmentRequestCount: 1,
    loa: 0,
    serviceId,
    sessionId: uuidv4(),
    relationships: [
      {
          relationshipId: relationship_3,
          organisationId: dealer.orgId,
          organisationName: dealer.orgName,
          organisationLoa: 0,
          relationship: "Employee",
          relationshipLoa: 0,
      },
    ],
    roles: [
        {
            relationshipId: relationship_2,
            roleName: "WINReader",
            status: 3,
        }
    ],
    uniqueReference : uuidv4(),
  },
];

try {
    userData.map((account) => {
        const storeAccount = new Account(account.id, account);
        console.log(`loaded ${account.id}`);
    });
} catch(error) {
  console.log(`Error: ${JSON.stringify(error, null, 4)}`);
}

const oidc = new Provider('http://localhost:3000', configuration);
// const oidc = new Provider('https://rwd-wts-idm-dev-fe.azurewebsites.net', configuration);

const { invalidate: orig } = oidc.Client.Schema.prototype;

oidc.Client.Schema.prototype.invalidate = function invalidate(message, code) {
  if ((process.env.NODE_ENV === 'dev') && (code === 'implicit-force-https' || code === 'implicit-forbid-localhost')) {
    return;
  }

  orig.call(this, message);
};

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    }
  })
  const callback = oidc.callback();
  server.route({
    path: `/oidc/{any*}`,
    method: '*',
    config: { payload: { output: 'stream', parse: false } },
    async handler({ raw: { req, res } }, h) {
      console.error(`oidc: url - ${req.method} - ${req.url}`);
      req.originalUrl = req.url;
      req.url = req.url.replace('/oidc', '');
      if ((req.url).includes("token")) {
        console.error(`token: url - ${req.method} - ${req.url} - ${req.originalUrl} - `);
        await new Promise((resolve) => {
          res.on('finish', resolve);
          console.error(`token finish: url - ${req.method} - ${req.url} - ${req.originalUrl} - ${res.statusCode}`);
          callback(req, res);
        });
      } else {
        await new Promise((resolve) => {
          res.on('finish', resolve);
          callback(req, res);
        });
      }

      req.url = req.url.replace('/', '/oidc');
      delete req.originalUrl;
  
      return res.finished ? h.abandon : h.continue;
    }
  });
  // Register the plugins
  await server.register(require('@hapi/inert'))
  await server.register(require('./plugins/views'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/error-pages'))
  await server.register(require('./plugins/logging'))
  await server.register(require('blipp'))

  return server
}

module.exports = createServer

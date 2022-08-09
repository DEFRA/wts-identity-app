const store = new Map();
const logins = new Map();
const { nanoid } = require('nanoid');

class Account {
    constructor(id, profile) {
        this.accountId = id || nanoid();
        this.profile = profile;
        store.set(this.accountId, this);
    }

    flattenRelationships() {
        const flattened = this.profile.relationships.map((rel) => {
            const values = Object.values(rel);
            return values.join(":");
        });
        return flattened;
    }
    flattenRoles() {
        const flattenedRoles = this.profile.roles.map((role) => {
            const values = Object.values(role);
            return values.join(":");
        });
        return flattenedRoles;
    }
    /**
     * @param use - can either be "id_token" or "userinfo", depending on
     *   where the specific claims are intended to be put in.
     * @param scope - the intended scope, while oidc-provider will mask
     *   claims depending on the scope automatically you might want to skip
     *   loading some claims from external resources etc. based on this detail
     *   or not return them in id tokens but only userinfo and so on.
     */
    async claims(use, scope) { // eslint-disable-line no-unused-vars
        if (this.profile) {
            return {
                sub: this.accountId, // it is essential to always return a sub claim
                firstName: this.profile.firstName,
                lastName: this.profile.lastName,
                relationships: this.flattenRelationships(),
                roles: this.flattenRoles(),
                serviceId: this.profile.serviceId,
            };
        }

        return {
            sub: this.accountId, // it is essential to always return a sub claim

            address: {
                country: '000',
                formatted: '000',
                locality: '000',
                postal_code: '000',
                region: '000',
                street_address: '000',
            },
            birthdate: '1987-10-16',
            email: 'johndoe@example.com',
            email_verified: false,
            family_name: 'Doe',
            gender: 'male',
            given_name: 'John',
            locale: 'en-US',
            middle_name: 'Middle',
            name: 'John Doe',
            nickname: 'Johny',
            phone_number: '+49 000 000000',
            phone_number_verified: false,
            picture: 'http://lorempixel.com/400/200/',
            preferred_username: 'johnny',
            profile: 'https://johnswebsite.com',
            updated_at: 1454704946,
            website: 'http://example.com',
            zoneinfo: 'Europe/Berlin',
        };
    }

    static async findByFederated(provider, claims) {
        const id = `${provider}.${claims.sub}`;
        if (!logins.get(id)) {
            logins.set(id, new Account(id, claims));
        }
        return logins.get(id);
    }

    static async findByLogin(login) {
        if (!logins.get(login)) {
            logins.set(login, new Account(login));
        }

        return logins.get(login);
    }

    static async findAccount(ctx, id, token) { // eslint-disable-line no-unused-vars
        // token is a reference to the token used for which a given account is being loaded,
        //   it is undefined in scenarios where account claims are returned from authorization endpoint
        // ctx is the koa request context
        if (!store.get(id)) new Account(id); // eslint-disable-line no-new
        return store.get(id);
    }

    static pkceRequired(ctx, client) {
        console.log(`pkce is required`);
        return true;
    }
}

module.exports = Account;

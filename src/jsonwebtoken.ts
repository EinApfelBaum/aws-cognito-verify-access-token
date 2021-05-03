

/**
 * 1. Insert the user pool client id, who will make the request.
 * 2. Insert your user pool id.
 * 3. Insert region, where your user pool is configured
 * 
 * 
 * https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
 * https://github.com/auth0/node-jsonwebtoken
 * https://github.com/auth0/node-jwks-rsa
 */


const clientId = '<Insert app client id here>'
const userPoolId = '<Insert User pool id here>';

const region = '<Insert your region here>';
const jwksDomain = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;



export const verifyToken = async (token: string) => {
    var jwt = require('jsonwebtoken');
    var jwksClient = require('jwks-rsa');

    var client = jwksClient({
        jwksUri: jwksDomain
    });

    function getKey(header: { kid: any; }, callback: (arg0: any, arg1: any) => void) {
        client.getSigningKey(header.kid, function (err: any, key: { publicKey: any; rsaPublicKey: any; }) {
            var signingKey = key.publicKey || key.rsaPublicKey;
            callback(null, signingKey);
        });
    }

    // aws cognito does not contain a "aud" claim with the client id,
    // That's why need to check the "client_id" claim in the callback.
    const options = {
        issuer: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`,
        algorithms: ['RS256']
    }

    jwt.verify(token,
        getKey,
        options,
        function (err: any, decoded: any) {
            console.log(decoded)
            console.log(err)

            // further checks
            if (decoded.token_use === 'access' && decoded.client_id === clientId) {
                console.log('success')
            }
            else {
                console.log('fail')
            }
        });

}



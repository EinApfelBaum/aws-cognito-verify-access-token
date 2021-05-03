 A small and simple project to verify an AWS cognito access token.
 
 1. Insert the user pool client id, who will make the request.
 2. Insert your user pool id.
 3. Insert region, where your user pool is configured
 4. Insert your access token
 5. `yarn build`
 6. `node .\dist\index.js`

 ## Documentation
  * https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
 * https://github.com/auth0/node-jsonwebtoken
 * https://github.com/auth0/node-jwks-rsa
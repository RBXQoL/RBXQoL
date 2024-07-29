# Install MDB jQuery Pro via NPM

1. Visit https://git.mdbootstrap.com and log in, if you are PRO user and do not have an account yet, please request one contacting us: contact@mdbootstrap.com

2. From top right corner click at your avatar and choose "Setting → Access Tokens"

3. Provide a Name for your token and choose "api" from scopes. Then click "Create personal access token"

![add token](https://mdbootstrap.com/img/React/add_token.png)

5. Once your token will be generated make sure to copy it and store in safe place. You won't be able to access it again. In case of lose, you will have to generate new token again.
token

![token](https://mdbootstrap.com/img/React/token.png)

Within existing project run:

`$ npm install git+https://oauth2:YOUR_TOKEN_GOES_HERE@git.mdbootstrap.com/mdb/jquery/jq-pro.git --save`

or 

`$ yarn add git+https://oauth2:YOUR_TOKEN_GOES_HERE@git.mdbootstrap.com/mdb/jquery/jq-pro.git`

The link structure: `"git+https://oauth2: + access_token + @ + repo address"`.

If you don't have existing npm project you should create it first (yarn init / npm init).

Alternatively, you can update your dependencies in package.json like below:

```
"dependencies": {
  "mdbootstrap": "git+https://oauth2:YOUR_TOKEN_GOES_HERE@git.mdbootstrap.com/mdb/jquery/jq-pro.git"
}
```

Then run `yarn` or `npm install` to install the dependencies
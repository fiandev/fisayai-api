# fisayAI
a rest API for making requests with questions that will be answered in a relevant and accurate manner.

## how to usage

### clone this repository

```shell

git clone https://github.com/fiandev/fisayai-api

cd fisayai-api

```

### install dependencies

```shell

# using npm
npm install

# using yarn
yarn install

```

### start project
```shell

# run typescript compiler
npm run build

# run typescript compiler with watch
npm run dev

# run the express.js server
npm run start

```

## API routes
- /:lang/search [GET]
  - return JSON file
- /:lang/raw/search [GET]
  - clone page result of google
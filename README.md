# fetchfollowers

## Install

```bash
yarn install
```

## Setup

Copy the `config.ts.example` into `config.ts` and supply your Twitter App token and the user id you want to get his/her/its followers:

```dosini
const token = "YOUR TOKEN GOES HERE";
const userId = USER_ID_IN_NUMERIC_FORM_GOES HERE;
const MAX_RESULTS = 1000;
```

## Usage

run `yarn run ts-node index.ts`
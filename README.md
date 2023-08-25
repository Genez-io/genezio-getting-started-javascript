# JavaScript - Getting Started

<div>

[![deployed with: genezio](https://img.shields.io/badge/deployed_with-genezio-6742c1.svg?labelColor=62C353&style=flat)](https://github.com/genez-io/genezio)

</div>

## You can check a [demo getting-started app here](https://chocolate-experimental-guppy.app.genez.io).

This is an example of a TODO application that introduces you to the genezio flow.

The application is built using:
 * `JavaScript` for the backend
 * `HTML/CSS` and `JavaScript` for the frontend
 * `MongoDB` for a database
 * `genezio` for deploying the project

## Deploy the project yourself

1. Run `git clone https://github.com/Genez-io/genezio-getting-started-javascript`.
2. Navigate to the folder `cd ./genezio-getting-started-javascript/server`.
3. Run `genezio deploy` to deploy both the backend and the frontend.

## Test the project locally

### Clone the repository

```bash
git clone https://github.com/Genez-io/genezio-getting-started-javascript
```

### Install dependencies

Run `npm install` in the `server/` folder to install the dependencies.

Run `npm install` in the `client/` folder to install the dependencies.

### Test the example locally

Run `genezio local` in the `server/` folder - this will start a local backend server that you can use to test the backend methods.
```bash
$ genezio local            
Server listening on port 8083
Your code was deployed and the SDK was successfully generated!
Test your code at https://app.genez.io/test-interface/local?port=8083
```

There are two ways of sending requests to the backend methods:
1. Using the genezio test interface available at [https://app.genez.io/test-interface/local?port=8083](https://app.genez.io/test-interface/local?port=8083).
2. Using the frontend code. Head to the `client` folder and `npm start`. The frontend will be able to call the backend methods using an auto-generated SDK.

## Deploy the backend in the Genezio infrastructure

1. Run `genezio deploy --backend` in the `server/` folder that contains also the `genezio.yaml` file. This will deploy your code in the Genezio infrastructure and it will also create an SDK that can be used to call the methods remotely.
2. Start the web app by going to the `client/` folder and run `npm start`.

## Deploy the frontend in Genezio Infrastructure
1. Run `npm i && npm run build` in the `client` folder to build the web app.
2. Run `genezio deploy --frontend` in the `server` folder to deploy the frontend in the Genezio infrastructure.


# Mentoringhub
## Place for the mentorship

# Architecture
- client: vue app
    - It is the web app to interact with mentoring hub
- backend: django and postgresql
    - It is the graphql api
- webrtc: node express app used for livekit sdk
    - It is use interact with livekit-server
- livekit.yaml:
    - It is used the config file of livkit-server
- Makefile:
    - It is used to easily run the program
```
livekit.yaml
      |
      |
livekit-server
      |
      |
    webrtc --- backend ------------ INTERNET ---------- client
```

# Start App
## Run Posgres
- Install postgres app [I am using docker for database]
```
docker run -dit \
      --name mentoringhubdb \
      -e POSTGRES_PASSWORD=postgres \
      -e POSTGRES_USER=postgres \
      -e PGDATA=/var/lib/postgresql/data/pgdata \
      -e POSTGRES_DB=mentoringhubdb \
      -v "$PWD/data":/var/lib/postgresql/data \
      -p 5432:5432 postgres
```
## Run Backend
- Be in root directory [MentoringHub]
- Install the poetry
```
$ cd backend
$ cp .env_sample .env
$ pip install poetry
$ poetry install
$ cd ..
$ make backend
```
## Run Livekit Server
- Be in root directory [MentoringHub]
- Pull the livekit server from docker
```
$ docker pull livekit/livekit-serve 
$ make livekit
```
## Run Webrtc
- Be in root directory [MentoringHub]
- Install the npm
```
$ cd webrtc
$ cp .env_sample .env
$ npm install
$ cd ..
$ make webrtc
```

## Run Client
- Be in root directory [MentoringHub]
- Install the npm
```
$ cd client
$ npm install
$ cd ..
$ make client
```

## Run the project in [Modern Way]
- Be in root directory [MentoringHub]
- Install docker and docker-compose in your system
```
$ docker-compose up
```
- To run in demonize mode
```
$ docker-compose up -d
```
- To stop container
```
$ docker-compose down
```

**Note**: You are free to run the docker individually instead of running it via docker-compose

### For ease I am using Makefile
- run client locally
```
$ make client
```
- to format vue files
```
$ make format
```
- run backend locally
```
$ make bakend
```
- run webrtc locally
```
$ make serve
```
- to start docker-compose
```
$ make up
```
- to start docker-compose in daemonize mode
```
$ make updaemon
```
- to stop docker-compose
```
$ make down
```

**Thank you!!!**

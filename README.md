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
- Be in root directory [FINALPROJECT]
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
- Be in root directory [FINALPROJECT]
- Pull the livekit server from docker
```
$ docker pull livekit/livekit-serve 
$ make livekit
```
## Run Webrtc
- Be in root directory [FINALPROJECT]
- Install the npm
```
$ cd webrtc
$ cp .env_sample .env
$ npm install
$ cd ..
$ make webrtc
```

## Run Client
- Be in root directory [FINALPROJECT]
- Install the npm
```
$ cd client
$ npm install
$ cd ..
$ make client
```
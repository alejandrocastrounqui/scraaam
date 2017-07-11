[![Build Status](https://api.travis-ci.org/alejandrocastrounqui/scraaam.svg?branch=dev)](https://travis-ci.org/alejandrocastrounqui/scraaam)

#Scraaam

#### Initialize mongodb

```
mongod --dbpath mongo_data
```

#### Initialize backend server

```
npm run backend
```

#### Initialize backend server (deploped mode)

```
npm run gulp serve:backend
```

#### Initialize frontend application and compile dinamycally

```
npm run frontend
```
#### Docker build application image

```
docker build
```

#### Docker compose build application context

```
docker-compose build
```

#### Docker compose deploy application context

```
docker-compose up
```

#### Docker build e2e image

```
docker build -f Dockerfile-e2e .
```

#### Docker compose build e2e context

```
docker-compose -f docker-compose-e2e.yml build
```

#### Docker compose deploy e2e context

```
docker-compose -f docker-compose-e2e.yml up
```

#### Docker compose deploy e2e context (travis-ci)

```
docker-compose -f docker-compose-e2e.yml up --build --abort-on-container-exit
```

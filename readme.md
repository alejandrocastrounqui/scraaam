#Noticias UNQ

### Initialize mongodb

```
mongod --dbpath mongo_data
```

### Initialize backend server

```
npm run gulp serve:backend
```

### Initialize frontend application and compile dinamycally

```
npm run frontend
```

### Docker deploy

```
docker-compose up
```

build e2e image

```
docker build -f Dockerfile-e2e .
```

# microsoft-computer-vision-api

Microsoft Azure Computer Vision APIを使用します

## How to run

### clone

```
$ git clone https://github.com/tenmakamatani/microsoft-computer-vision-api.git
$ cd microsoft-computer-vision-api
```

### Run local

```
$ cd node/workspace
$ yarn install (If you don't install yarn, 'npm install')
$ env API_KEY=YourAPIKey yarn start (or 'env API_KEY=YourAPIKey npm start')
```

### Run docker

```
$ mv .env.example .env (then rewrite .env API_KEY your API key)
```

#### start service

```
$ make start
```

and then

#### enter in container

```
$ make bash
```

#### just run program in container

```
$ make run
```

#### kill service

```
$ make kill
```

#### restart service

```
$ make restart
```

### Show docker logs

```
$ make logs
```
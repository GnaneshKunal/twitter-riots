# Twitter Hash Riot

## Configuration

create a `.env` file on client and server directories with the following twitter auth credentials.

```env
PORT=8081
CONSUMER_KEY=
CONSUMER_SECRET=
ACCESS_TOKEN=
ACCESS_TOKEN_SECRET=
```

## Running the server

```bash
# Running for the first time may involve downloading packages.
# `stanford-corenlp` package weighs 300+MB
sbt run Main
```

## Running the client

Running the client:
```bash
yarn install
yarn start
```

Images:

[[https://www.dropbox.com/s/mtu70uh57smhpth/1.png|alt=alt Initial page]]
![alt get trends](https://www.dropbox.com/s/xiw0z6c8bm3juve/2.png)
![alt server logs](https://www.dropbox.com/s/1t5bgcot30mewzt/3.png)
![alt analyze and plot](https://www.dropbox.com/s/enbunq95s9cnl9z/4.png)

## License

MIT License (MIT)
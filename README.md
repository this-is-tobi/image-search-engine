# Images search engine

People who worked on this project :

- Laurène BIDAUX
- Willyan LIN
- Alicia MINET
- Thibault COLIN

## Run the project

Clone this project :

```sh
git clone https://github.com/tobi-colin/image-search-engine.git
```

Install dependancies :

```sh
cd server && npm install \
  && cd ../client && npm install \
  && cd ..
```

Run the project inside Docker :

```sh
docker-compose up
```

Go to : [`http://localhost:8080`](`http://localhost:8080`)

## Project architecture

The whole project is running through Docker into 4 containers describe below, everything is setting up in the `docker-compose.yml` and `.env` files.

### Server

[Node.js](https://nodejs.org/en/) API running throught [Express](https://expressjs.com/) on `http://localhost:4000`.
The server hundles user's requests from the client, calls the database to retrieve some documents and make some processing on it before send back the result (example: parse images url to index them, sort images by score, etc...).
[Mongoose](https://mongoosejs.com/) is use as ODM in this project.

### Client

[Vue.js](https://v3.vuejs.org/) frontend including [vuex](https://next.vuex.vuejs.org/) as data store, [vue router](https://next.router.vuejs.org/) as pages navigation router and [tailwind](https://tailwindcss.com/) as css framework.
Requests to the server are serve with [axios](https://github.com/axios/axios).
The client is running on `http://locahost:8080`.

### Database

[Mongodb](https://www.mongodb.com/) database to store images and keywords data for both forward and inverted indexing.

### Data visualization UI

[Mongo-express](https://github.com/mongo-express/mongo-express) is use for data visualization UI, it is available on `http://localhost:8081`.

## Project features

- Index 100 images store in an array of urls available in `./server/src/util/image-urls.js`, the script automatically parse each urls and store them into the database. It also generate all keywords data for inverted indexing, these scripts are available in `./server/src/util/fn-util.js`.

- Get the entire list of images with preview and data for each of them.

- Search by keyword, multiple keywords and regex too.  

## Data

### MongoDB indexes

MongoDB use [WiredTiger](https://source.wiredtiger.com/) as storage engine.

More on WiredTiger in MongoDB :

- <https://docs.mongodb.com/manual/core/wiredtiger/>
- <https://www.mongodb.com/presentations/a-technical-introduction-to-wiredtiger>

More on WiredTiger performances :

- <https://github.com/wiredtiger/wiredtiger/wiki/Btree-vs-LSM#take-aways>

MongoDB implements [indexes](https://docs.mongodb.com/manual/indexes/) to limit the number of documents it must inspect on queries instead of scanning each document inside the collection.

More on Mongo B-tree :

- <https://zhangliyong.github.io/posts/2014/02/19/mongodb-index-internals.html>

### Complexity

Indexes use the [B-tree](https://en.wikipedia.org/wiki/B-tree) data structure which is a tree that can have more than 2 children, which allows to reduce the complexity to `O(log(n))`.

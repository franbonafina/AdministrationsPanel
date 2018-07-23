# MEAN

### Features
- ExpressJS
- Pagination (Powered by [express-paginate](https://github.com/expressjs/express-paginate))
- [helmet](https://github.com/helmetjs/helmet) ready (Middleware - Adds security headers)
- [compression](https://github.com/expressjs/compression) ready (Middleware)
- MongoDB & Mongoose
- Keycloak for user & role management
- Admin panel, powered by react-admin

## Get Started

#### Clone the repo

#### Get the service up and running

All the required services for the aplication to work are defined inside the `docker-compose.yml` file.

Then run `$ docker-compose pull`. This _pulls an image associated with a service defined in a docker-compose.yml or docker-stack.yml file, but does not start containers based on those images._ (Acording to docker docs)

You can check your docker images running `$ docker images`

```
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mysql               5.7                 66bc0f66b7af        6 days ago          372MB
mongo               3.6                 bbed8d0e01c1        6 days ago          368MB
jboss/keycloak      latest              b244ccfe3a8a        12 days ago         727MB
```

Now you can run the service containers by running `docker-compose up`.
To stop your service containers, run `$ docker-compose stop`

#### Download the npm dependencies

#### Set up Keycloak 

Now we will connect to the Keycloak Admin CLI. 
```
docker exec core_keycloak_1 keycloak/bin/kcadm.sh config credentials --server http://localhost:8080/auth --realm master --user admin --password Pa55w0rd
```
You should get just one logged message: `Logging into http://localhost:8080/auth as user admin of realm master`. Now you are authenticated and you can use `kcadm` as the admin.

Now we have to create the realms for test enviroment and dev enviroment

## Useful scripts

#### Launch admin panel in development env
Starts a react server for the react-admin client, with hot-reload included
```
npm run admin:dev
```

#### Builds the admin client
This will be the build that will be served by the server on `/admin`
```
npm run admin:build
```

#### Build the API Docs
This will be the build that will be served by the server on `/docs`
```
npm run docs:build
```

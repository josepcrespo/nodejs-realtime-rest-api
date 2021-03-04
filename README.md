Live app on [Heroku](https://heroku.com/) 🕺

[https://nodejs-realtime-rest-api.herokuapp.com](https://nodejs-realtime-rest-api.herokuapp.com)

![Arquitecture diagram](readme_images/fictional-motor-diagram-flow.png)

Table of contents:

- [A realtime Node.js based REST API](#a-realtime-nodejs-based-rest-api)
	* [Disclaimer](#disclaimer)
	* [Project introduction](#project-introduction)
		+ [Mandatory implementation requirements](#mandatory-implementation-requirements)
		+ [Optional implementation requirements](#optional-implementation-requirements)
		+ [Proposed solution](#proposed-solution)
	* [Quick start guide](#quick-start-guide)
	* [Project installation](#project-installation)
		+ [Local](#local)
		+ [Docker](#docker)
	* [Run the project](#run-the-project)
		+ [Run locally](#run-locally)
		+ [Run on Docker](#run-on-docker)
	* [Seed the database](#seed-the-database)
	* [GitHub OAuth login](#github-oauth-login)
	* [REST API documentation](#rest-api-documentation)
		+ [Pre-configured users](#pre-configured-users)
		+ [Feathers CRUD](#feathers-crud)
		+ [Swagger UI docs](#swagger-ui-docs)
		+ [Run with Postman API Client](#run-with-postman-api-client)
	* [Tests](#tests)
		+ [Running tests locally](#running-tests-locally)
		+ [Running tests on Docker](#running-tests-on-docker)
		+ [Coverage report in plain text format](#coverage-report-in-plain-text-format)
		+ [Publishing new HTML coverage reports](#publishing-new-HTML-coverage-reports)
	* [Bibliography](#bibliography)
		+ [Feathers](#feathers)
		+ [Sequelize](#sequelize)
		+ [Swagger](#swagger)
		+ [Docker](#docker)

----------

# A realtime Node.js based REST API

A REST API to manage the sales of "Fictional Motor Co", a global automobiles manufacturer and seller. They require a scalable REST API with the possibility of consuming part of the data in realtime. Of course, all of this with the corresponding security and, CRUD functionality.

## Disclaimer

This is a demo project to provide an example of my skills for building a [REST compliant API](https://en.wikipedia.org/wiki/Representational_state_transfer), with the addition of a layer for real-time (thanks to [WebSockets](https://en.wikipedia.org/wiki/WebSocket)). This time, I’ve decided to use [Feathers](https://feathersjs.com/), a [Node.js](https://nodejs.org/) framework oriented for building real-time applications and REST APIs. I've made an extensive use of the latest version of [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) on the backend and, used a few cool features of [Vue.js](https://vuejs.org/) on the frontend. Other modern development tools used are: [NPM](https://www.npmjs.com/) (the Node.js package manager), [Sequelize](https://sequelize.org/) (a promise-based Node.js ORM for relational databases), [MySQL](https://www.mysql.com/) server (for data storage), [Docker](https://www.docker.com/) (helps to create the necessary environment for developing or running the application) and, the [Swagger](https://swagger.io/) toolset (for exploring and interacting with the API). And, of course, I’ve used [Git](https://git-scm.com/) for code control version and, a basic knowledge of the [Unix Shell](https://en.wikipedia.org/wiki/Unix_shell) for interacting with the respective [CLI (command-line interface)](https://en.wikipedia.org/wiki/Command-line_interface) for Git, Docker and, Feathers. The full project has been developed on [macOS](https://www.apple.com/es/macos/what-is/) [Catalina](https://en.wikipedia.org/wiki/MacOS_Catalina) (v10.15.6) on top of a [MacBook Air mid 2012](https://support.apple.com/kb/SP670?viewlocale=en_US&locale=es_ES).

You can use this project for your needs under your total responsibility. You can, for example, fork it and, use it as a foundation for your own project if you found it useful.

## Project introduction

Fictional Motor Co manufactures and sells automobiles globally, with new vehicles sold through regional sales offices.

Global headquarters requires each of the regional offices to submit information on vehicle sales, and this is expected to be near real-time (within 30 seconds of a complete sale). This enables headquarters to effectively manage the manufacturing portion of the business.

Sales data is stored in a central location within the headquarters infrastructure, some transformation is applied to the input data. Manufacturing facilities use the data to increase and decrease production, including the procurement of necessary parts. In addition, the data is used for aggregate reporting purposes.

Different vehicle models are produced in different areas of the world, with some of the vehicle parts built in locally owned facilities, while others come from external, local and overseas producers.

Each production facility has different supply chains and lead times, and as such everyone needs to access information about new vehicles as often as is best for them.

All manufacturing plants poll the data regarding new sales, some poll every minute and some once a day. The amount of data extracted can be enormous.

### Mandatory implementation requirements

- Produce an API specification that will allow regional sales offices to send sales information to headquarters.
- Produce an API specification that will be used by manufacturing facilities to extract information on new car sales from headquarters.
- Produce an architecture diagram of the solution, include the APIs and the persistence layer. Suppose we will use a cloud-based provider.
- Produce some simple prototypes.
- Safety is essential.
- If the details are not detailed, you are expected to make valid assumptions about what they would be. i.e data payloads, acceptable security, etc.

### Optional implementation requirements

- Produce some tests or a test installation. (think PostMan or an automated testing suite/tool).

### Proposed solution

As I said before, Feathers is the core framework for the project. I’ve decided to use it after a small research about the state of the art of current Node.js frameworks. Feathers is a lightweight web-framework for creating real-time applications and REST APIs using [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) or [TypeScript](https://www.typescriptlang.org/).

Feathers can interact with any backend technology, supports over a dozen databases and works with any frontend technology like [React](https://en.reactjs.org/), [VueJS](https://vuejs.org/), [Angular](https://angular.io/), [React Native](https://reactnative.dev/), [Android](https://www.android.com/) or [iOS](https://www.apple.com/es/ios/). In this project, the interface with the database is done thanks to [Sequelize](https://sequelize.org/) (a promise-based [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) for Node.js, that works with [Postgres](https://www.postgresql.org/), [MySQL](https://mysql.com/), [SQLite](https://www.sqlite.org/) and, [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server)). Sequelize also provides an effortless data validation and, much more. Feathers also can integrate with [Express](https://expressjs.com/) (a solid foundation currently used by almost any existing Node.js framework), something I decided to do, because it provides [better JSON error responses](https://docs.feathersjs.com/api/express.html#expresserrorhandler).

Sequelize has choosen as the ORM for the application, because it allows to define the models schemas and, validate the fields. It provides model level validations and, will return the validation errors to the client in a nice consistent format.

Feathers provides instant [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) functionality via [Services](https://docs.feathersjs.com/api/services.html), exposing both a RESTful API and real-time backend through [websockets](https://www.html5rocks.com/en/tutorials/websockets/basics/) automatically.

And, to finish, it also provides easy integration with more than 180 [OAuth](https://oauth.net/) providers. In this case, the project uses [GitHub](https://github.com/) as a third party OAuth provider.

So, my work was: first to known all this tools and technologies, understand how they work reading technical docs and finally, build it all together to provide the required functionality.

Also, it’s worth to mention that I’ve followed the security considerations detailed on the official [Feathers Guides](https://docs.feathersjs.com/guides/). In particular, there is [a full section about security](https://docs.feathersjs.com/guides/security.html). The following points of the security section are the relevant ones for this project:

- Using [hooks](https://docs.feathersjs.com/api/hooks.html) to check security roles to make sure users can only access data they should be permitted to.
- Escape any [SQL](https://en.wikipedia.org/wiki/SQL) (typically done by the SQL library) to avoid [SQL injection](https://en.wikipedia.org/wiki/SQL_injection). A major benefit for using an ORM, like Sequelize in this project, is that they make use of prepared statements, which is a technique to escape input in order to prevent SQL injection vulnerabilities. In June 2019, [Snyk](https://snyk.io/) (a company focused on security tools for developers) discovered [attack vectors that could lead to SQL injection](https://snyk.io/blog/sequelize-orm-npm-library-found-vulnerable-to-sql-injection-attacks/). The Sequelize maintainers promptly released fixes for the affected versions.
- [JSON Web Tokens (JWT’s)](https://jwt.io) are only signed. They are not encrypted. Therefore, the payload can be examined on the client. This is by design. DO NOT put anything that should be private in the JWT payload unless you encrypt it first.
- Don't use a weak secret for you token service. The generator creates a strong one for you automatically. No need to change it.
- Password storage inside `@feathersjs/authentication-local uses [bcrypt](https://en.wikipedia.org/wiki/Bcrypt). We don't store the salts separately since they are included in the bcrypt hashes.
- By default, JWT's are stored in [Local Storage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage) (instead of [cookies](https://en.wikipedia.org/wiki/HTTP_cookie) to avoid [CSRF attacks](https://en.wikipedia.org/wiki/Cross-site_request_forgery). For JWT, we use the HS256 algorithm by default (HMAC using SHA-256 hash algorithm). If you choose to store JWT's in cookies, your app may have CSRF vulnerabilities.

## Quick start guide

You need [Git](https://git-scm.com) >= `v2.24.3` and, [Docker Engine](https://docker.com/) >= `v18.06.0`.

```bash
$ git clone https://github.com/josepcrespo/nodejs-realtime-rest-api.git &&
  cd nodejs-realtime-rest-api &&
  docker-compose build --no-cache --force-rm &&
  docker-compose up
```

The project runs on [http://localhost:3030/](http://localhost:3030/).

You can also check [a live version running on Heroku](https://nodejs-realtime-rest-api.herokuapp.com/). You can not run the tests, because is a production deployment. Anyway, you can check the current tests coverage at [https://nodejs-realtime-rest-api.herokuapp.com/tests-coverage/](https://nodejs-realtime-rest-api.herokuapp.com/tests-coverage/) and, do everything else including the access to view the realtime status page for the manufacturing facilities.

## Project installation

The recommended way of installing the project is using the Docker approach. Anyway, you have the option to install it all locally.

### Local

**Requirements**

- [Git](https://git-scm.com) >= `v2.24.3`. If your are a developer, you probably have Git already installed. If not, visit the [official downloads](https://git-scm.com/downloads) page as it provides appropriate instructions for different operating systems.

- [Node.js](https://nodejs.org/) >= `v10.0.0`. Feathers docs recommends to use the latest available version. The docs also recommend the use of [Node Version Manager](https://github.com/nvm-sh/nvm) (on macOS or other [Unix](https://en.wikipedia.org/wiki/Unix) based operating systems). Other methods for installing Node.js are:

<span style="color: transparent">⇢⇢⇢</span>⇢ Using the installer available on the [official downloads page](https://nodejs.org/en/downloads).

<span style="color: transparent">⇢⇢⇢</span>⇢ If you develop with macOS, you can use the [Homebrew](https://brew.sh/) package manager:

```bash
$ brew install node
```
<span style="color: transparent">⇢⇢⇢</span>⇢ If you develop with a Debian based operating system, the easiest way to install Node is using the [Advanced Packaging Tool](https://en.wikipedia.org/wiki/Advanced_Packaging_Tool) (a.k.a. APT). You need to install the node core and the package manager separately:

```bash
$ sudo apt install nodejs
```

```bash
$ sudo apt install npm
```

> :v: After a successful installation, the `node` (`nodejs` if using a Debian flavored Linux distro) and `npm` commands should be available on the terminal and show something similar when running the following commands:

```bash
$ node --version
v14.0.0
```
```bash
$ npm --version
v6.14.8
```

- A MySQL compatible server (the project has been developed with MySQL, probably it works with MariaDB, but this scenario has not been tested). This project has been developed using the version `5.7`. Versions greater than `5.7` have major changes on the authentication method used for connecting with the server that causes unnecessary headaches. For installing a MySQL server you have multiple options:

<span style="color: transparent">⇢⇢⇢</span>⇢ Manually downloading and installing the appropriate installer (you should choose the product version and, the operating system) from the [official downloads page](https://downloads.mysql.com/archives/community/).

<span style="color: transparent">⇢⇢⇢</span>⇢ Using an all-in-one package that provides you a MySQL server like: [XAMPP](https://www.apachefriends.org/), [WAMP](https://www.wampserver.com/) or, [MAMP](https://www.mamp.info/en/mac/).

<span style="color: transparent">⇢⇢⇢</span>⇢ If you develop with macOS, you can use the [Homebrew](https://brew.sh/) package manager:

```bash
$ brew install mysql@5.7
```

<span style="color: transparent">⇢⇢⇢</span>⇢ If you develop with a Debian based operating system, the easiest way to install a MySQL server is using APT:

```bash
$ sudo apt install mysql-server=5.7.29-0ubuntu0.18.04.1
```

When the installation is done, take note of your MySQL server connection parameters, you need to know:

- A database user with permissions.
- The database user password.
- The IP address or domain name of the server.
- The port number where the service is exposed.
- A database named `fictional_motor_company`.

When you have this parameters at hand, you need to edit the `/config/default.json` file. Find the following line on the file:

```json
"mysql": "mysql://root:secret@mysql_server:3306/fictional_motor_company"
```

and, change it accordingly to your local MySQL server connection parameters. The template is:

```json
"mysql": "mysql://<user>:<password>@<ip_address>:<port_number>/<database_name>"
```

**Installation**

Open a shell and navigate where you want to install the project. Then run:

```bash
$ git clone https://github.com/josepcrespo/nodejs-realtime-rest-api.git
```

Enter into the project root directory and install the dependencies:

```bash
$ npm install
```

### Docker

> :warning: Make sure you are not currently running any other service on your host that can interfere with the Docker services, for instance, a MySQL server or, a web server like NGINX or Apache. Since, the domain names and/or ports used could coincide and ruin the proper functioning of the application.

> :warning: The data does not persist between `docker-compose down` and, `docker-compose up` command executions.

**Requirements**

- [Git](https://git-scm.com) >= `v2.24.3`. If your are a developer, you probably have Git already installed. If not, visit the [official downloads](https://git-scm.com/downloads) page as it provides appropriate instructions for different operating systems.

- [Docker Engine](https://docker.com/) >= `v18.06.0`. Just visit the [official Docker Desktop page](https://www.docker.com/products/docker-desktop) and, download the appropriate version for your operating system.

**Installation**

Open a shell and navigate where you want to install the project. Then run:

```bash
$ git clone https://github.com/josepcrespo/nodejs-realtime-rest-api.git
```

Make sure Docker is running on your machine. Enter into the project root directory and run the following command for downloading the necessary _Docker images_ and, building the _Docker containers_:

```bash
$ docker-compose build --no-cache --force-rm
```

> :warning: The process of downloading and, building can take a while depending on your internet connection download capacity and, the power of your development machine.

You don't need to worry about any dependencies because the project setup for Docker, installs everything you need to run the project.

**Useful commands**

If you changed something in the `/docker-compose.yml` or something from inside the `/dockerfiles` directory, you need to re-build the containers first. Run the following command on the root directory of the project:

```bash
$ docker-copose up --build
```

If you want to stop the containers running the project, run this command on the root directory of the project:

```bash
$ docker-compose down
```

## Run the project

The API will be exposed at [http://localhost:3030/](http://localhost:3030/) after executing anyone of the following commands.

### Run locally

- **Development server**

Navigate to the project root directory and run:

```bash
$ npm run dev
```

You need to keep this shell open and, you can see if any log appears during the execution of the application.

- **Production mode**

Navigate to the project root directory and run:

```bash
$ npm run start
```

### Run on Docker

- **Development server**

By default, the project runs in development mode when using Docker. Just navigate to the project root directory and run:

```bash
$ docker-compose up
```

You need to keep this shell open and, you can see if any log appears during the execution of the application.

- **Production mode**

You need to change the `Dockerfile` located at `/dockerfiles/node_runtime/Dockerfile`. Open it an chage this line:

```
CMD ["npm", "run", "dev"]
```
with this one:

```
CMD ["npm", "run", "start"]
```

and, finally:

```bash
$ docker-compose up -d --build
```

Using the `-d` option, the server runs in background.

## Seed the database

The project comes with only two users registered into the database (one with “admin” permissions and, the other one with basic “user” permissions). If you want to seed the database with dummy data, it can be easily done running the tests against the database used by the application.

Use the `mysql` connection string from `/config/default.json` on `/config/test.json` and then, run the tests.

## GitHub Oauth login

Feathers provides "[Login with GitHub](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)" functionality using OAuth 2.0, out of the box without much effort.

OAuth is an open authentication standard supported by almost every major platform. It is what is being used by the login with Facebook, Google, GitHub and, all this kind of buttons in a web application. From the Feathers perspective the authentication flow is pretty similar. Instead of authenticating with the local strategy by sending a username and password, we direct the user to authorize the application with the login provider. If it is successful we find or create the user on the users service with the information we got back from the provider and issue a token for them.

After a successful login the third party provider (GitHub in our case), will redirect back the user to our application with a valid JWT or, an error message in other case.

In order to log in with GitHub, visit [http://localhost:3030/oauth/github](http://localhost:3030/oauth/github). You will be redirected to GitHub and asked to authorize the authentication into our application, using your GitHub account. If everything went well, you will see a JWT, valid for 24 hours, that you can use for making requests to the API endpoints that require authentication. Keep in mind that all users are created with "salesman" role permissions as default (this role only can create new sales with the `/sales` service).

Login with GitHub example:

![GitHub Oauth login](readme_images/github-oauth-login-motorsco.gif)

Performing a `curl` request using the returned JWT after login with GitHub:

![curl request using a JWT](readme_images/curl-request-with-jwt-motorsco.gif)


> :exclamation: You need to enter [github.com](https://github.com/) and, logout from your session if you want to test the full "Login with GitHub" flow again. Or, you can just visit [http://localhost:3030/oauth/github](http://localhost:3030/oauth/github) all the times you want to obtain a new valid JWT, GitHub will not ask for authorization since you already granted before.

> :exclamation: The authentication client will not use the token from the OAuth login if there is already another token logged in.

## REST API documentation

### Pre-configured users

The project comes with three users already registered so you can easily start to test the API. First user comes with “admin” privileges (this user role can perform any operation with the API). Second user, only have “salesman” privileges (this user role only allows to create new sales with the `/sales` service). And, the third, only have “manufacturer” privileges (this user role only allows to get and find sales with the `/sales` service).

**Admin user:**

```json
{
	"email": "admin@fictionalMotor.com",
	"password": "asdf1234",
	"permissions": "admin"
}
```

**Salesman user:**

```json
{
	"email": "salesman1@fictionalMotor.com",
	"password": "asdf1234",
	"permissions": "salesman"
}
```

**Manufacturer user:**

```json
{
	"email": "manufacturer1@fictionalMotor.com",
	"password": "asdf1234",
	"permissions": "manufacturer"
}
```

If you want to login with a user, you need to set the `strategy` property to `local` and, of course, provide valid credentials. Below is an example of a `body` that should be sent using the `POST` method to the `/authorization` API endpoint:


```json
{
	"strategy": "local",
	"email": "admin@fictionalMotor.com",
	"password": "asdf1234"
}
```

and, here you have an example using `curl` command:

```bash
curl -X POST "http://localhost:3030/authentication" -H  "accept: application/json" -H  "Content-Type: application/json" -d "{\"strategy\":\"local\",\"email\":\"salesman1@fictionalMotor.com\",\"password\":\"asdf1234\"}"
```

![Authenticating with local strategy using curl](readme_images/curl-authentication-motorco.gif)

### Feathers CRUD

Feathers service methods that provide CRUD functionality are:

- `find`: Find all data (potentially matching a query).
- `get`: Get a single data entry by its unique identifier.
- `create`: Create new data.
- `update`: Update an existing data entry by completely replacing it.
- `patch`: Update one or more data entries by merging with the new data.
- `remove`: Remove one or more existing data entries.

When used as a REST API, incoming requests get mapped automatically to their corresponding service method like this:

| Service method                              		| HTTP method | Path                  	 |
|:---                                         		|:---         |:---                   	 |
| service.find({ query: {} })						| GET         | /users                	 |
| service.find({ query: { permissions: 'admin' } }) | GET         | /users?permissions=admin |
| service.get(1)                              		| GET         | /users/1              	 |
| service.create(body)                        		| POST        | /users                	 |
| service.update(1, body)                     		| PUT         | /users/1              	 |
| service.patch(1, body)                      		| PATCH       | /users/1              	 |
| service.remove(1)                           		| DELETE      | /users/1              	 |

### Swagger UI docs

![Swagger UI docs](readme_images/swagger-ui-docs-motorco.gif)

The project comes with a full Swagger UI setup so, you can play with the API directly on the docs page. All Feathers services exposed by the API have their own documentation for each method, examples, live execution of queries and, their respective responses.

Swagger UI allows anyone — be it your development team or your end consumers — to visualize and interact with the API’s resources without having any of the implementation logic in place. It’s automatically generated from our OpenAPI (formerly known as Swagger) Specification, with the visual documentation making it easy for back end implementation and client side consumption.

You can visit [http://localhost:3030/docs/swagger-ui.html](http://localhost:3030/docs/swagger-ui.html) to see it in action and, perform almost any operation available on the API or, just explore it. Just keep in mind that all endpoinds require authentication, so you need to provide your credentials using the “Authorize” button placed on the top right of the page.

Here you have an example of authenticating with local strategy and, retrieving a users list using Swagger UI:

![Get a users list with Swagger UI](readme_images/swagger-ui-example-motorco.gif)

> :warning: **You need a local client for consuming APIs**, such as _Postman API Client_ or _Insmonia Core_ **for using the JWT provided by GitHub Oauth to authenticate API requests**.

### Run with Postman API Client

Click on the button below for importing a _Postman Collection_ into your Postman API Client. The _Collection_ is built with all the API endpoints so you can test everything the API exposes with this great tool.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/e56119fa89f5107a2588)

The collection is called `Fictional Motor Co REST API`.

> :eyes: Remember to set a valid JWT on the _Authorization_ tab of a Postman request (if the request requires authentication) using the _Bearer token_ option.

## Tests

The project comes full of tests (not 100%, but close). Tests are done using the [Mocha framework](https://mochajs.org/) and the [Node.js native Assert module](https://nodejs.org/api/assert.html). After running tests, [Istanbul](https://istanbul.js.org/) creates a comprehensive report of the test coverage, directly in the console and as an [HTML page](http://localhost:3030/tests-coverage/).

![Istanbul coverage reports in HTML format](readme_images/istanbul-coverage-reports-motorco.png)

There is no tests for CRUD operations because all this functionallity is already tested by the Feathers framework internally. Only a few edge cases are tested, for example, when a request interacts somehow with a custom Feathers Hook.

### Running tests locally

Open the `/config/test.json` file. Find the following line on the file:

```json
"mysql": "mysql://root:secret@mysql_server:3306/fictional_motor_company_tests"
```

and, change it accordingly to your local MySQL server connection parameters. The template is:

```json
"mysql": "mysql://<user>:<password>@<ip_address>:<port_number>/<database_name>"
```

Move into your project’s root directory and run:

```bash
$ npm run test
```

### Running tests on Docker

> :warning: Remember to stop any services you may have running locally on your host machine to avoid unexpected behaviors and interferences with the Docker containers configurations.

Move into your project’s root directory.

Start the project's Docker containers if not running yet:

```bash
$ docker-compose up
```

and, then:

```bash
$ docker exec -it nodejs-realtime-rest-api_node_server_1 npm run test
```

### Coverage report in plain text format

After running the tests, you can see a coverage report, in plain text format, thanks to Istanbul. Here you can see the full output after running the tests, all passing fine:

```bash
  Feathers application tests
    ✓ starts and shows the index page (95ms)
    GitHub OAuth login
      ✓ The GitHub OAuth login page loads (871ms)
    404 HTML status code responses
info: Page not found {"type":"FeathersError","name":"NotFound","code":404,"className":"not-found","data":{"url":"/path/to/nowhere"},"errors":{}}
      ✓ shows a 404 HTML page
info: Page not found {"type":"FeathersError","name":"NotFound","code":404,"className":"not-found","data":{"url":"/path/to/nowhere"},"errors":{}}
      ✓ shows a 404 JSON error without stack trace

  authentication
    ✓ registered the `authentication` service
    local strategy
      ✓ authenticates user and creates accessToken (166ms)

  sales hook: create.process
    ✓ creates a `sale` and attaches the ID of the `user` who created him (160ms)

  sales hook: create.validate
    ✓ Throws a BadRequest when tries to create a `sale` without `model`, `engine`, `doors`, `color`, `extras`. (159ms)
    ✓ Throws a BadRequest when tries to create a `sale` without `model`. (149ms)
    ✓ Throws a BadRequest when tries to create a `sale` without `engine`. (152ms)
    ✓ Throws a BadRequest when tries to create a `sale` without `doors`. (141ms)
    ✓ Throws a BadRequest when tries to create a `sale` without `color`. (144ms)
    ✓ Throws a BadRequest when tries to create a `sale` without `extras`. (157ms)

  sales hook: patch.process
    ✓ updates a `sale` and attaches the ID of the `user` who updated him (180ms)

  sales hook: patch.validate
    ✓ Throws a BadRequest when tries to update a `sale` with an empty `model` (154ms)
    ✓ Throws a BadRequest when tries to update a `sale` with an empty `engine` (170ms)
    ✓ Throws a BadRequest when tries to update a `sale` with an empty `doors` (161ms)
    ✓ Throws a BadRequest when tries to update a `sale` with an empty `color` (156ms)
    ✓ Throws a BadRequest when tries to update a `sale` with an empty `extras` (146ms)

  users hook: create.validate
    ✓ Throws a BadRequest when tries to create a `user` without `githubId` and, `email`
    ✓ Throws a BadRequest when tries to create a `user` without `githubId` and, `password`
    ✓ Throws a BadRequest when tries to create a `user` without `githubId, `email` and, `password`.

  users hook: get.validate
    ✓ A `user` without `admin` permissions can not get details from another user (403ms)

  users hook: patch.validate
    ✓ Patches a `user` (375ms)
    ✓ A `user` with `admin` permisions can PATCH other `user` (320ms)
    ✓ A `user` with `user` permisions can not PATCH other `user` (282ms)
    ✓ Throws a BadRequest when tries to update a `user` with an empty `email` (144ms)
    ✓ Throws a BadRequest when tries to update a `user` with an empty `password` (146ms)
    ✓ Throws a BadRequest when tries to update a `user` with an empty `githubId` (137ms)
    ✓ Throws a BadRequest when tries to update a `user` with an empty `permissions` (141ms)

  users hook: remove.validate
    ✓ A `user` with `admin` permissions can delete other `user` (287ms)
    ✓ A `user` can not delete himself (149ms)

  sales
    ✓ registered the `sales` service
    ✓ creates a `sale` (151ms)

  users
    ✓ registered the `users` service
    ✓ creates a `user` and, encrypts his `password` (138ms)
    ✓ removes `password` for external requests (257ms)
    ✓ creates a `user` with default permissions (154ms)


  38 passing (7s)

-------------------------------|---------|----------|---------|---------|-------------------
File                           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------------|---------|----------|---------|---------|-------------------
All files                      |   93.68 |    89.01 |    82.5 |   93.68 |
 src                           |    87.5 |    33.33 |      60 |    87.5 |
  app.hooks.js                 |     100 |      100 |     100 |     100 |
  app.js                       |     100 |      100 |     100 |     100 |
  authentication.js            |   84.62 |      100 |      50 |   84.62 | 7-9
  channels.js                  |      25 |       25 |      25 |      25 | 7-47
  logger.js                    |     100 |      100 |     100 |     100 |
  sequelize-to-json-schemas.js |     100 |      100 |     100 |     100 |
  sequelize.js                 |     100 |       50 |     100 |     100 | 22
 src/hooks/sales               |     100 |      100 |     100 |     100 |
  sales.create.process.js      |     100 |      100 |     100 |     100 |
  sales.create.validate.js     |     100 |      100 |     100 |     100 |
  sales.patch.process.js       |     100 |      100 |     100 |     100 |
  sales.patch.validate.js      |     100 |      100 |     100 |     100 |
 src/hooks/users               |     100 |     92.5 |     100 |     100 |
  users.create.validate.js     |     100 |    90.91 |     100 |     100 | 11
  users.get.validate.js        |     100 |    85.71 |     100 |     100 | 15
  users.patch.validate.js      |     100 |    94.74 |     100 |     100 | 12
  users.remove.validate.js     |     100 |      100 |     100 |     100 |
 src/middleware                |     100 |      100 |     100 |     100 |
  index.js                     |     100 |      100 |     100 |     100 |
 src/models                    |   95.45 |      100 |   83.33 |   95.45 |
  sales.model.js               |   90.91 |      100 |   66.67 |   90.91 | 87
  users.model.js               |     100 |      100 |     100 |     100 |
 src/services                  |     100 |      100 |     100 |     100 |
  index.js                     |     100 |      100 |     100 |     100 |
 src/services/sales            |     100 |      100 |     100 |     100 |
  sales.class.js               |     100 |      100 |     100 |     100 |
  sales.hooks.js               |     100 |      100 |     100 |     100 |
  sales.service.js             |     100 |      100 |     100 |     100 |
 src/services/users            |   87.18 |       25 |      50 |   87.18 |
  users.class.js               |     100 |      100 |     100 |     100 |
  users.hooks.js               |     100 |      100 |     100 |     100 |
  users.service.js             |   80.77 |       25 |   33.33 |   80.77 | 42-47
-------------------------------|---------|----------|---------|---------|-------------------
```

### Publishing new HTML coverage reports

The project already comes with coverage reports in HTML format. Only run this command if you changed something in your tests and wants to publish the new reports. Coverage reports in HTML format can be re-published to the `/public/tests-coverage/` directory, following this steps:

First move to your project’s root directory.

For running **locally**:

```bash
$ npm run publish-coverage
```

or, alternatively using **Docker**, start the project's Docker containers if not running yet:

```bash
$ docker-compose up
```

and, then:

```bash
$ docker exec -it nodejs-realtime-rest-api_node_server_1 npm run publish-coverage
```

You can view the output here [http://localhost:3030/tests-coverage/](http://localhost:3030/tests-coverage/).

## Bibliography

### Feathers

- [Getting started with Feathers](https://docs.feathersjs.com/guides/basics/setup.html)
	- [Quick start](https://docs.feathersjs.com/guides/basics/starting.html)
	- [Generating an app](https://docs.feathersjs.com/guides/basics/generator.html)
	- [Services](https://docs.feathersjs.com/guides/basics/services.html)
	- [Hooks](https://docs.feathersjs.com/guides/basics/hooks.html)
	- [Authentication with local strategy](https://docs.feathersjs.com/guides/basics/authentication.html#authentication)
	- [Authentication with a third party public OAuth provider](https://docs.feathersjs.com/guides/basics/authentication.html#github-login-oauth)
	- [Writing tests](https://docs.feathersjs.com/guides/basics/testing.html)
- [Feathers API documentation](https://docs.feathersjs.com/api/)
- [Feathers cookbook](https://docs.feathersjs.com/cookbook/)
- [Why Feathers uses JWT for sessions](https://docs.feathersjs.com/help/faq.html#why-are-you-using-jwt-for-sessions)
- [Better JSON errors with Feathers](https://docs.feathersjs.com/help/faq.html#why-am-i-not-getting-json-errors)
- [Role and permissions with Feathers](https://github.com/feathersjs-ecosystem/feathers-permissions)
- [Validation with Feathers](https://docs.feathersjs.com/help/faq.html#how-do-i-do-validation)
- [HTTP vs Websockets: A performance comparison](https://blog.feathersjs.com/http-vs-websockets-a-performance-comparison-da2533f13a77)

### Sequelize

- [Sequelize documentation](https://sequelize.org/master)
- [Sequelize association hooks in Feathers](https://medium.com/@mohammedalrowad/feathersjs-association-hooks-with-sequelize-1825356b1843)

### Swagger

- [Swagger UI](https://swagger.io/docs/open-source-tools/swagger-ui/)
- [Feathers-swagger GitHub repository](https://github.com/feathersjs-ecosystem/feathers-swagger)
	- [Swagger UI example](https://github.com/feathersjs-ecosystem/feathers-swagger#example-with-ui)
	- [OpenAPI v3 example (the HTML)](https://github.com/feathersjs-ecosystem/feathers-swagger/blob/master/example/openapi-v3/security.html)
	- [OpenAPI v3 example (the javascript)](https://github.com/feathersjs-ecosystem/feathers-swagger/blob/master/example/openapi-v3/security.js)
- [Swagger UI authentication form plugin](https://www.npmjs.com/package/@mairu/swagger-ui-apikey-auth-form)

### Docker

- [Dockerize a Feathers appliation](https://docs.feathersjs.com/cookbook/deploy/docker.html)
- [Dockerize a Node.js application with MySQL (and dump)](https://jboka.de/2018/10/09/dockerize-node-application-with-mysql.html)
- [Dockerizing a Node.js Web Application](https://semaphoreci.com/community/tutorials/dockerizing-a-node-js-web-application)
- [How to crate a MySQL Instance with Docker Compose](https://medium.com/@chrischuck35/how-to-create-a-mysql-instance-with-docker-compose-1598f3cc1bee)
- [Docker Compose healthcheck](https://docs.docker.com/compose/compose-file/#healthcheck)
- [Docker Compose wait for container X before starting container Y](https://stackoverflow.com/questions/31746182/docker-compose-wait-for-container-x-before-starting-y/41854997#41854997)
- [How to use Docker Volumes to code faster](https://dzone.com/articles/tutorial-how-to-use-docker-volumes-to-code-faster)

### Others

- [Introduction to JSON Web Tokens](https://jwt.io/introduction/)


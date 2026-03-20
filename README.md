# Shorten URL

This is a sample project to demonstrate how to create a README file.

## Installation

To install the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/PhamManh2911/shorten-url.git
```

2. Navigate to the project directory:

```bash
cd shorten-url
```

3. Install the dependencies:

```bash
yarn
```

## Setup application

Setup the environment variables by creating a `.env` file in the root directory of the project and adding the necessary variables. For example:

```
APP_PORT=3000
APP_MONGO_DB_CONNECTION_STRING=mongodb://root:example@127.0.0.1:27017
APP_KAFKA_BROKERS=localhost:9092
```

Setup mongodb and kafka containers using docker-compose:

```bash
docker-compose up -d
```

To run the project, use the following command:

```bash
yarn start:dev
```

This will start the application and you can access it at `http://localhost:3000`.

## Testing

Create an shorten URL:

```bash
make create
```

Load test

```bash
./load-test.sh
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

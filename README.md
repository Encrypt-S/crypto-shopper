## Nav Shopper

### Dependencies

node -v 9.7.0
npm -v 6.5.0

### Localhost Development Setup

#### Backend
Install the npm libraries
```
cd back-express
npm install
```
Create the keys that will be used for the SSL connection
```
mkdir keys
cd keys
openssl genrsa -des3 -out server.key 1024   
openssl req -new -key server.key -out server.csr
cp server.key server.key.org
openssl rsa -in server.key.org -out server.key
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
cd ..
```
Add the certificate to your keychain on OSX
- Open your keychain access and drag the server.crt into the keystore.
- Go into the Certificates section and locate the certificate you just added.
- Double click on it, enter the trust section and under “When using this certificate” select “Always Trust”.
- Close the certificate window and exit keychain access.

Setup the development environment config

```
cp config/default-template.json config/development.json
vi config/development.json
```
Edit the config to ensure the ports and ssl certificate file names are correct if your local setup is different from the default.

Run the server in development mode with the command
```
npm run start:dev
```
Browse to the API in your browser (https://localhost:3001/api) and accept the certificate. If you restart the backend you may have to re-accept the certificate in your browser before API calls will work.

#### Front End
Install the npm libraries
```
cd front-angular
npm install
```

Run the front end in ssl mode with the command
```
npm run start:ssl
```
Browse to the front end in your browser (https://localhost:4200) and accept the certificate.

You should see the current price of NAV load into the first tile which confirms the connection to the back end is working correctly.

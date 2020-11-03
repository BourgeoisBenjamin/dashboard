FROM node:14-alpine

# create app directory
WORKDIR /usr/src/app/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# build the app
RUN npm install

# Bundle app source
COPY . .

CMD [ "node", "server.js" ]
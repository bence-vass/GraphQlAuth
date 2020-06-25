FROM node:12.16
WORKDIR /usr/src/app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .
RUN npm install --no-optional --no-shrinkwrap --no-packagls
e-lock --loglevel=error


COPY . .
#CMD ["npm", "rebuild", "node-sass", "--force"]
EXPOSE 3000
CMD ["npm", "start"]

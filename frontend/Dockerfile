FROM node:12-slim
WORKDIR /usr/src/app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .
RUN npm install


COPY . .
#CMD ["npm", "rebuild", "node-sass", "--force"]
EXPOSE 3000
CMD ["npm", "start"]

FROM node:14
WORKDIR /
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD npm run build && npm run start

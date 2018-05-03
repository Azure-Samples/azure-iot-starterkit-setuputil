FROM resin/armv7hf-node:slim

WORKDIR /app
COPY . /app

RUN [ "cross-build-start" ]
RUN npm install
RUN [ "cross-build-end" ]  

CMD ["npm", "start"]

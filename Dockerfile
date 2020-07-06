FROM node:13.8-alpine

# Verification API port
EXPOSE 3000

RUN set -x \
    && apk update \
    && apk upgrade \
    
WORKDIR /srv/app

COPY . /srv/app

RUN cd /srv/app && npm install

CMD cd /srv/app && npm start 

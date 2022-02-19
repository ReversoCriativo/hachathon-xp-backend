FROM node:16-alpine

RUN set -x \
    && chmod 775 /usr/local/bin/* \
    && chmod +x /usr/local/bin/*.sh \
    && mkdir /server

WORKDIR /server

EXPOSE 3001

CMD yarn start:dev
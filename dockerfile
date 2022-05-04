FROM node:16.15.0-alpine3.15 as build

WORKDIR /app
COPY . .
RUN yarn install \
   && yarn build

FROM nginx:1.21.6-alpine

RUN apk update \
   && apk upgrade \
   && apk add --no-cache bash

WORKDIR /var/www/html
COPY --from=build /app/build /var/www/html
COPY ./config/default.conf /etc/nginx/conf.d

COPY .env.sample .
COPY ./env.sh .
RUN chmod +x env.sh

EXPOSE 80

CMD ["/bin/bash", "-c", "/var/www/html/env.sh && nginx -g \"daemon off;\""]
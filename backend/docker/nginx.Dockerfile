FROM nginx

RUN set -x \
    && mkdir -m 777 /src \
    && mkdir -m 777 /src/public

ADD ./backend/docker/nginx.conf /etc/nginx/conf.d/default.conf

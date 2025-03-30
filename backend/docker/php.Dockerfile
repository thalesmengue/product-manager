FROM php:8.3-fpm-alpine

WORKDIR /src

RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
        bash \
        git \
        openssh \
        php-cli \
        zlib-dev \
        freetype-dev \
        libpng-dev \
        libjpeg-turbo-dev \
        libzip-dev \
        zip \
        mysql-client \
        mariadb-connector-c-dev \
        libwebp-dev \
        linux-headers \
        icu-dev \
        icu-libs

RUN set -x \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ --with-webp=/usr/include/ \
    && docker-php-ext-install opcache bcmath exif pdo pdo_mysql zip gd intl

RUN set -x \
    && docker-php-ext-install pcntl

RUN set -x \
    && apk add --no-cache   --virtual .build-deps  pcre-dev $PHPIZE_DEPS \
    && pecl install redis xdebug pcov \
    && docker-php-ext-enable redis gd xdebug pcov \
    && apk del -f .build-deps

RUN set -x \
    && curl -L https://getcomposer.org/composer.phar -o /usr/local/bin/composer \
    && chmod +x /usr/local/bin/composer

COPY ./backend/ /src/

RUN set -x \
    && mkdir -p /src/storage/logs \
    && mkdir -p /src/storage/framework \
    && mkdir -p /src/storage/framework/cache \
    && mkdir -p /src/storage/framework/cache/data \
    && mkdir -p /src/storage/framework/sessions \
    && mkdir -p /src/storage/framework/views \
    && chmod -R 777 /src/storage \
    && chown -R www-data:www-data /src/storage \
    && mkdir -p /tmp/storage \
    && ln -sf /src/storage/logs /tmp/storage/logs \
    && ln -sf /src/storage/framework /tmp/storage/framework \
    && chmod -R 777 /tmp/storage


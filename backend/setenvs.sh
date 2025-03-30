#!/bin/bash

file=/var/secrets-store/.env.generic
if [ -e $file ]
then
    echo "" >> /src/.env
    cat $file >> /src/.env
fi

file=/var/secrets-store/.env
if [ -e $file ]
then
    echo "" >> /src/.env
    cat $file >> /src/.env
fi

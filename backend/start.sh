#!/bin/bash
./backend/setenvs.sh
php-fpm

echo "FPM exited with $?"

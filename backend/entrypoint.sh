#!/bin/sh

echo 'Making migrations'
python manage.py makemigrations --noinput
echo 'Migrate'
python manage.py migrate --noinput

echo 'Running Server'
exec "$@"
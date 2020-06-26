#!/bin/sh

python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --no-input --clear
python manage.py runserver 0.0.0.0:8000
# gunicorn backend.wsgi:application --bind 0.0.0.0:8000

exec "$@"

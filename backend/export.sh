#!/bin/bash

export $(grep -v '^#' .env | xargs -L 1)
poetry run python manage.py makemigrations
poetry run python manage.py migrate
FROM python:3.9-slim-buster

EXPOSE 8000
# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1
# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

WORKDIR /app
# Install pip requirements
# install system dependencies
RUN apt-get update \
    && apt-get -y install netcat gcc build-essential default-libmysqlclient-dev libpq-dev \
    && apt-get clean
COPY requirements.txt .
# install python dependencies
RUN pip install --upgrade pip
RUN pip install poetry==1.1.12 setuptools
COPY poetry.lock . 
COPY pyproject.toml .
RUN poetry export -f requirements.txt --without-hashes | pip install -r /dev/stdin
COPY . .
RUN sed -i 's/\r$//g' entrypoint
RUN chmod +x entrypoint

ENTRYPOINT [ "/app/entrypoint" ]

# RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app

# USER appuser


# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "core.wsgi"]

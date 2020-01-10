FROM python:2.7-alpine

# RUN apt-get update -y && \
#     apt-get install -y python-pip python-dev

RUN apk add build-base

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install --ignore-installed -r requirements.txt

COPY . /app

ENTRYPOINT [ "python" ]

CMD [ "server.py" ]
FROM python:2.7

# RUN apt-get update -y && \
#     apt-get install -y python-pip python-dev

RUN apt-get update && apt-get install -y build-essential

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

ENTRYPOINT [ "python" ]

EXPOSE 4000

CMD [ "server.py" ]

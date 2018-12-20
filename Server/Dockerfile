FROM python:3.6-slim

ADD . /code
WORKDIR /code
EXPOSE 8000

RUN pip install -i https://mirrors.aliyun.com/pypi/simple -r requirements.txt

VOLUME ["/data"]

ENTRYPOINT ["python", "manage.py", "runserver" ,"--settings=Server.production_settings"  ,"0.0.0.0:8000"]
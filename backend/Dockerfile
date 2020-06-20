FROM python:3.6
WORKDIR /usr/src/backend-app

ENV LIBRARY_PATH=/lib:/usr/lib
ENV PYTHONUNBUFFERED 1



RUN pip install numpy scipy
RUN pip install --no-cache-dir pillow
COPY requirements.txt ./requirements.txt
RUN pip install -r requirements.txt
EXPOSE 8000
# CMD ["python", "manage.py", "runserver"]
COPY ../graphene01 .

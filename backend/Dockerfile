FROM python:3.13-alpine

WORKDIR /app/web

ENV PYTHONDONTWRITEBYTECODE=1

ENV PYTHONBUFFERED=1

COPY ./requirements.txt /app/web/requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . /app/web
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
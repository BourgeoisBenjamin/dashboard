FROM postgres:12.4

USER postgres

RUN whoami

ADD ./schema.sql /docker-entrypoint-initdb.d/

ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 5432

CMD ["postgres"]
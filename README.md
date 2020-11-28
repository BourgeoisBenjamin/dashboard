# B-DEV-500-NAN-5-1-cardgames-amaury.lecomte

# HOW TO BUILD AND RUN

## RUN IN PRODUCTION MODE

```bash
docker-compose -f docker-compose.yml up --build
```

## RUN IN DEVELOPMENT MODE (with hot reload for client)

```bash
docker-compose -f docker-compose.dev.yml up --build
```

## RUN UNIT TEST

```bash
docker-compose -f docker-compose.test.yml up --build
```

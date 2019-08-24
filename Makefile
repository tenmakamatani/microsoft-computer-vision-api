SERVICE_NAME = node

.PHONY: start
start:
	docker-compose up -d --build

.PHONY: bash
bash:
	docker-compose exec $(SERVICE_NAME) /bin/ash

.PHONY: run
run:
	docker-compose exec $(SERVICE_NAME) yarn start

.PHONY: restart
restart:
	docker-compose kill && \
	docker-compose rm -f && \
	docker-compose up -d --build

.PHONY: kill
kill:
	docker-compose kill

.PHONY: logs
logs:
	docker-compose logs
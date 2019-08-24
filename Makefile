SERVICE_NAME = node

.PHONY: start
start:
	docker-compose up -d --build

.PHONY: logs
logs:
	docker-compose logs

.PHONY: restart
restart:
	docker-compose kill && \
	docker-compose rm -f && \
	docker-compose up -d --build

.PHONY: kill
kill:
	docker-compose kill

.PHONY: bash
bash:
	docker-compose exec $(SERVICE_NAME) /bin/ash
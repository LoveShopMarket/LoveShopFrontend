.PHONY: help dev dev-build prod up down logs clean

help: 
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

dev:
	docker compose watch

dev-build:
	docker compose up --build

prod:
	docker build -t my-vue-app .
	docker run -p 8080:80 my-vue-app

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

clean:
	docker compose down -v --rmi all
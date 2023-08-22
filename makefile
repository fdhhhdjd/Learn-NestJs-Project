## Auto matic run

run-docker:
	docker compose up -d

run-dev:
	npm run start:dev

run-prisma:
	npx prisma studio
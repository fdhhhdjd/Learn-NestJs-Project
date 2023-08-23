## Auto matic run
run-docker:
	docker compose up -d

run-dev:
	npm run start:dev

run-prisma-studio:
	npx prisma studio

run-prisma-push:
	npx prisma db push
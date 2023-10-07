
build:
	npm install

run:
	npm run dev

local-docker-dummy:
	docker run --name postgresql-container -p 5432:5432 -e POSTGRES_PASSWORD=dudeThisIsInsecure! -d postgres 
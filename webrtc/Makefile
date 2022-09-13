tag=latest
prod_tag=1.0.4
image=hamropatrorepo/conference-poc-server

clean:
	rm -rf build

dev:
	docker build -t ${image}:${tag} .
	docker push ${image}:${tag}

prod:
	docker build -t ${prod_image} .
	docker push ${image}:${prod_tag}

pushd:
	docker push ${image}:${tag}

pushp:
	docker push ${image}:${prod_tag}
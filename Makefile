#IP := 192.168.1.118
#IP := 172.16.2.166
IP := 172.16.2.166
SHELL := /bin/bash

.PHONY: client format backend serve livekit up updaemon

client:
	npm run dev --prefix ${PWD}/client/

format:
	npm run format --prefix ${PWD}/client/

backend:
	cd backend && source export.sh && poetry run python manage.py runserver 0.0.0.0:8000

serve:
	cd webrtc && source export.sh && npm run serve

livekit:
	docker run --rm -p 7880:7880 \
          -p 7881:7881 \
          -p 7882:7882/udp \
          -v ${PWD}/livekit.yaml:/livekit.yaml \
          livekit/livekit-server \
          --config /livekit.yaml \
          --node-ip=${IP}
  
up:
	docker-compose up

updaemon:
	docker-compose up -d

down:
	docker-compose down

build:
	sudo docker-compose build

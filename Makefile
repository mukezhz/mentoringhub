SHELL := /bin/bash

.PHONY: client backend serve

client:
	npm run dev --prefix ${PWD}/client/

backend:
	cd backend && source export.sh && poetry run python manage.py runserver 0.0.0.0:8000

serve:
	cd webrtc && source export.sh && npm run serve

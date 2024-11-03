#!/bin/sh
ENV=${ENV:-PROD}
if [ "$ENV" = "PROD" ]
then
	node /code/standalone/server.js
else
	npm run dev
fi

exec "$@"
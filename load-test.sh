#!/bin/bash

URL_ID=${1:-abc123}
BASE_URL="http://localhost:3000/shorten-url"
TOTAL_REQUESTS=${2:-1000}
CONCURRENCY=${3:-50}

echo "Hitting $TOTAL_REQUESTS requests with concurrency $CONCURRENCY..."

seq $TOTAL_REQUESTS | xargs -n1 -P$CONCURRENCY -I{} \
  curl -s -o /dev/null "$BASE_URL/$URL_ID"

echo "Done."
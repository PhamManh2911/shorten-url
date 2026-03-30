BASE_URL=http://localhost:3000/shorten-url
URL_ID?=rnnY20Xj
ORIGINAL_URL?=https://www.youtube.com/

.PHONY: create get stats

# Create short URL
create:
	curl -X POST $(BASE_URL) \
		-H "Content-Type: application/json" \
		-d '{"url": "$(ORIGINAL_URL)"}'

# Get original URL
get:
	curl $(BASE_URL)/$(URL_ID)

# Get URL stats
stats:
	curl $(BASE_URL)/$(URL_ID)/stats
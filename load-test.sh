# setting more reasonable concurrency setting for single instance service
# 400 may worsen the accept queue cause long tail latency
wrk -t10 -c200 -d20s --latency http://127.0.0.1:3000/shorten-url/rnnY20Xj
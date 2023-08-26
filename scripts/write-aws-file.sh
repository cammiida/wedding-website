#!/bin/sh
cat > ./aws <<EOL
[netlify]
region = eu-west-1
aws_secret_access_key = $ENV_SECRET_ACCESS_KEY
aws_access_key_id = $ENV_ACCESS_KEY_ID
EOL
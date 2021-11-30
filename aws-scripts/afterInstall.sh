#!/usr/bin/env bash
rsync --delete-before --verbose --archive /var/www/release/ /htdocs/ > /var/log/deploy.log

cp -R /var/www/release/ /htdocs/
chown yanadoo:yanadoo /htdocs/

# timestamp
find /htdocs/ -print0 | xargs -0 touch

if [ -d /var/www/release ]; then
    rm -rf /var/www/release
fi
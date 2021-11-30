#!/usr/bin/env bash
rsync --delete-before --verbose --archive --exclude="index.php" /home/yanadoo/test/ /htdocs/ > /var/log/deploy.log

chown yanadoo:yanadoo /htdocs/

# timestamp
find /htdocs/ -print0 | xargs -0 touch

if [ -d /var/www/release ]; then
    rm -rf /var/www/release
fi
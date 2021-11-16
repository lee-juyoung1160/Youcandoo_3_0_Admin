#!/usr/bin/env bash
if [ -d /var/www/release ]; then
    rm -rf /var/www/release
fi
mkdir -vp /var/www/release
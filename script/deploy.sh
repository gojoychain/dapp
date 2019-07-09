#!/bin/sh

echo 'Cleaning up...'
rm -rf build

echo 'Rebuilding...'
npm run build

echo 'Deploying...'
sudo cp -r ./build/. /var/www/dapp

echo 'Deployed!'

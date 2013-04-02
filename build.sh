#!/bin/sh

echo "Ensuring dist directory exists..."
mkdir -p dist

echo "Building Game..."
../bin/lime.py build gamegrump -o dist/game.js

echo "Copying Assets..."
rm -rf dist/images
cp -rf images dist

echo "All done! New build has been put in the dist directory."
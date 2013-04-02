#!/bin/sh

echo "Ensuring dist directory exists..."
mkdir -p dist

echo "Building Game..."
../bin/lime.py build gamegrump -o dist/game.js

echo "Copying Assets..."
cp -rf images dist/images

echo "All done! New build has been put in the dist directory."
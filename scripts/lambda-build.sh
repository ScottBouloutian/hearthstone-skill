#!/bin/sh
mkdir -p build
rm -r build/*
cp index.js cards.json package.json build
(
    cd build;
    npm install --production;
    rm package.json;
)
zip -rmX build.zip build

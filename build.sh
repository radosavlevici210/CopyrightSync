#!/bin/bash
npm run build
cp _redirects dist/
cp netlify.toml dist/
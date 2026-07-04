#!/bin/bash
source ~/.nvm/nvm.sh
nvm use 22
cd ~/arogyam
npx next build 2>&1 | tail -30

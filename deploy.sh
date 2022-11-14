#! /bin/zsh

yarn build;
pm2 del docs-page;
pm2 start npm --name "docs-page" -- start;
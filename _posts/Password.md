---
title: "Password"
excerpt: "This endpoint will return random string password"
coverImage: "/assets/blog/hello-world/cover.jpg"
date: "2022-11-14T03:43:41.993Z"
author:
  name: Hanivan Rizky S
  picture: "https://avatars.githubusercontent.com/u/66857547?v=4"
  github: "https://github.com/Hanivan"
ogImage:
  url: "/assets/blog/hello-world/cover.jpg"
---

This endpoint will return random string password

## Form Parameters

``character_length`` <small>number</small>

Length of generated password (default 10, max 50 char).

``include_upper`` <small>boolean</small>

 Mix password with uppercase character.

``include_numbers`` <smal>boolean</small>

Mix password with numbers.

``include_symbols`` <small>boolean</small>

Mix password with symbols.

## Path
```
POST /password
```


```bash
curl -X POST \
  'https://api.notneet.my.id/password' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "character_length": 25,
  "include_upper": true,
  "include_numbers": true,
  "include_symbols": true
}'
```

## Response

The above command returns string password like this:

```
jk)8q^ke9h213-n+_8.
```


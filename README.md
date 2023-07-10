# Atir RESTUARANT API

## Dependencies

> "bcrypt": "^5.1.0",

> "dotenv": "^16.0.3",

> "express": "^4.18.2",

> "jsonwebtoken": "^9.0.0",

> "mongoose": "^7.0.1"

## Endpoints

- user/api/register
- user/api/login
- /api/user/:id/reset [To reset the password]
- /api/restaurants [WIll give you all the restaurants..]
- /api/restaurants/:id
- /api/restaurants/:id/menu  
- /api/restaurants/:id/menu   [PUt/PATCH]
- /api/restaurants/:id/menu   [Delete]
- /api/order
- /api/order/:id [Get request to see all your orders]
- /api/order/:id [Update the status of your order]



### POST: /user/register

- User with the same email can not register twice

> *body**: `{name, email, password}`

### POST: /user/login

> *body**: `{email, password}`


### POST: /api/restaurants

> *body**: `{name, adress:{street,city,state,country,zip},menu}`


### Add A Item to Restaurant Menu:[ POST: /api/restaurants/:id/menu ]

> *body**: `{ name, description, price, image }`



### POST: /api/order

> *body**: `{restaurantid,name,price,quantity,totalprice,deliveryAddress}`


>  This is case sensitive so enter the same field otherwise it will throw and error
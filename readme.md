
## Ecommerce backend
Backend for Ecommerce


## Features

- Authenticatio users
- login logout
- products list by category id
- product details by id
- cart details by user
- past order history
- past order details

## Tech Stack

**Backend:**  nodejs | Express | MongoDB

## Run Locally

Clone the project

```bash
https://github.com/shanukajain/ecommerce_backend.git
```

```bash
  cd ecommerce_backend
```

Install dependencies

```bash
  npm install
```
Start the server

```bash
  npm run server
```
## Environment variable
#### 
To run this project, you will need to add the following environment variables to your .env file

`mongourl`

`PORT`
## Use All Api at deployed link

https://ecommerce-a9g9.onrender.com
## API Reference

#### user

```http
  POST /user/register
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `{name,email,password,gender}` | `Json` | register the new user|

```http
  POST /user/login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `{email,password}` | `Json` | login user and give token|

```http
  GET /user/logout
```

| header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `Json` | logout the user|

#### category


```http
  GET /category
```

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `` | `Json` | all the category of the product|

```http
  POST /category/create
```

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `{name,description}` | `Json` | create new category|


```http
  PATCH /category/:_id
```

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `{name,description}` | `Json` | update  category|

```http
  DELETE /category/:_id
```

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `` | `Json` | delete  category|

#### product

```http
  GET /product/
```

| query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `category_id` | `Json` | return all the product of particular category|

| query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `product_id` | `Json` | details of the particular product|  


| query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `` | `Json` | all the product|

```http
  POST /product/create
```

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `{title,description,price,category_id,image}` | `Json` | create new product|

```http
  PATCH /product/:_id
```

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `{title,description,price,category_id,image}` | `Json` | update  product|

```http
  DELETE /product/:_id
```

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `` | `Json` | delete  product|

#### product

```http
  GET /cart/
```

| header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `Json` | all cart product|

```http
  POST /cart/:_id
```

| params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `peoduct_id` | `Json` | add product in cart|

```http
  PATCH /cart/:_id
```

| body/header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `{quantity}/token` | `Json` | update  cart|

```http
  DELETE /cart/:_id
```

| header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `Json` | delete  cart|

#### order

```http
  GET /order/
```

| header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `Json` | all order list|

```http
  GET /order/:_id
```

| header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `Json` | order details by id|

```http
  post /order/:_id
```

| header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `Json` | order has been placed|


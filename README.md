![GitHub top language](https://img.shields.io/github/languages/top/nicolalenee/shop-shop)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/nicolalenee/shop-shop)
![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/nicolalenee/shop-shop?filename=package.json)
![GitHub last commit](https://img.shields.io/github/last-commit/nicolalenee/shop-shop)

<img width="1296" alt="shop-shop" src="https://user-images.githubusercontent.com/86696492/215543214-64aa6b7c-0442-4b4e-b35c-56031426f5d0.png"/>

# Shop Shop

Shop Shop is an eCommerce site that allows users to purchase items and checkout with stripe.

## Table of Contents

- [Shop Shop](#shop-shop)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Motivation](#motivation)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Installation](#installation)
  - [Deployment](#deployment)

## Description

To enable the checkout feature, users first have to Signup with their name, email, and password. Once logged in, users can view product details by clicking on the product. Users can also browse products by category. Items can be added to the cart from the homepage or from an individual product page. Once an item has been added, the cart will open and display the items in the cart. The quantity of items can be updated by using the `Add to cart` button or by changing the value manually in the cart. Once a user decides to checkout, they wiill be redirected to a Stripe checkout page where thy will enter their payment information. Finally, the user will be taken to the purchase success page and they can then view their order history.

## Motivation

eCommerce is now a major player in the global economy. There is a large population of individuals who prefer to buy items online rather than in person. I wanted to create a store that made purchasing items and browsing inventory easy. A large part that could make or break a user experience is the purchasing process. That is why I decided to implement the Stripe API for a smooth and secure purchasing experience.

## Features

- Signup and Login
- Browse products and view individual product detail
- Add and remove items from cart
- Checkout items in cart
- View order history

## Technologies

- MongoDB (Mongoose ORM)
- NodeJS
- ExpressJS
- React (ReactContextAPI for creating a Redux-like store)
- GraphQL
- Apollo Server
- bcyrpt
- JSONWebToken
- Stripe API
- Jest

## Installation

Install this application with the following steps:

1. First, clone the repository
   ```bash
    $ git clone https://github.com/nicolalenee/shop-shop.git
   ```
2. Then cd into the directory you cloned:
   ```bash
   cd shop-shpp
   ```
3. Install all the necessary packages and dependencies:
   ```bash
   npm install
   ```
4. Run client and server concurrently:
   ```bash
   npm run develop
   ```

## Deployment

[♥️ Live](https://shop-shop-nm.onrender.com)

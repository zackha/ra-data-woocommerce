# Woocommerce REST API Data Provider For React-Admin

Woocommerce REST API Data Provider for [react-admin](https://github.com/marmelab/react-admin), the frontend framework for building admin applications on top of REST/GraphQL services.

## Installation

```sh
npm install --save ra-data-woocommerce

or

yarn add ra-data-woocommerce
```

## REST Dialect

This Data Provider fits REST APIs powered by [Woocommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs)

| Method             | API calls                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------|
| `getList`          | `GET https://my.api.url/orders?order=asc&page=1&per_page=10`                                                 |
| `getOne`           | `GET https://my.api.url/orders/123`                                                                          |
| `getMany`          | `GET https://my.api.url/orders?include=123,456,789`                                                          |
| `getManyReference` | `GET https://my.api.url/orders?customer_id=345`                                                              |
| `create`           | `POST https://my.api.url/orders`                                                                             |
| `update`           | `PUT https://my.api.url/orders/123`                                                                          |
| `updateMany`       | `PUT https://my.api.url/orders/123`, `PUT http://my.api.url/orders/456`, `PUT http://my.api.url/orders/789`  |
| `delete`           | `DELETE https://my.api.url/orders/123`                                                                       |

If your API is on another domain as the JS code, you'll need to whitelist this header with an `Access-Control-Expose-Headers` [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) header.

You need to allow access to the your IP number, from the firewall settings (whitelist - allowlist) of your server where your WooCommerce site is located.


## Usage

```jsx
// in src/App.js
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import woocommerceData from './ra-data-woocommerce';

const dataProvider = woocommerceData({
    woocommerceUrl: 'https://rays.com.tr/wp-json/wc/v3',
    consumerKey: 'ck_4b7c9c94dd61b458e7a0a13e40c8f1b98a395310',
    consumerSecret: 'cs_de8d232a90f55d73806e71c79e29b9fc079111da',
})

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="orders" list={ListGuesser} edit={EditGuesser} />
        <Resource name="customers" list={ListGuesser} edit={EditGuesser} />
    </Admin>
);

export default App;
```

## License

This data provider is licensed under the MIT License, and sponsored by [marmelab](https://marmelab.com).
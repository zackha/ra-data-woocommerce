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

| Method             | API calls                                                                                                                    |
| ------------------ | -----------------------------------------------------------------------------------------------------------------------------|
| `getList`          | `GET https://example.com/orders?order=asc&page=1&per_page=10&search=example&status=completed`                                |
| `getOne`           | `GET https://example.com/orders/123`                                                                                         |
| `getMany`          | `GET https://example.com/orders?include=123,456,789`                                                                         |
| `getManyReference` | `GET https://example.com/orders/123/notes`                                                                                   |
| `create`           | `POST https://example.com/orders`                                                                                            |
| `update`           | `PUT https://example.com/orders/123`                                                                                         |
| `updateMany`       | `PUT https://example.com/orders/123`, `PUT http://example.com/orders/456`, `PUT http://example.com/orders/789`               |
| `delete`           | `DELETE https://example.com/orders/123`                                                                                      |
| `deleteMany`       | `DELETE https://example.com/orders/123`, `DELETE https://example.com/orders/456`, `DELETE https://example.com/orders/789`    |


If your API is on another domain as the JS code, you'll need to whitelist this header with an `Access-Control-Expose-Headers` [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) header.

You need to allow access to the your IP number, from the firewall settings (whitelist - allowlist) of your server where your WooCommerce site is located.


## Usage

```jsx
// in src/App.js
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import woocommerceData from 'ra-data-woocommerce';

const dataProvider = woocommerceData({
    woocommerceUrl: 'https://example.com',
    consumerKey: 'ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    consumerSecret: 'cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
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

This data provider is licensed under the MIT License, and sponsored by [RAYS](https://rays.com.tr).
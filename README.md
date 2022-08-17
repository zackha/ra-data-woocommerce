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

You need to allow access (whitelist - allowlist) to your IP number from the hosting or firewall settings of your server where your WooCommerce site is located.


## Usage

```jsx
// in src/App.js
import * as React from "react";
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { PostList } from './posts';

const App = () => (
    <Admin dataProvider={jsonServerProvider('https://jsonplaceholder.typicode.com')}>
        <Resource name="posts" list={PostList} />
    </Admin>
);

export default App;
```

### Adding Custom Headers

The provider function accepts an HTTP client function as second argument. By default, they use react-admin's `fetchUtils.fetchJson()` as HTTP client. It's similar to HTML5 `fetch()`, except it handles JSON decoding and HTTP error codes automatically.

That means that if you need to add custom headers to your requests, you just need to *wrap* the `fetchJson()` call inside your own function:

```jsx
import { fetchUtils, Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // add your own headers here
    options.headers.set('X-Custom-Header', 'foobar');
    return fetchUtils.fetchJson(url, options);
};
const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com', httpClient);

render(
    <Admin dataProvider={dataProvider} title="Example Admin">
       ...
    </Admin>,
    document.getElementById('root')
);
```

Now all the requests to the REST API will contain the `X-Custom-Header: foobar` header.

**Tip**: The most common usage of custom headers is for authentication. `fetchJson` has built-on support for the `Authorization` token header:

```js
const httpClient = (url, options = {}) => {
    options.user = {
        authenticated: true,
        token: 'SRTRDFVESGNJYTUKTYTHRG'
    };
    return fetchUtils.fetchJson(url, options);
};
```

Now all the requests to the REST API will contain the `Authorization: SRTRDFVESGNJYTUKTYTHRG` header.

## License

This data provider is licensed under the MIT License, and sponsored by [marmelab](https://marmelab.com).
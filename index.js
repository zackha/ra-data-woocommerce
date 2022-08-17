import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

/**
 * Maps react-admin queries to a WooCommerce REST API
 *
 * @see https://woocommerce.github.io/woocommerce-rest-api-docs/
 *
 * @example
 *
 * getList          => GET https://example.com/orders?order=asc&page=1&per_page=10
 * getOne           => GET https://example.com/orders/123
 * getMany          => GET https://example.com/orders?include=123,456,789
 * getManyReference => GET https://example.com/orders?customer_id=345
 * create           => POST https://example.com/orders
 * update           => PUT https://example.com/orders/123
 * updateMany       => PUT https://example.com/orders/123, PUT http://example.com/orders/456, PUT http://example.com/orders/789
 * delete           => DELETE https://example.com/orders/123
 *
 * @example
 *
 * import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
 * import woocommerceData from 'ra-data-woocommerce';
 * 
 * const dataProvider = woocommerceData({
 *     woocommerceUrl: 'https://example.com',
 *     consumerKey: 'ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
 *     consumerSecret: 'cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
 * })
 * 
 * const App = () => (
 *     <Admin dataProvider={dataProvider}>
 *         <Resource name="orders" list={ListGuesser} edit={EditGuesser} />
 *         <Resource name="customers" list={ListGuesser} edit={EditGuesser} />
 *     </Admin>
 * );
 * 
 * export default App;
 */
export default ({woocommerceUrl, consumerKey, consumerSecret,
    httpClient = (url, options = {}) => {
        if (!options.headers) {options.headers = new Headers({ Accept: 'application/json' });}
        const token = `${consumerKey}:${consumerSecret}`
        const basic_auth = btoa(unescape(encodeURIComponent(token)))
        options.user = {authenticated: true, token: 'Basic ' + basic_auth};
        return fetchUtils.fetchJson(url, options);
    }
}) => ({
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            filter: JSON.stringify(params.filter),
            page: page,
            per_page: perPage,
            order: (field, order === 'DESC' ? 'desc' : 'asc'),
        };
        const url = `${woocommerceUrl}/wp-json/wc/v3/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('X-WP-Total').split('/').pop(), 10),
        }));
    },

    getOne: (resource, params) =>
        httpClient(`${woocommerceUrl}/wp-json/wc/v3/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            include: Array(params.ids),
        };
        const url = `${woocommerceUrl}/wp-json/wc/v3/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${woocommerceUrl}/wp-json/wc/v3/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('X-WP-Total').split('/').pop(), 10),
        }));
    },

    create: (resource, params) =>
        httpClient(`${woocommerceUrl}/wp-json/wc/v3/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    update: (resource, params) =>
        httpClient(`${woocommerceUrl}/wp-json/wc/v3/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${woocommerceUrl}/wp-json/wc/v3/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    delete: (resource, params) =>
        httpClient(`${woocommerceUrl}/wp-json/wc/v3/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${woocommerceUrl}/wp-json/wc/v3/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
});
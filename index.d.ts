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
 * getManyReference => GET https://example.com/orders/123/notes
 * create           => POST https://example.com/orders
 * update           => PUT https://example.com/orders/123
 * updateMany       => PUT https://example.com/orders/123, PUT http://example.com/orders/456, PUT http://example.com/orders/789
 * delete           => DELETE https://example.com/orders/123
 * deleteMany       => DELETE https://example.com/orders/123, DELETE https://example.com/orders/456, DELETE https://example.com/orders/789
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
 declare const _default: ({ woocommerceUrl, consumerKey, consumerSecret, httpClient }: {
    woocommerceUrl: any;
    consumerKey: any;
    consumerSecret: any;
    httpClient?: ((url: any, options?: {}) => Promise<{
        status: number;
        headers: Headers;
        body: string;
        json: any;
    }>) | undefined;
}) => {
    getList: (resource: any, params: any) => Promise<{
        data: any;
        total: number;
    }>;
    getOne: (resource: any, params: any) => Promise<{
        data: any;
    }>;
    getMany: (resource: any, params: any) => Promise<{
        data: any;
    }>;
    getManyReference: (resource: any, params: any) => Promise<{
        data: any;
        total: number;
    }>;
    create: (resource: any, params: any) => Promise<{
        data: any;
    }>;
    update: (resource: any, params: any) => Promise<{
        data: any;
    }>;
    updateMany: (resource: any, params: any) => Promise<{
        data: any;
    }>;
    delete: (resource: any, params: any) => Promise<{
        data: any;
    }>;
    deleteMany: (resource: any, params: any) => Promise<{
        data: any;
    }>;
};
export default _default;
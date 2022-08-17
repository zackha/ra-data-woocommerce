import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

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
        const url = `${woocommerceUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('X-WP-Total').split('/').pop(), 10),
        }));
    },

    getOne: (resource, params) =>
        httpClient(`${woocommerceUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            include: Array(params.ids),
        };
        const url = `${woocommerceUrl}/${resource}?${stringify(query)}`;
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
        const url = `${woocommerceUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('X-WP-Total').split('/').pop(), 10),
        }));
    },

    create: (resource, params) =>
        httpClient(`${woocommerceUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    update: (resource, params) =>
        httpClient(`${woocommerceUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${woocommerceUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    delete: (resource, params) =>
        httpClient(`${woocommerceUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${woocommerceUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
});
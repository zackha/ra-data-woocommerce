import { fetchUtils, Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import woocommerceData from './ra-data-woocommerce';

const woocommerceUrl = 'https://rays.com.tr/wp-json/wc/v3';
const consumerKey = 'ck_4b7c9c94dd61b458e7a0a13e40c8f1b98a395310';
const consumerSecret = 'cs_de8d232a90f55d73806e71c79e29b9fc079111da';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = `${consumerKey}:${consumerSecret}`
    const basic_auth = btoa(unescape(encodeURIComponent(token)))
    options.user = {
        authenticated: true,
        token: 'Basic ' + basic_auth
    };
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = woocommerceData(woocommerceUrl, httpClient);

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="orders" list={ListGuesser} edit={EditGuesser} />
        <Resource name="customers" list={ListGuesser} edit={EditGuesser} />
    </Admin>
);

export default App;
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
import { createClient } from 'microcms-js-sdk';

const client = createClient({
	serviceDomain: 'nekolog',
	apiKey: process.env.API_KEY || '',
});

export default client;
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'nekolog',
  apiKey: process.env.API_KEY || '',
});
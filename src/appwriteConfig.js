import { Client, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64ad3b6c768cf85531d4');


export const account = new Account(client);


export default client
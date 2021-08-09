'use strict';
// {username: 'xxxxx', password:'xxxxx'} object
const config = require('../../../freednsConfig');
const freednsApi = require('../lib/api');

(async () => {
    /**
     *  Wrap everything inside a try-catch block.
     *  if there is invalid configuration or network problems an error will be thrown
     */
    try {

        // Get a list of all account dns records
        const entries = await freednsApi.getdyndns(config);

        // Update the first record with a user provided ip address
        const status = await freednsApi.update({
            updateUrl: entries[0].updateUrl, // This value can be obtained directly from the website
            address: '10.10.21.11' // This is optional, if not used, the ip will be detected automatically
        });

        console.log(status);

    } catch (error) {
        console.error(error);
    }
    
})();
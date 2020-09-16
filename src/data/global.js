const globalConfig = {
    development: {
        address: 'http://localhost:3000',
        preventIndexing: true
    },

    staging: {
        address: 'https://staging.yoursite.com',
        preventIndexing: true
    },

    production: {
        address: 'https://www.yoursite.com',
        preventIndexing: false
    }
};

module.exports = globalConfig[process.env.NODE_ENV || 'development']
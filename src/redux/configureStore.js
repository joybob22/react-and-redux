//Determine which store to load based on production or development
if (process.env.NODE_ENV === "production") {
    module.exports = require('./configureStore.prod');
} else {
    module.exports = require('./configureStore.dev');
}
if (process.env.NODE_ENV === 'production') {
    console.log(process.env.MONGO_URI,'at prod');
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}
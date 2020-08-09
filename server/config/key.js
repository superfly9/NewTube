if (process.env.NODE_ENV === 'production') {
    console.log(process.env.MONGO_URI,'at prod')
    module.exports = require('./prod');
} else {
    console.log(process.env.MONGO_URI,'at dev')
    module.exports = require('./dev');
}
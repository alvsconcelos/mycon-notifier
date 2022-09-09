const { JsonDB, Config }  = require('node-json-db')
const DB_SEPARATOR = '//'

const db = new JsonDB(new Config("database", true, true, DB_SEPARATOR))
const generateDbKey = (key) => {
    return `${DB_SEPARATOR}${key}`
}

module.exports = {
    db, generateDbKey, DB_SEPARATOR
}
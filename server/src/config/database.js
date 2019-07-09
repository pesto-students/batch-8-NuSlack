const {
    DATABASE_URL
} = process.env;

const database = {
    url: DATABASE_URL,
}

Object.freeze(database);

export default database;
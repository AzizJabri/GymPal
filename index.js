const server = require('./server');
const { PORT } = require('./src/configs');
const db = require('./src/db');

const start = async () => {
    try {
        await db;
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
const app = require('./app');

const port = process.env.APP_PORT || 3000;
app.listen(port || 3000, () => {
    console.log(`Back-end is running on http://localhost:${port}`);
});
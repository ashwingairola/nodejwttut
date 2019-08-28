const express = require('express');
const auth = require('./auth');

const app = express();

app.get('/api', (_req, res) => {
    res.json({
        message: 'Welcome'
    });
});

app.post('/api/posts', auth.protectRoute, (_req, res) => {
    res.json({
        message: 'Post created'
    });
});

app.post('/api/login', (_req, res) => {
    const user = {
        id: 1,
        username: 'golu',
        email: 'golu@golu.com'
    };

    auth.getToken(user, (_err, token) => {
        res.json({ token });
    });
});

app.listen(5000, () => {
    console.log('Server started at port 5000');
});

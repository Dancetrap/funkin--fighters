const path = require('path');

module.exports = {
    entry: {
        login: './client/login.jsx',
        team: './client/team.jsx',
        game: './client/game.jsx',
        profile: './client/profile.jsx',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    mode: 'development',
    watchOptions: {
        aggregateTimeout: 200,
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]Bundle.js',
    },
};
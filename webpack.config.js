const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = (env, argv) => {
    return {
        entry: './src/main.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js'
        },
        plugins: [
            new WorkboxPlugin.GenerateSW()
        ],
        devtool: "inline-source-map",
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: "ts-loader"
                },
            ],
        },
        devServer: {
            public: 'localhost:4200',
            host: '0.0.0.0',
            contentBase: path.join(__dirname, '/'),
            inline: true,
            clientLogLevel: 'error',
            open: true,
            compress: true,
            port: 4200
        }
    }

};

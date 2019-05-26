require('css-modules-require-hook')({
    generateScopedName: '[name]__[local]___[hash:base64:5]'
});

const path = require("path");
const express = require("express");

const fs = require("fs");

const React = require("react");
const ReactDOMServer = require("react-dom/server");
const StaticRouter = require("react-router-dom").StaticRouter;

const Home = require("./js/components/Home").default;

let  app = express();

app.use("/static", express.static('public/static'));

app.get('/*', (req, res) => {
    const context = {};
    const app = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <Home />
        </StaticRouter>
    );

    const indexFile = path.resolve('./public/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }
        return res.send(
            data.replace('<div id="app"></div>', `<div id="app">${app}</div>`)
        );
    });
});
app.listen(3000,  () => console.log("Example app listening on port 3000!"));
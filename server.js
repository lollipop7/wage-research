/**
 * Created by lollipop at 2017/11/21.
 */
const express = require('express'),
    join = require('path').join,
    http = require('http'),
    app = express(),
    chalk = require('chalk'),
    log = console.log;
const fs = require('fs'),
    bodyParser = require('body-parser'),   //对body的内容采用不同的处理方法
    compression = require('compression'); //网站效率优化,启动Gzip压缩功能
app.use(compression());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
//parse application/json
app.use(bodyParser.json());
app.use(express.static(join(__dirname, 'src/www')));
app.listen(8081, () => {
    log(chalk.blue.bold('app listening on port 8081!'));
});


var webpackConfig = require("./webpack.config.js"),
    path = require("path");

module.exports = function (config) {
    "use strict";
    config.set({

        basePath: "",

        frameworks: ["mocha", "chai", "sinon"],

        files: [
            "test/*.spec.js"
        ],

        preprocessors: {
            "test/*.spec.js" : ["webpack"],
            "src/*.js": ["webpack"]
        },
        coverageReporter: {
            dir: "coverage",
            reporters: [
                { type: "html", subdir: "derp" }
            ]
        },
        reporters: ["progress", "coverage"],
        resolve: {
			root: [
				path.resolve( "./src" )
			]
		},
        
        webpack: webpackConfig,
        port: 9876,
        colors: true,
        autoWatch: false,
        singleRun: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        browsers: ["PhantomJS"],

    });
};
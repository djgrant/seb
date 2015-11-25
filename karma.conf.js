module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],

    frameworks: ['mocha', 'should', 'browserify'],

    files: [
      'test/**/*.spec.js',
      'src/**/*.spec.js'
    ],

    preprocessors: {
      './**/*.spec.js': ['browserify']
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      }
    },

    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    },

    browserify: {
      debug: true,
      transform: [
        ['babelify']
      ],
    },

    reporters: ['mocha']
  });
};

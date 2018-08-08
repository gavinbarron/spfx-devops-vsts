"use strict";
var existingKarmaConfig = require('@microsoft/sp-build-web/lib/karma/karma.config');
var _ = require('lodash');
var junitReporter = require('karma-junit-reporter');
var remapIstanbulReporter = require('karma-remap-istanbul');
var remapCoverageReporter = require('karma-remap-coverage');

module.exports = function (config) {
  existingKarmaConfig(config);
  config.reporters.push('junit');

  config.set({
    basePath: './..',
  });

  config.junitReporter = {
    outputDir: 'temp/', // results will be saved as $outputDir/$browserName.xml
    outputFile: 'test-results.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
    suite: 'karma', // suite will become the package name attribute in xml testsuite element
    useBrowserName: true, // add browser name to report and classes names
  };
  var coverageReportsRoot = './coverage';
  var coberturaSubDir = 'cobertura';
  var coverageSubDir = 'lcov';
  var coberturaFileName = 'cobertura.xml';
  config.coverageReporter.reporters.push({type: 'cobertura', subdir: './' + coberturaSubDir, file: coberturaFileName});
  config.remapIstanbulReporter = {
    reports: {
      cobertura: coverageReportsRoot + '/' + coberturaSubDir + '/' + coberturaFileName,
    }
  };
  config.coverageReporter.reporters.push({
    type: 'lcov',
    subdir: './' + coverageSubDir + '/',
    file: 'lcov.info'
  });
  remapCoverageReporter = {
    cobertura: coverageReportsRoot + '/' + coberturaSubDir + '/' + coberturaFileName,
  };
  config.browserNoActivityTimeout = 60000;
  config.plugins.push(remapIstanbulReporter);
  config.plugins.push(remapCoverageReporter);
  config.plugins.push(junitReporter);
};

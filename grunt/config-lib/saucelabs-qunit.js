// var request = require('request')

module.exports = {
  all: {
    options: {
      urls: ['http://localhost:9000/test/test.html?hidepassed'],
      build: process.env.CI_BUILD_NUMBER,
      testname: 'Big Ideas Text',
      tunnelTimeout: 5,
      browsers: [
        {
          browserName: 'Firefox',
          platform: 'Windows XP',
          version: '16', // Oldest version of Firefox on Moriston minisite
          recordVideo: false
        },
        {
          browserName: 'chrome',
          platform: 'Windows XP',
          version: '31', // Oldest version of Chrome on Moriston minisite is 44
          recordVideo: false
        },
        {
          browserName: 'internet explorer',
          platform: 'Windows 7',
          version: '9.0',
          recordVideo: false
        },
        {
          browserName: 'internet explorer',
          platform: 'Windows 8',
          version: '10.0',
          recordVideo: false
        },
        {
          browserName: 'internet explorer',
          platform: 'OSX',
          version: '7',
          recordVideo: false
        },
        {
          browserName: 'safari',
          platform:  'OS X 10.9',
          version:  '7.0', // Oldest Safari on Moriston minisite
          recordVideo:  false
        },
        {
          browserName: 'firefox',
          platform:  'OS X 10.10',
          version:  '40', // Most common Firefox on Moriston minisite
          recordVideo:  false
        },
        {
          browserName: 'iphone',
          platform: 'OS X 10.10',
          version: '6.1',
          recordVideo: false,
          deviceName: 'iPhone Simulator',
          deviceOrientation: 'portrait'
        },
        {
          browserName: 'android',
          platform: 'Linux',
          version: '4.0',
          recordVideo: false,
          deviceName: 'Samsung Galaxy Nexus Emulator',
          deviceOrientation: 'portrait'
        }
      ]
    }
  }
}

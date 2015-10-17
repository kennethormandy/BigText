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
          browserName: 'android',
          platform: 'Linux',
          version: '4.0',
          recordVideo: false,
          deviceName: 'Samsung Galaxy Nexus Emulator',
          deviceOrientation: 'portrait'
        },
        {
          browserName: 'chrome',
          platform: 'Windows XP',
          version: '31', // Oldest version of Chrome on Moriston minisite is 44
          recordVideo: false
        },
        {
          browserName: 'firefox',
          platform: 'OS X 10.9',
          version: '16', // Oldest version of Firefox on Moriston minisite
          recordVideo: false
        },
        {
          browserName: 'firefox',
          platform: 'Windows XP',
          version: '35', // Newset passing version of Firefox on Windows
          recordVideo: false
        },
        {
          browserName: 'firefox',
          platform:  'OS X 10.10',
          version:  '40', // Most common Firefox on Moriston minisite
          recordVideo:  false
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
          browserName: 'iphone',
          platform: 'OS X 10.10',
          version: '6.1',
          recordVideo: false,
          deviceName: 'iPhone Simulator',
          deviceOrientation: 'portrait'
        },
        {
          browserName: 'safari',
          platform:  'OS X 10.9',
          version:  '7.0', // Oldest Safari on Moriston minisite
          recordVideo:  false
        }
      ]
    }
  }
}

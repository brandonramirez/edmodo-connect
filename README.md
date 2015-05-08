# edmodo-connect
Easy client for interacting with the Edmodo Connect API

## Installing

    $ npm install edmodo-connect

## How to use

### General module interaction

The module returns a factory function which accepts options.  The factory function will return a client object that can interact with
Edmodo.

Options:

* endpoint: URL to the Edmodo Connect API.  Default: https://api.edmodo.com/ - useful for setting up a mock IdP for test environments

If you don't want to over-ride any settings, you can call the factory without any arguments.

Using the default Edmodo Connect production API.

    var edmodoConnect = require('edmodo-connect');
    var client = edmodoConnect();

With options:

    var edmodoConnect = require('edmodo-connect');
    var client = edmodoConnect({
      endpoint: 'http://test.edmodo.myappapi.com/'
    });

### Redeeming code

    var edmodoConnect = require('edmodo-connect');
    var client = edmodoConnect();
    client.redeemCodeForAccessToken(code, clientId, secret, 'http://mysite.com/login/callback/edmodo', function (err, token) {
      // token includes the OAuth token information
    });

### Getting user details

    var edmodoConnect = require('edmodo-connect');
    var client = edmodoConnect();
    client.getUser(userId, accessToken, function (err, user) {
      // user contains details of the requested user id.
    });

### Getting the details of the user associated with a token

    var edmodoConnect = require('edmodo-connect');
    var client = edmodoConnect();
    client.getInvoker(accessToken, function (err, user) {
      // user contains details of the user associated with the supplied access token
    });

### Group information

    var edmodoConnect = require('edmodo-connect');
    var client = edmodoConnect();
    client.getGroup(groupId, accessToken, function (err, group) {
      // group holds information about the requested group
    });

Warning: The group call is not tested!
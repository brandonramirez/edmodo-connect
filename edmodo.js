var unirest = require('unirest');
var extend = require('extend');

var EDMODO_API_ENDPOINT_URL = 'https://api.edmodo.com/';

module.exports = function (opts) {
  opts = extend({
    endpoint: EDMODO_API_ENDPOINT_URL
  }, opts || {});

  return {
    redeemCodeForAccessToken: function (code, clientId, secret, callbackUrl, callback) {
      unirest.post(opts.endpoint + '/oauth/token')
      .followRedirect(true)
      .form({
        client_id: clientId,
        client_secret: secret,
        redirect_uri: callbackUrl,
        code: code,
        grant_type: 'authorization_code'
      })
      .end(function (response) {
        if (response.ok) {
          callback(null, response.body);
        }
        else {
          callback(response.error);
        }
      });
    },

    getInvoker: function (token, callback) {
      this.getUser('me', token, callback);
    },

    getUser: function (userId, token, callback) {
      unirest.get(opts.endpoint + '/users/' + userId)
      .header({ 'Authorization': 'Bearer ' + token })
      .followRedirect(true)
      .end(function (response) {
        if (response.ok) {
          callback(null, response.body);
        }
        else if (response.notFound) {
          callback(null, null);
        }
        else {
          callback(response.error);
        }
      });
    },

    getGroup: function (groupId, token, callback) {
      unirest.get(opts.endpoint + '/groups/' + groupId)
      .headers({ 'Authorization': 'Bearer ' + token })
      .followRedirect(true)
      .end(function (response) {
        if (response.ok) {
          callback(null, response.body);
        }
        else {
          callback(response.error);
        }
      });
    }
  };
};

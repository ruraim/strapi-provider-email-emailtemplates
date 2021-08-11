'use strict'

const _ = require('lodash')
const EmailTemplates = require('email-templates')

module.exports = {
  provider: 'emailtemplates',
  name: 'EmailTemplates',

  init: (providerOptions = {}, settings = {}) => {
    const email = new EmailTemplates(providerOptions)

    return {
      send: (options) => {
        return new Promise((resolve, reject) => {
          options = _.isObject(options) ? options : {}
          options.message.from = options.from || settings.defaultFrom
          options.message.replyTo = options.replyTo || settings.defaultReplyTo

          email.send(options)
            .then(resolve)
            .catch(error => reject(error))
        })
      }
    }
  }
}
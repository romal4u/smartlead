import emailAccountSwagger from './v1/accounts/emailAccount'
import sendEmailSwagger from './v1/accounts/sendEmail'
import { trackingSwagger } from './v1/accounts/trackEmail'

export const apiDocumentation = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'SmartLeat Backend API - Documentation',
    description: '',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/v1/api/',
      description: 'Local Server',
    },
  ],
  tags: [
    {
      name: 'Smartlead',
    },
  ],
  paths: {
    '/account': {
      post: emailAccountSwagger,
    },
    '/account/{account_id}/send-email': {
      post: sendEmailSwagger,
    },
    '/tracking/{h}': {
      get: trackingSwagger,
    },
  },
}

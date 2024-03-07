export const emailAccountSwagger = {
  summary: 'Add an email account',
  description: 'Add a new email account',
  tags: ['Email Accounts'],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            fromName: {
              type: 'string',
              example: 'Vaibhav Namburi',
            },
            fromEmail: {
              type: 'string',
              example: 'vnamburi1@smartleadscale.org',
            },
            username: {
              type: 'string',
              example: 'vnamburi1@smartleadscale.org',
            },
            password: {
              type: 'string',
              example: 'sg#2cxEi3Jo@ZX2f!41',
            },
            smtpHost: {
              type: 'string',
              example: 'smtp1.zoho.com.au',
            },
            smtpPort: {
              type: 'integer',
              example: 587,
            },
            smtpEncryption: {
              type: 'string',
              enum: ['SSL', 'TLS', 'None'],
              example: 'TLS',
            },
            messagesPerDay: {
              type: 'integer',
              example: 40,
            },
            minTimeGap: {
              type: 'integer',
              example: 5,
            },
            diffReplyToAddress: {
              type: 'string',
              example: '',
            },
            imapSettings: {
              type: 'object',
              properties: {
                imapUseDifferentAddress: {
                  type: 'boolean',
                  example: false,
                },
                imapHost: {
                  type: 'string',
                  example: 'imap1.zoho.com.au',
                },
                imapPort: {
                  type: 'integer',
                  example: 993,
                },
                imapEncryption: {
                  type: 'string',
                  enum: ['SSL', 'TLS', 'None'],
                  example: 'SSL',
                },
              },
            },
          },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Success',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                example: 'success',
              },
              message: {
                type: 'string',
                example: 'Email account added successfully',
              },
              data: {
                type: 'object',
                properties: {
                  account_id: {
                    type: 'integer',
                    example: 1,
                  },
                },
              },
            },
          },
        },
      },
    },
    '409': {
      description: 'Conflict',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'boolean',
                example: false,
              },
              message: {
                type: 'string',
                example: 'Account with username [vnamburi1@smartleadscale.org] already exists',
              },
            },
          },
        },
      },
    },
  },
}

export default emailAccountSwagger

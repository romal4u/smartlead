export const sendEmailSwagger = {
  summary: 'Send an email',
  description: 'Send an email from the specified email account',
  tags: ['Email Accounts'],
  parameters: [
    {
      in: 'path',
      name: 'account_id',
      required: true,
      description: 'The ID of the email account to use for sending the email',
      schema: {
        type: 'integer',
        example: 1,
      },
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            to: {
              type: 'string',
              example: 'rockstford@gmail.com',
            },
            subject: {
              type: 'string',
              example: 'This is test subject',
            },
            emailContent: {
              type: 'string',
              example: 'Contrary to popular belief, Lorem Ipsum is not simply random text...',
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
                example: 'Email sent successfully',
              },
              data: {
                type: 'object',
                properties: {
                  emailHash: {
                    type: 'string',
                    example: '508cec8c-e649-4a46-a4b5-01e6db7d36e3',
                  },
                },
              },
            },
          },
        },
      },
    },
    '403': {
      description: 'Forbidden',
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
                example: 'You have reached the limit of 4 emails per day. Please try again tomorrow.',
              },
            },
          },
        },
      },
    },
    '500': {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                example: 'error',
              },
              message: {
                type: 'string',
                example: 'Internal Server Error',
              },
            },
          },
        },
      },
    },
  },
}

export default sendEmailSwagger

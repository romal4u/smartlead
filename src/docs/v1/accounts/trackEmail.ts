export const trackingSwagger = {
  summary: 'Track email open',
  description: 'Track email open using email hash',
  tags: ['Tracking'],
  parameters: [
    {
      in: 'path',
      name: 'h',
      required: true,
      description: 'The hash of the email to track',
      schema: {
        type: 'string',
        example: 'd8bd90c2-3aae-47d5-b30c-6f429c3ced4b',
      },
    },
  ],
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
                example: 'Email track success',
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

/* eslint-disable @typescript-eslint/no-explicit-any */

import { TGenericErrorResponse, TerrorSource } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSources: TerrorSource = [
    {
      path: '',
      message: `${extractedMessage} is already exists!`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID!',
    errorSources,
  };
};

export default handleDuplicateError;

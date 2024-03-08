import { Application } from '@src/Application';
import { Callback, Context, Handler } from 'aws-lambda';

const application = new Application();

let serverlessHandler: Handler;
export const handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  serverlessHandler = serverlessHandler ?? (await application.initServerless());
  return serverlessHandler(event, context, callback);
};

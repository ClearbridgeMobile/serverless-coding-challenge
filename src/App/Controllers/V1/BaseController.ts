export default abstract class BaseController {
  responseOk({ message = 'ok', data = {} }: { message?: string; data?: any }) {
    return {
      message,
      data: data || undefined,
    };
  }
}

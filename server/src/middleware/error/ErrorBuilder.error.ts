class ErrorBuilder extends Error {
    status: number;
  
    constructor(message?: string, status: number = 400) {
      super(message);
      this.status = status;
    }
  
    static badRequest(message: string) {
      return new ErrorBuilder(message, 400);
    }
  
    static unauthorized(message: string) {
      return new ErrorBuilder(message, 401);
    }
  
    static forbidden(message: string) {
      return new ErrorBuilder(message, 403);
    }
  
    static notFound(message: string) {
      return new ErrorBuilder(message, 404);
    }
  }
  
  export default ErrorBuilder;
  

export default function errorHandler() {
  return function *getError(next) {
    try {
      yield next;
    } catch (err) {
      const errorDetails = err.stack || err;
      const errorInfo = {
        error: err.toString(),
        errorDetails
      };

      this.status = err.status || 500;

      this.type = 'application/json';

      this.body = errorInfo;

      this.app.emit('error', errorInfo, this);
    }
  };
}

class BusinessError extends Error {
  constructor(obj) {
    super();
    this.code = obj.code;
    this.message = obj.message;
  }
}

module.exports = BusinessError;

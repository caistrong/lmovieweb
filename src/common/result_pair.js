module.exports = {
  ok(data) {
    return Object.assign({}, this.SUCCESS, { data });
  },
  combine(...obj) {
    return Object.assign({}, this.SUCCESS, ...obj);
  },
  invalid(message) {
    return { code: 140001, message };
  },
  fine(message) {
    return { code: 0, message };
  },
  valid(message) {
    return { code: 0, message };
  },
  SUCCESS: {
    code: 0,
    message: '成功',
  },
  FAIL: {
    code: 140001,
    message: '失败',
  },
};

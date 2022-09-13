class event {
  constructor() {
    this.msg = {};
  }

  /**
   * subscribe 用来订阅要回调的事件
   * @param {*} key 事件的标识符
   * @param {*} fn  回调函数
   */
  subscribe(key, fn) {
    if (typeof fn != "function") {
      return;
    }
    // 不存在的事件创建
    if (!this.msg[key]) {
      this.msg[key] = [];
    }
    // 添加函数到事件集合中。
    this.msg[key].push(fn);
  }

  /**
   * 发布事件方法，用来通知订阅的事件
   * @param {*} key
   * 后续的参数根据情况添加
   */
  publish() {
    // 把参数中的第一个截出来
    let key = Array.prototype.shift.call(arguments);
    let callBack = this.msg[key];
    //集合为空就返回
    if (!callBack || !callBack.length) {
      return;
    }
    callBack.forEach((item) => {
      //遍历集合下的每个函数，依次将arguments回调给函数
      item.apply(this, arguments);
    });
  }

  /**
   * 事件删除，传入key值（fn选填）
   * @param {*} key
   * @param {*} fn 删除传入方法
   */
  remove(key, fn) {
    let fns = this.msg[key];
    // 空的话返回
    if (!fns || !fns.length) {
      return;
    }
    // fn不填的话直接把这个集合删了
    if (!fn) {
      delete this.msg[key];
    } else {
      for (let i = 0; i < fns.length; i++) {
        let item = fns[i];
        if (item === fn || item.fn === fn) {
          // 遍历集合，如果相同的话，splice
          fns.splice(i, 1);
          break;
        }
      }
    }
  }

  /**
   * 事件重置
   * @param {*} key
   * @param {*} fn 删除传入方法
   */
  reset() {
    this.msg = [];
  }
}

module.exports = event;

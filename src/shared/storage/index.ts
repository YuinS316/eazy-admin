class IStorage {
  public instance: Storage;
  public keyPrefix: string = "";

  constructor(local: "local" | "session") {
    this.instance =
      local === "local" ? window.localStorage : window.sessionStorage;
  }

  //  初始化的时候回去判断一下是否过期，过期了就返回null
  init() {
    Object.keys(this.instance).forEach(item => {
      if (item.startsWith(this.keyPrefix)) {
        this.hasItem(item.replace(this.keyPrefix, ""));
      }
    });
  }

  getItem(key: string) {
    let _key = this.keyPrefix + key;

    if (this.hasItem(key)) {
      return JSON.parse(this.instance.getItem(_key)!).value;
    }

    return null;
  }

  //  判断key是否存在且有无过期，过期会设为null
  hasItem(key: string) {
    let _key = this.keyPrefix + key;

    let item = this.instance.getItem(_key);

    if (item) {
      const expiredTime = JSON.parse(item).expiredTime;
      if (expiredTime && expiredTime < new Date().getTime()) {
        this.removeItem(_key);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  /**
   * 设置item
   *
   * @param key 键
   * @param value 值
   * @param expiredTime 过期时间 接收比如1d, 1h, 10d30h等格式
   */
  setItem(key: string, value: unknown, expiredTime?: string | null) {
    let _key = this.keyPrefix + key;
    let _value: {
      value: unknown;
      expiredTime: string | null;
    };

    if (!expiredTime) {
      expiredTime = null;
      _value = { value, expiredTime };
    } else {
      //  通过正则去匹配输入的时间
      //  时间格式比如: 1d30m20s
      let dayReg = /(\d+)(?=d)/;
      let hourReg = /(\d+)(?=h)/;
      let minReg = /(\d+)(?=m)/;
      let secondReg = /(\d+)(?=s)/;

      let days = expiredTime.match(dayReg)?.[0];
      let hours = expiredTime.match(hourReg)?.[0];
      let mins = expiredTime.match(minReg)?.[0];
      let seconds = expiredTime.match(secondReg)?.[0];

      let d = +(days ?? 0) * 1000 * 60 * 60 * 24;
      let h = +(hours ?? 0) * 1000 * 60 * 60;
      let m = +(mins ?? 0) * 1000 * 60;
      let s = +(seconds ?? 0) * 1000;

      let now = new Date().getTime();
      now = now + d + h + m + s;
      expiredTime = now + "";

      _value = { value, expiredTime };
    }

    this.instance.setItem(_key, JSON.stringify(_value));
  }

  clear() {
    if (this.keyPrefix && this.keyPrefix !== "") {
      Object.keys(this.instance).forEach(key => {
        if (key.startsWith(this.keyPrefix)) {
          this.instance.removeItem(key);
        }
      });
    } else {
      this.instance.clear();
    }
  }

  removeItem(key: string) {
    this.instance.removeItem(this.keyPrefix + key);
  }
}

export class ILocalStorage extends IStorage {
  constructor(keyPrefix: KeyPrefixEnum) {
    super("local");
    this.keyPrefix = keyPrefix;
    this.init();
  }
}

export class ISessionStorage extends IStorage {
  constructor(keyPrefix: KeyPrefixEnum) {
    super("session");
    this.keyPrefix = keyPrefix;
    this.init();
  }
}

//  可传入的keyPrefix
export const enum KeyPrefixEnum {
  GLOBAL = "global_",
  USER = "user_"
}

export default IStorage;

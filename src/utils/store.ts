import { parseTimeDuration } from "./time";

type StoreType = "localStorage" | "sessionStorage";

interface StorageData {
  data: unknown;
  expiredTime: number;
}

const DEFAULT_PREFIX = "eazy";

const DEFAULT_NAMESPACE = "global";

class BaseStore {
  //  前缀
  public prefix = DEFAULT_PREFIX;

  //  命名空间
  public namespace = DEFAULT_NAMESPACE;

  public storage;

  constructor(store: StoreType) {
    if (store === "localStorage") {
      this.storage = localStorage;
    } else {
      this.storage = sessionStorage;
    }
  }

  protected getKey(key: string) {
    return `${this.prefix}_${this.namespace}_${key}`;
  }

  getItem(key: string) {
    const source = this.storage.getItem(this.getKey(key));

    if (source === null) {
      return source;
    }

    const result: StorageData = JSON.parse(source);
    const { data, expiredTime } = result;

    const isExpired = Date.now() >= expiredTime;

    if (isExpired) {
      this.removeItem(key);
      return null;
    }

    return data;
  }

  setItem(key: string, value: unknown, expiredTime: string = "1w") {
    let timeStamp = parseTimeDuration(expiredTime);

    //  如果解析不出来，将过期时间改为1周
    if (timeStamp === null) {
      timeStamp = parseTimeDuration("1w");
    }

    try {
      const result: StorageData = {
        data: value,
        expiredTime: timeStamp!
      };
      this.storage.setItem(this.getKey(key), JSON.stringify(result));
      return value;
    } catch (error) {
      console.error(`[setItem Error]: ${error}`);
      return null;
    }
  }

  removeItem(key: string) {
    this.storage.removeItem(this.getKey(key));
  }

  /**
   * 只清理当前namespace下面的
   */
  clear() {
    const storageKeys = Object.keys(this.storage).filter(key =>
      key.startsWith(`${this.prefix}_${this.namespace}`)
    );

    storageKeys.forEach(key => {
      this.storage.removeItem(key);
    });
  }

  clearAll() {
    this.storage.clear();
  }
}

export class LocalStore extends BaseStore {
  constructor(namespace?: string, prefix?: string) {
    super("localStorage");
    this.namespace = namespace || DEFAULT_NAMESPACE;
    this.prefix = prefix || DEFAULT_PREFIX;
  }
}

export class SessionStore extends BaseStore {
  constructor(namespace?: string, prefix?: string) {
    super("sessionStorage");
    this.namespace = namespace || DEFAULT_NAMESPACE;
    this.prefix = prefix || DEFAULT_PREFIX;
  }
}

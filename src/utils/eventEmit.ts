import { isArray } from "./type";

interface EventMap {
  [k: string]: Function[];
}

export class EventEmitter {
  private events: EventMap = {};

  on(evName: string, fn: Function) {
    if (!isArray(this.events[evName])) {
      this.events[evName] = [];
    }

    this.events[evName].push(fn);
  }

  once(evName: string, fn: Function) {
    const wrapper = (...args: any[]) => {
      fn(...args);
      this.off(evName, wrapper);
    };
    this.on(evName, wrapper);
  }

  off(evName: string, fn?: Function) {
    if (!isArray(this.events[evName])) {
      console.warn(`[EventEmitter warn]: no event ${evName} register`);
      return;
    }

    if (fn) {
      this.events[evName] = this.events[evName].filter(cb => cb !== fn);
    } else {
      this.events[evName] = [];
    }
  }

  emit(evName: string, ...args: any[]) {
    if (!isArray(this.events[evName])) {
      console.warn(`[EventEmitter warn]: no event ${evName} register`);
      return;
    }

    this.events[evName].forEach(fn => {
      fn(...args);
    });
  }

  get eventMap() {
    return this.events;
  }
}

export default {};
import {
  MessageApiInjection,
  NotificationApiInjection,
  LoadingBarInst,
  DialogApiInjection
} from "naive-ui";
import type { EventEmitter } from "@/utils/eventEmit";

export type Recordable = Record<string, any>;

export type ComponentData<T = any> = Recordable & {
  id?: string;
  isHidden?: boolean;
  component: string;
  style: Recordable;
  groupStyle?: Recordable;
  propValue: T;
};

export type Point = {
  x: number;
  y: number;
};

export type AreaData = {
  style: Recordable;
  components: ComponentData[];
};

declare global {
  interface Window {
    $eventBus: EventEmitter;
    $message: MessageApiInjection;
    $notification: NotificationApiInjection;
    $dialog: DialogApiInjection;
    $loadingBar: LoadingBarInst;
  }
}

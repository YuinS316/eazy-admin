export default {};
import {
  MessageApiInjection,
  NotificationApiInjection,
  LoadingBarInst,
  DialogApiInjection
} from "naive-ui";
import type { EventEmitter } from "@/utils/eventEmit";

export type Recordable = Record<string, any>;

declare global {
  interface Window {
    $eventBus: EventEmitter;
    $message: MessageApiInjection;
    $notification: NotificationApiInjection;
    $dialog: DialogApiInjection;
    $loadingBar: LoadingBarInst;
  }
}

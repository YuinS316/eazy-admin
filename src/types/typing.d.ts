export default {};
import {
  MessageApiInjection,
  NotificationApiInjection,
  LoadingBarInst,
  DialogApiInjection
} from "naive-ui";

export type Recordable = Record<string, any>;

declare global {
  interface Window {
    $message: MessageApiInjection;
    $notification: NotificationApiInjection;
    $dialog: DialogApiInjection;
    $loadingBar: LoadingBarInst;
  }
}

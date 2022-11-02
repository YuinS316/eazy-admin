import { defineStore } from "pinia";
import { LoginBody, UserInfo } from "@/api/mock/model/userModel";
import store from "@/store/index";
import { ILocalStorage, KeyPrefixEnum } from "@/shared/storage";
import { postLogin } from "@/api/mock/user";
import { createDiscreteApi } from "naive-ui";

interface UserState {
  userInfo: UserInfo | null;
  token: string;
}

const userStorage = new ILocalStorage(KeyPrefixEnum.USER);

const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ["message", "dialog", "notification", "loadingBar"],
  {}
);

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    userInfo: userStorage.getItem("info") || null,
    token: ""
  }),
  getters: {
    getUserInfo(): UserState["userInfo"] {
      return this.userInfo;
    },
    getToken(): string {
      return this.token;
    }
  },
  actions: {
    async userLogin(body: LoginBody) {
      const { data } = await postLogin(body);
      if (data) {
        message.success("登录成功");
        this.setUserInfo(data);
        return true;
      } else {
        message.error("登录失败");
        return false;
      }
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
      userStorage.setItem("info", info, "3d");
    },
    setToken(token: string) {
      this.token = token;
    }
  }
});

//  在setup之外使用的
export function useUserStoreHook() {
  return useUserStore(store);
}

import { defineStore } from "pinia";
import { UserInfo } from "@/api/mock/model/userModel";
import store from "@/store/index";

interface UserState {
  userInfo: UserInfo | null;
  token: string;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    userInfo: null,
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
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
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

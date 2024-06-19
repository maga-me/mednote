import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthDataStore = defineStore("authData", {
  state: () => ({
    authDataList: [
      {
        login: "maga",
        password: "123",
        name: "Maga",
        surname: "Salohiddinov",
        accessLvl: "User",
        authId: 1,
        userId: 1,
      },
      {
        login: "asd",
        password: "333",
        name: "Asd",
        surname: "asd",
        accessLvl: "User",
        authId: 2,
        userId: 2,
      },
      {
        login: "admin",
        password: "111",
        name: "Admin",
        surname: "Salohiddinov",
        accessLvl: "Admin",
        authId: 3,
        adminId: 1,
      },
      {
        login: "ssss",
        password: "444",
        name: "Souza",
        surname: "Bentley",
        accessLvl: "User",
        authId: 4,
        userId: 3,
      },
      {
        login: "admin2",
        password: "424",
        name: "admin2",
        surname: "Salohiddinov",
        accessLvl: "Admin",
        authId: 5,
        adminId: 2,
      },
      {
        login: "qwer",
        password: "4444",
        name: "Pagan",
        surname: "Yang",
        accessLvl: "User",
        authId: 6,
        userId: 4,
      },
      {
        login: "maga",
        password: "123",
        name: "Maga",
        surname: "Salohiddinov",
        accessLvl: "User",
        authId: 7,
        userId: 5,
      },
      {
        login: "aaa",
        password: "333",
        name: "AAA",
        surname: "BBB",
        accessLvl: "User",
        authId: 8,
        userId: 6,
      },
    ],
  }),
  getters: {
    totalAuthData: (state) => state.authDataList.length,
  },
  actions: {
    addAuthData(reporter) {
      this.authDataList.unshift(reporter);
    },
  },
});

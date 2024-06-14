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
      },
      {
        login: "asd",
        password: "333",
        name: "Asd",
        surname: "asd",
        accessLvl: "User",
      },
      {
        login: "admin",
        password: "111",
        name: "Admin",
        surname: "Salohiddinov",
        accessLvl: "Admin",
      },
      {
        login: "ssss",
        password: "444",
        name: "sss",
        surname: "ssssss",
        accessLvl: "User",
      },
      {
        login: "admin2",
        password: "424",
        name: "admin2",
        surname: "Salohiddinov",
        accessLvl: "Admin",
      },
      {
        login: "abdusaid",
        password: "4444",
        name: "Abdusaid",
        surname: "Salohiddinov",
        accessLvl: "Admin",
      },
      {
        login: "maga",
        password: "123",
        name: "Maga",
        surname: "Salohiddinov",
        accessLvl: "User",
      },
      {
        login: "asd",
        password: "333",
        name: "Asd",
        surname: "asd",
        accessLvl: "User",
      },
      {
        login: "admin",
        password: "111",
        name: "Admin",
        surname: "Salohiddinov",
        accessLvl: "Admin",
      },
      {
        login: "ssss",
        password: "444",
        name: "sss",
        surname: "ssssss",
        accessLvl: "User",
      },
      {
        login: "admin2",
        password: "424",
        name: "admin2",
        surname: "Salohiddinov",
        accessLvl: "Admin",
      },
      {
        login: "abdusaid",
        password: "4444",
        name: "Abdusaid",
        surname: "Salohiddinov",
        accessLvl: "Admin",
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

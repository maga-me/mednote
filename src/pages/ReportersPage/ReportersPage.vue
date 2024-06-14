<!-- ParentComponent.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDataStore } from "../../stores/data.js";
import CardComponent from '@/components/Cards/ReporterCard/ReporterCard.vue';
import { useAuthDataStore } from "@/stores/login";

const router = useRouter();
const userDataInLS = ref(JSON.parse(localStorage.getItem("userData")));
const data = useDataStore();
const authData = useAuthDataStore()

const list = ref([]);
const passwordShow = ref(false);
const overlay = ref(false);

function checkLoginStatus() {
  if (!userDataInLS.value) {
    router.push("/login");
  } else if(userDataInLS.value.accessLvl == "User") {
    router.push("/patients");

  }
}

checkLoginStatus();

function getDetails() {
  list.value = data.reporterList;
}

onMounted(() => {
  userDataInLS.value = JSON.parse(localStorage.getItem("userData"));

  getDetails();
});

const firstName = ref('');
const lastName = ref('');
const phone = ref('');
const password = ref('');
const login = ref('');
const workplace = ref('');

function addRep() {
  if (firstName.value !== '' && lastName.value !== '' && phone.value !== '' && password.value !== '') {
    data.addReporter({
    id: data.reporterList.find((el) => el.id ),
    firstName: firstName.value,
    lastName: lastName.value,
    phone: phone.value,
    workplace: workplace.value,
    password: password.value,
    type: "reporter",
    accessLvl: "User"
  });
  authData.addAuthData({
    id: data.reporterList.find((el) => el.id ),
    firstName: firstName.value,
    lastName: lastName.value,
    phone: phone.value,
    login: login.value,
    workplace: workplace.value,
    password: password.value,
    type: "reporter",
    accessLvl: "User"
  });

  localStorage.setItem('authData', JSON.stringify(authData.authDataList))

  overlay.value = false;

  setTimeout(() => {
    firstName.value = ''
    lastName.value = ''
    phone.value = ''
    workplace.value = ''
    password.value = ''
  }, 500);
  }
}

const firstNameRules = [
  value => {
    if (value && value.length >= 3) return true;
    return "First name must be at least 3 characters.";
  }
];

const lastNameRules = [
  value => {
    if (/[^0-9]/.test(value)) return true;
    return "Last name can not contain digits.";
  }
];
</script>

<template>
  <section class="reporters">
    <div class="container">
      <h1 class="reporters__title">Shifokorlar</h1>

      <v-overlay v-model="overlay" class="reporters__overlay">
        <v-form class="reporters__form" fast-fail @submit.prevent="addRep">
          <v-text-field
            v-model="firstName"
            label="Ism"
            :rules="firstNameRules"
            class="reporters__inp reporters__fname"
          ></v-text-field>

          <v-text-field
            v-model="lastName"
            label="Familiya"
            :rules="lastNameRules"
            class="reporters__inp reporters__lname"
          ></v-text-field>

          <v-text-field
            v-model="phone"
            label="Telefon nomer"
            class="reporters__inp reporters__phone"
          ></v-text-field>

          <v-text-field
            v-model="login"
            label="Login"
            class="reporters__inp reporters__login"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Parol"
            class="reporters__inp reporters__password"
          ></v-text-field>

          <v-text-field
            v-model="workplace"
            label="Ish joyi"
            class="reporters__inp reporters__workplace"
          ></v-text-field>

          <v-btn class="mt-2" type="submit" block>Submit</v-btn>
        </v-form>
      </v-overlay>

      <v-btn @click="overlay = true" class="mb-2" :elevation="8" color="success">
        Shifokor qo'shish
      </v-btn>

      <ul class="reporters__list">
        <CardComponent
          v-for="(user, index) in list"
          :key="index"
          :user="user"
        />
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* Add your styles here */
</style>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useDataStore } from "../../stores/data.js";

const router = useRouter();
const userDataInLS = ref(JSON.parse(localStorage.getItem("userData")));
const data = useDataStore();

const list = ref([]);
const passwordShow = ref(false);
const overlay = ref(false);

function checkLoginStatus() {
  if (!userDataInLS.value) {
    router.push("/login");
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
const workplace = ref('');

function addRep() {
  if (firstName.value !== '' && lastName.value !== '' && phone.value !== '' && password.value !== '') {
    data.addReporter({
    id: new Date,
    firstName: firstName.value,
    lastName: lastName.value,
    phone: phone.value,
    workplace: workplace.value,
    password: password.value,
    // address: {
    //   street: "Nimedi",
    //   city: "Samarkand",
    //   district: "lOdadkoas",
    //   country: "UEA",
    // },
    type: "reporter",
  });

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
        <v-card
          v-for="(user, index) in list"
          :key="index"
          :elevation="8"
          class="reporters__item"
        >
          <div class="reporters__item-desc">
            <v-card-title class="text-overline reporters__item-title">
              Shifokor

              <p
                class="text-green-darken-3 text-h3 font-weight-bold reporters__item-fname"
              >
                {{ user?.firstName }}
              </p>

              <p
                class="text-h6 text-medium-emphasis font-weight-regular reporters__item-lname"
              >
                {{ user?.lastName }}
              </p>
            </v-card-title>
            <v-card-text class="reporters__item-box">
              <span
                class="text-green-darken-3 font-weight-medium reporters__item-phone"
              >
                Contact: <a :href="`tel:${user?.phone}`">{{ user?.phone }}</a>
              </span>

              <span class="reporters__item-password">
                Password:
                <b
                  :class="{ active: passwordShow }"
                  @click="passwordShow = !passwordShow"
                >
                  {{ user?.password }}
                </b>
              </span>
            </v-card-text>
          </div>

          <v-divider></v-divider>

          <v-list-item
            append-icon="mdi-chevron-right"
            lines="two"
            subtitle="Details and agreement"
            link
          ></v-list-item>
        </v-card>
      </ul>
    </div>
  </section>
</template>

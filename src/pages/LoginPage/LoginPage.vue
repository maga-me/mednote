<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthDataStore } from "@/stores/login"; 

const router = useRouter();
const authDataStore = useAuthDataStore();

const form = ref(false);
const email = ref("");
const password = ref("");
const loading = ref(false);
const loginMessage = ref("");
const visible = ref(false);

const requiredLogin = (v) => !!v || "Loginni kiriting";
const requiredPassword = (v) => !!v || "Parolni kiriting"; 

const onSubmit = async () => {
  if (!form.value) return;

  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    const user = findUser(email.value, password.value);

    if (user) {
      loginMessage.value = `Welcome back, ${user.name} ${user.surname}`;
      localStorage.setItem("userData", JSON.stringify(user));
      location.reload();
    } else {
      loginMessage.value = "Login or password is incorrect.";
    }
  }, 2000);
};

function findUser(login, password) {
  for (const user of authDataStore.authDataList) {
    if (user.login === login && user.password === password) {
      return user;
    }
  }
  return null;
}

const userDataInLS = JSON.parse(localStorage.getItem("userData"));

function checkLoginStatus() {
  if (userDataInLS) {
    router.push("/");
  }
}

onMounted(() => {
  checkLoginStatus();
});
</script>

<template>
  <section class="login" v-show="!userDataInLS">
    <v-sheet class="login__box">
      <v-card
        :elevation="5"
        class="mx-auto px-6 py-8 login__card"
        max-width="344"
      >

      <h1>Masdasd</h1>

        <v-card-title class="login__title">Kirish</v-card-title>
        <v-form v-model="form" class="login__form" @submit.prevent="onSubmit">
          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[requiredLogin]"
            class="mb-2 login__email"
            label="Login"
            placeholder="Loginni kiriting"
            clearable
          />
          <v-text-field
            v-model="password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            :readonly="loading"
            :rules="[requiredPassword]"
            label="Parol"
            placeholder="Parolni kiriting"
            clearable
            @click:append-inner="visible = !visible"
            class="login__password"
          />
          <br />
          <v-btn
            :disabled="!form"
            :loading="loading"
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            class="login__btn"
            block
          >
            Tizimga kiring
          </v-btn>
          <div v-if="loginMessage" class="login__message">
            {{ loginMessage }}
          </div>
        </v-form>
      </v-card>
    </v-sheet>
  </section>
</template>

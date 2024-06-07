<!-- <script setup>
import { ref, reactive } from 'vue';
// import {usersData} from '../../JSON/LoginUserDatas.js'

const usersData = [
    
    {
        login: "maga",
        password: "123",
        name: "Maga",
        surname: "Salohiddinov"

    },
    {
        login: "asd",
        password: "333",
        name: "Asd",
        surname: "asd"

    },
    {
        login: "admin",
        password: "111",
        name: "Admin",
        surname: "Salohiddinov"

    },
    {
        login: "ssss",
        password: "444",
        name: "sss",
        surname: "ssssss"

    },
    {
        login: "admin2",
        password: "424",
        name: "admin2",
        surname: "Salohiddinov"

    },
    

] // Placeholder for secure user data handling

console.log(usersData); // This would likely be removed in a real app

const form = ref(false);
const email = ref(null);
const password = ref(null);
const loading = ref(false);

const requiredLogin = (v) => !!v || 'Loginni kiriting'; // Clear and concise message
const requiredPassword = (v) => !!v || 'Parolni kiriting'; // Clear and concise message

const onSubmit = async () => { // Make async to handle potential asynchronous operations
  if (!form.value) return;

  loading.value = true;
  // Simulate loading (replace with actual login logic)
  setTimeout(() => {
    loading.value = false;
  }, 2000);

  // In a real app, you'd likely:
  // - Send login data to a server for authentication
  // - Handle successful/failed login attempts and display messages to the user
};

</script>

<template>
  <section class="login">
    <div class="login__box">
      <h1 class="login__title">Kirish</h1>

      <v-sheet class="bg-deep-purple pa-12" rounded>
        <v-card class="mx-auto px-6 py-8" max-width="344">
          <v-form v-model="form" @submit.prevent="onSubmit">
            <v-text-field v-model="email" :readonly="loading" :rules="[requiredLogin]" class="mb-2" label="Login" placeholder="Loginni kiriting" clearable />

            <v-text-field v-model="password" :readonly="loading" :rules="[requiredPassword]" label="Parol" placeholder="Parolni kiriting" clearable />

            <br />

            <v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit" variant="elevated" block>
              Tizimga kiring
            </v-btn>
          </v-form>
        </v-card>
      </v-sheet>
    </div>
  </section>
</template>

<style scoped>
/* Your styles here */
</style> -->

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const form = ref(false);
const email = ref(null);
const password = ref(null);
const loading = ref(false);
const loginMessage = ref('');

const visible = ref(false)

const requiredLogin = (v) => !!v || 'Loginni kiriting'; // Clear and concise message
const requiredPassword = (v) => !!v || 'Parolni kiriting'; // Clear and concise message

const onSubmit = async () => {
  if (!form.value) return;

  loading.value = true;

  // Simulate login logic (replace with actual API call)
  setTimeout(() => {
    loading.value = false;
    const user = findUser(email.value, password.value); // Call the findUser function

    if (user) {
      loginMessage.value = `Welcome back, ${user.name} ${user.surname}`;
      console.log(user);
      localStorage.setItem('userData', JSON.stringify(user));
      window.location.reload()

    } else {
      loginMessage.value = 'Login or password is incorrect.';
    }
  }, 2000);
};

const mockUsers = [
  
  {
      login: "maga",
      password: "123",
      name: "Maga",
      surname: "Salohiddinov",
      accessLvl: "User"
  },
  {
      login: "asd",
      password: "333",
      name: "Asd",
      surname: "asd",
      accessLvl: "User"
  },
  {
      login: "admin",
      password: "111",
      name: "Admin",
      surname: "Salohiddinov",
      accessLvl: "Admin"
  },
  {
      login: "ssss",
      password: "444",
      name: "sss",
      surname: "ssssss",
      accessLvl: "User"
  },
  {
      login: "admin2",
      password: "424",
      name: "admin2",
      surname: "Salohiddinov",
      accessLvl: "Admin"
  },
  {
      login: "abdusaid",
      password: "4444",
      name: "Abdusaid",
      surname: "Salohiddinov",
      accessLvl: "Admin"
  },

]
// Function to simulate user data lookup (replace with actual data source)
function findUser(login, password) {
  // In a real application, you'd fetch user data from a secure backend
  // This is just a placeholder for demonstration purposes

  for (const user of mockUsers) {
    if (user.login === login && user.password === password) {
      return user;
    }
  }

  return null;
}

const userDataInLS = JSON.parse(localStorage.getItem('userData'));

function checkLoginStatus() {

  if (userDataInLS) {
    router.push('/');
  }
}

checkLoginStatus();
</script>

<template>
  <section class="login" v-show="userDataInLS ? false : true">
    <v-sheet class="login__box">
      
      <v-card :elevation="5" class="mx-auto px-6 py-8 login__card" max-width="344">
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

            <v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit" variant="elevated" class="login__btn" block>
              Tizimga kiring
            </v-btn>

            <div v-if="loginMessage">{{ loginMessage }}</div>
          </v-form>
        </v-card>
    </v-sheet>
  </section>
</template>

<style scoped>
/* Your styles here */
</style>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDataStore } from "../../stores/data.js";
const router = useRouter();
const userDataInLS = ref(JSON.parse(localStorage.getItem("userData")));
const data = useDataStore();

const list = ref([]);
const passwordShow = ref(false)

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
</script>

<template>
  <section class="reporters">
    <div class="container">
      <h1 class="reporters__title">Shifokorlar</h1>

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
            <span class="text-green-darken-3 font-weight-medium reporters__item-phone">
             Contact: <a :href="`tel:${user?.phone}`">{{ user?.phone }}</a>
            </span>

            <span class="reporters__item-password">Password: <b :class="{active: passwordShow}" @click="passwordShow = !passwordShow">{{user?.password}}</b></span>
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

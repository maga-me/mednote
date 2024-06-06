<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDataStore } from "../../stores/data.js";
const router = useRouter();
const userDataInLS = ref(JSON.parse(localStorage.getItem("userData")));
const data = useDataStore();

const list = ref([]);


function checkLoginStatus() {
  if (!userDataInLS.value) {
    router.push("/login");
  }
}

checkLoginStatus();

function getDetails() {
  list.value = data.patientList;
}

onMounted(() => {
    userDataInLS.value = JSON.parse(localStorage.getItem("userData"));

  getDetails();
});
</script>

<template>
  <section class="patients">
    <div class="container">
      <h1 class="patients__title">Bemorlar</h1>

      <ul class="patients__list">

        <v-card
          v-for="(user, index) in list"
          :key="index"
          :elevation="8"
          class="patients__item"
        >
         <div class="patients__item-desc">
          <v-card-title class="text-overline patients__item-title">
            Bemor

            <p
              class="text-green-darken-3 text-h3 font-weight-bold patients__item-fname"
            >
              {{ user?.firstName }}
            </p>

            <p
              class="text-h6 text-medium-emphasis font-weight-regular patients__item-lname"
            >
              {{ user?.lastName }}
            </p>
          </v-card-title>
          <v-card-text class="patients__item-box">
            <span class="text-green-darken-3 font-weight-medium patients__item-phone">
             Contact: <a :href="`tel:${user?.phone}`">{{ user?.phone }}</a>
            </span>

            
          </v-card-text>

         </div>
<!-- 
         <v-card-title class="text-overline patients__item-title">
            Bemor

            <div
              class="text-green-darken-3 text-h3 font-weight-bold patients__item-fname"
            >
              {{ user?.firstName }}
            </div>

            <div
              class="text-h6 text-medium-emphasis font-weight-regular patients__item-lname"
            >
              {{ user?.lastName }}
            </div>
          </v-card-title>
          <v-card-text class="patients__item-box">
            <span class="text-green-darken-3 font-weight-medium patients__item-phone">
              {{ user?.phone }}
            </span>

            
          </v-card-text> -->

          <v-divider></v-divider>

          <v-list-item
            append-icon="mdi-chevron-right"
            lines="two"
            subtitle="To'liq ma'lumot uchun"
            link
          ></v-list-item>
        </v-card>
      </ul>
    </div>
  </section>
</template>

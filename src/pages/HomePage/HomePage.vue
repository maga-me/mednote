<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// import { useDataStore } from "../../stores/data.js";
const router = useRouter();
const userDataInLS = ref(JSON.parse(localStorage.getItem("userData")));
// const data = useDataStore();

// const list = ref([])

function checkLoginStatus() {
  if (!userDataInLS.value) {
    router.push("/login");
  }
}

checkLoginStatus();

function getDetails(lvl) {
  if (lvl == "admin") {
    router.push("/reporters");
    // list.value = data.reporterList;
  } else if (lvl == "user") {
    router.push("/patients");
    // list.value = data.patientList
  }
}

onMounted(() => {
  userDataInLS.value = JSON.parse(localStorage.getItem("userData"));

  if (userDataInLS?.value?.accessLvl == "Admin") {
    getDetails("admin");
  } else if (userDataInLS?.value?.accessLvl == "User") {
    getDetails("user");
  }
});
</script>

<template>
  <section class="home">
    <div class="container">
      <!-- <ul class="home__list">
        <v-card
          v-for="(user, index) in list"
          :key="index"
          :elevation="8"
          class="home__item"
        >
          <v-card-title class="text-overline home__item-title">
            {{ user?.type }}

            <div
              class="text-green-darken-3 text-h3 font-weight-bold home__item-fname"
            >
              {{ user?.firstname }}
            </div>

            <div
              class="text-h6 text-medium-emphasis font-weight-regular home__item-lname"
            >
              {{ user?.lastname }}
            </div>
          </v-card-title>
          <v-card-text>
            <span class="text-green-darken-3 font-weight-medium">
              {{ user?.phone }}
            </span>

            <span class="text-medium-emphasis"
              >Password: <b>{{ user?.password }}</b></span
            >
          </v-card-text>

          <v-divider></v-divider>

          <v-list-item
            append-icon="mdi-chevron-right"
            lines="two"
            subtitle="Details and agreement"
            link
          ></v-list-item>
        </v-card>
      </ul> -->
    </div>
  </section>
</template>

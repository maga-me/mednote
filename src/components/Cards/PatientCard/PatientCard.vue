<!-- PatientCard.vue -->
<template>
  <v-card :elevation="8" class="patients__card">
    <div class="patients__card-desc">
      <v-card-title class="text-overline patients__card-title">
        Bemor
        <p
          class="text-h5 font-weight-bold patients__card-fname"
        >
          {{ user?.firstName }}
        </p>
        <p
          class="text-h7 text-medium-emphasis font-weight-regular patients__card-lname"
        >
          {{ user?.lastName }}
        </p>
      </v-card-title>
      <v-card-text class="patients__card-box">
        <span
          class=" font-weight-medium patients__card-phone"
        >
          Contact: <a :href="`tel:${user?.phone}`">{{ user?.phone }}</a>
        </span>
      </v-card-text>
    </div>
    <v-divider></v-divider>
    <router-link :to="`/patients/patient/${user.id}`" class="a">
      <v-list-item
        append-icon="mdi-chevron-right"
        lines="two"
        subtitle="Details and agreement"
        link
        class="patients__card-link"
      ></v-list-item>
    </router-link>
  </v-card>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
  
.a {
  background-color: inherit; /* Or your desired background color */
  color: inherit;  
}

</style>
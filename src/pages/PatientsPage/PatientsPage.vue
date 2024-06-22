<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useDataStore } from "../../stores/data.js";
import { uz } from "date-fns/locale";
import "@vuepic/vue-datepicker/dist/main.css";

import VueDatePicker from "@vuepic/vue-datepicker";
import CardComponent from "@/components/Cards/PatientCard/PatientCard.vue";

const router = useRouter();
const userDataInLS = ref(JSON.parse(localStorage.getItem("userData")));
const data = useDataStore();

const list = ref([]);
const overlay = ref(false);

function checkLoginStatus() {
  if (!userDataInLS.value) {
    router.push("/login");
  } else if (userDataInLS.value.accessLvl == "Admin") {
    router.push("/reporters");
  }
}

onMounted(() => {
  userDataInLS.value = JSON.parse(localStorage.getItem("userData"));
  checkLoginStatus();
  getDetails();
});

watch(userDataInLS, () => {
  checkLoginStatus();
  getDetails();
});

function getDetails() {
  list.value = data.patientList.filter(el => el.doctorId === userDataInLS.value?.userId);
}

const firstName = ref("");
const lastName = ref("");
const middleName = ref("");
const dateOfBirth = ref("");
const phone = ref("");
const address = ref("");
const ambulatorCard = ref("");

function addPatient() {
  if (
    firstName.value !== "" &&
    lastName.value !== "" &&
    middleName.value !== "" &&
    dateOfBirth.value !== "" &&
    phone.value !== "" &&
    address.value !== "" &&
    ambulatorCard.value !== ""
  ) {
    data.addPatient({
      id: Date.now(),
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
      middleName: middleName.value,
      dateOfBirth: dateOfBirth.value,
      address: address.value,
      ambulatorCard: ambulatorCard.value,
      type: "patient",
      doctorId: userDataInLS.value?.userId,
    });
    getDetails()
    console.log(userDataInLS.value?.userId);
    overlay.value = false;

    setTimeout(() => {
      firstName.value = "";
      lastName.value = "";
      middleName.value = "";
      dateOfBirth.value = "";
      phone.value = "";
      address.value = "";
      ambulatorCard.value = "";
    }, 500);
  }
}

const requiredRule = (value) => value ? true : `Bu joyni to'ldiring`;

const numInputRules = [
  (value) => !isNaN(value) ? true : "Faqat raqam kiriting",
];

// Date Picker

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day > 9 ? day : "0" + day}.${month > 9 ? month : "0" + month}.${year}`;
};

const id = `dp-${Math.random().toString(36).substring(2, 10)}`;
const isFocused = ref(false);

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};
</script>

<template>
  <section class="patients" v-if="userDataInLS">
    <div class="container">
      <h1 class="patients__title">Bemorlar</h1>

      <v-overlay v-model="overlay" class="patients__overlay">
        <v-card class="patients__overlay-card" elevation="7">
          <v-form class="patients__form" fast-fail @submit.prevent="addPatient">
            <v-text-field
              v-model="firstName"
              label="Ism"
              :rules="[requiredRule]"
              class="patients__inp patients__fname"
              prepend-inner-icon="mdi-pencil"
              required
            ></v-text-field>

            <v-text-field
              v-model="lastName"
              label="Familiya"
              :rules="[requiredRule]"
              class="patients__inp patients__lname"
              prepend-inner-icon="mdi-pencil"
              required
            ></v-text-field>

            <v-text-field
              v-model="middleName"
              label="Otasining ismi"
              :rules="[requiredRule]"
              class="patients__inp patients__mname"
              prepend-inner-icon="mdi-pencil"
              required
            ></v-text-field>

            <div class="patients__date-picker_wrapper">
              <label
                :for="id"
                class="patients__date-picker_label"
                :class="{ 'label-active': isFocused || dateOfBirth }"
              >
                Tug'ilgan kun, oy, yil
              </label>
              <VueDatePicker
                v-model="dateOfBirth"
                :format="format"
                :format-locale="uz"
                class="patients__date-picker"
                cancel-text="Bekor qilish"
                select-text="Saqlash"
                :id="id"
                required
                @focus="handleFocus"
                @blur="handleBlur"
                :rules="[requiredRule]"
              ></VueDatePicker>
            </div>

            <v-text-field
              v-model="address"
              label="Manzil"
              :rules="[requiredRule]"
              class="patients__inp patients__address"
              prepend-inner-icon="mdi-map-marker"
              required
            ></v-text-field>

            <v-text-field
              v-model="phone"
              label="Telefon nomer"
              :rules="[requiredRule, ...numInputRules]"
              class="patients__inp patients__phone"
              required
            >
              <template v-slot:prepend-inner>
                <img
                  src="@/assets/images/call.svg"
                  alt="icon"
                  class="custom-icon"
                />
              </template>
            </v-text-field>

            <v-text-field
              v-model="ambulatorCard"
              label="Ambulator raqam"
              :rules="[requiredRule, ...numInputRules]"
              class="patients__inp patients__ambulatorCard"
              required
            >
              <template v-slot:prepend-inner>
                <img
                  src="@/assets/images/num3.svg"
                  alt="icon"
                  class="custom-icon"
                />
              </template>
            </v-text-field>

            <v-btn class="mt-2 elevation-3" color="success" type="submit" block>
              Bemorni qo'shish
            </v-btn>
          </v-form>
        </v-card>
      </v-overlay>

      <v-btn
        @click="overlay = true"
        class="mb-2"
        :elevation="8"
        color="success"
      >
        Bemor qo'shish
      </v-btn>

      <ul class="patients__list">
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
#dp {
  z-index: 999;
  background: #fff;
}

.patients__form {
  z-index: 998;
}
</style>
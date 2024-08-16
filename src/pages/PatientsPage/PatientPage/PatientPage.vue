<script setup>
import { ref, onMounted, computed, watch, defineProps } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import Print from "@/components/Modals/Print/Print.vue";
import { uz } from "date-fns/locale";
import { useRoute } from "vue-router";
import { useDataStore } from "../../../stores/data.js";
import "@vuepic/vue-datepicker/dist/main.css";

const router = useRoute();
const dataStore = useDataStore();
// const props = defineProps()
const userData = JSON.parse(localStorage.getItem("userData"));

const patient = computed(() => dataStore.patientData);
const edit = ref(false);
const submitLoading = ref(false);
const submitBool = ref(false);
const overlay = ref(false);

const firstName = ref("");
const lastName = ref("");
const middleName = ref("");
const dateOfBirth = ref("");
const address = ref("");
const phone = ref("");
const ambulatorCard = ref("");

const informations = ref({
  id: patient.value.id,
  firstName: firstName.value,
  lastName: lastName.value,
  middleName: middleName.value,
  dateOfBirth: dateOfBirth.value,
  address: address.value,
  phone: phone.value,
  ambulatorCard: ambulatorCard.value,
});

// print

const returnDate = ref(null);
const comment = ref("");

const recommendations = ref([]);
const newRecommendation = ref("");

const addRecommendation = () => {
  if (newRecommendation.value.trim() !== "") {
    // emit("newRecommendation", newRecommendation.value.trim())
    recommendations.value.push(newRecommendation.value.trim());

    // addRec

    newRecommendation.value = "";
  }
};

const delRecommendation = (chipIdx) => {
  // alert(chipIdx);
  recommendations.value.splice(chipIdx, 1);
};

// print

onMounted(() => {
  const fullPath = router.fullPath;
  const segments = fullPath.split("/");
  const id = segments[segments.length - 1];
  dataStore.findPatientById(id, userData.userId);
});

const load = ref(true);

function loading() {
  load.value = false;
}

function resetPatientData() {
  firstName.value = patient.value?.firstName || "";
  lastName.value = patient.value?.lastName || "";
  middleName.value = patient.value?.middleName || "";
  dateOfBirth.value = patient.value?.dateOfBirth || "";
  address.value = patient.value?.address || "";
  phone.value = patient.value?.phone || "";
  ambulatorCard.value = patient.value?.ambulatorCard || "";

  informations.value = {
    id: patient.value.id,
    firstName: firstName.value,
    lastName: lastName.value,
    middleName: middleName.value,
    dateOfBirth: dateOfBirth.value,
    address: address.value,
    phone: phone.value,
    ambulatorCard: ambulatorCard.value,
  };
}

function toggleEdit(type, func) {
  if (type === "edit") {
    edit.value = true;
  } else if (type === "cancel") {
    edit.value = false;
    resetPatientData();
    submitBool.value = false;
  } else if (type === "cancel" && func === "submitted") {
    edit.value = false;
    submitBool.value = false;
  }
}

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day > 9 ? day : "0" + day}.${
    month > 9 ? month : "0" + month
  }.${year}`;
};

function submit() {
  if (
    submitBool.value &&
    firstName.value !== "" &&
    lastName.value !== "" &&
    middleName.value !== "" &&
    dateOfBirth.value !== "" &&
    phone.value !== "" &&
    address.value !== "" &&
    ambulatorCard.value !== ""
  ) {
    submitLoading.value = true;
    dataStore.patchPatient({
      id: patient.value.id,
      firstName: firstName.value,
      lastName: lastName.value,
      middleName: middleName.value,
      dateOfBirth: dateOfBirth.value,
      address: address.value,
      phone: phone.value,
      ambulatorCard: ambulatorCard.value,
    });
    toggleEdit("cancel", "submitted");

    setTimeout(() => {
      submitLoading.value = false;
    }, 1000);
  }
}

function sameChecker() {
  submitBool.value =
    firstName.value !== patient.value.firstName ||
    lastName.value !== patient.value.lastName ||
    middleName.value !== patient.value.middleName ||
    dateOfBirth.value !== patient.value.dateOfBirth ||
    address.value !== patient.value.address ||
    phone.value !== patient.value.phone ||
    ambulatorCard.value !== patient.value.ambulatorCard;
}

watch(patient, (newVal) => {
  if (newVal) {
    loading();
    resetPatientData();
    sameChecker();
  }
});

// watch(returnDate.value, (newVal) => {
//   if (newVal) {

//   }
// });

watch(
  [firstName, lastName, middleName, dateOfBirth, address, phone, ambulatorCard],
  sameChecker,
  { deep: true }
);

watch(submitLoading, (val) => {
  if (!val) return;

  setTimeout(() => {
    submitLoading.value = false;
  }, 2000);
});

const reports = computed(() => {
  const patientDetail = dataStore.patientDetails.find(
    (detail) => detail.id === patient.value.id
  );
  return patientDetail ? patientDetail.reports : [];
});

const getNextId = () => {
  const lastReport = reports.value[reports.value.length - 1];
  return lastReport ? lastReport.id + 1 : 1;
};

function addReport() {
  // const newId = getNextId();
  // const getDate = new Date;
  // console.log(getDate);
  // const newReport = {
  //   id: newId,
  //   date: format(getDate),
  //   returnDate: "17/06/2024",
  //   link: "https://maga-sv.netlify.app",
  // };

  // dataStore.patchPatientReports(patient.value.id, newReport);
  overlay.value = true;
}

// Date Picker

const id = `dp-${Math.random().toString(36).substring(2, 10)}`;
const isFocused = ref(false);

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};

// Draggable

const updateRecommendations = (newRecommendations) => {
  recommendations.value = newRecommendations;
};

// Draggable

// PrintChil component

const printComponentRef = ref(null);

const printChildComponent = () => {
  // const printArea = printComponentRef.value.$el; // Access the child's DOM element
  // const originalContents = document.body.innerHTML;

  // document.body.innerHTML = printArea.innerHTML;
  window.print();
  // document.body.innerHTML = originalContents;
};

// PrintChil component
</script>

<template>
  <v-overlay
    v-model="overlay"
    class="print__module--overlay"
    @click="overlay = false"
  >
    <div class="print__module">
      <div class="print__module-edit component" @click.stop>
        <h2 class="print__title">Hisobotni tahrirlash</h2>
        <div class="add-recommendation">
          <v-text-field
            label="Тавсия киритинг"
            variant="outlined"
            clearable
            v-model="newRecommendation"
            aria-required
            @keyup.enter="addRecommendation"
          />
          <v-btn elevation="1" color="success" @click="addRecommendation"
            >Қўшиш</v-btn
          >
          <!-- <ul>
            <li>
              <v-chip
                v-for="(chip, idx) in recommendations"
                :key="idx"
                class="ma-2"
                append-icon="mdi-close"
                color="error"
                @click="delRecommendation(idx)"
              >
                {{ chip }}
              </v-chip>
            </li>
          </ul> -->
        </div>
        <br />
        <v-textarea
          label="Izoh киритинг"
          variant="outlined"
          v-model="comment"
        ></v-textarea>

        <div class="print__date-picker_wrapper">
          <label
            :for="id"
            class="print__date-picker_label"
            :class="{ 'label-active': isFocused || returnDate }"
          >
            Кайта кўрик
          </label>
          <VueDatePicker
            v-model="returnDate"
            :format="format"
            :format-locale="uz"
            class="print__date-picker"
            cancel-text="Bekor qilish"
            select-text="Saqlash"
            :id="id"
            required
            @focus="handleFocus"
            @blur="handleBlur"
            :class="{ isFocused: isFocused }"
          ></VueDatePicker>
        </div>

        <v-btn @click="printChildComponent" color="success">Print</v-btn>
      </div>

      <Print
        class="print__module-print component"
        ref="printComponentRef"
        :recommendations="recommendations"
        :informations="informations"
        :returnDate="returnDate"
        :comment="comment"
        @delRecommendation="delRecommendation"
        @update-recommendations="updateRecommendations"
        @click.stop
      />

      <!-- <Print
        class="print__module-print component"
        :recommendations="recommendations"
        @delRecommendation="delRecommendation"
        @update:recommendations="updateRecommendations"
        @click.stop
      /> -->
    </div>
  </v-overlay>

  <section v-if="load">Loading...</section>
  <section class="patient" v-show="dataStore ? true : false" v-else>
    <div class="container">
      <h1 class="patient__title">Bemorning sahifasi - {{ firstName }}</h1>

      <v-sheet class="patient__edit-sheet">
        <v-btn
          class="patient__edit-btn elevation-5"
          :color="edit == false ? 'success' : 'error'"
          :variant="edit == false ? 'tonal' : 'border'"
          @click="toggleEdit(edit == false ? 'edit' : 'cancel')"
        >
          {{ edit == false ? "Tahrirlash" : "Bekor qilish" }}
        </v-btn>
      </v-sheet>

      <v-form @submit.prevent="submit" class="patient__form">
        <v-row>
          <v-col cols="12" sm="2">
            <v-text-field
              label="Ism"
              v-model="firstName"
              variant="solo"
              class="patient__input-field"
              :readonly="!edit"
              required
              :rules="[() => !!firstName || `Bu joyni to'ldiring`]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              label="Familiya"
              v-model="lastName"
              variant="solo"
              class="patient__input-field"
              :readonly="!edit"
              required
              :rules="[() => !!lastName || `Bu joyni to'ldiring`]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              label="Otasining ismi"
              v-model="middleName"
              variant="solo"
              class="patient__input-field"
              :readonly="!edit"
              required
              :rules="[() => !!middleName || `Bu joyni to'ldiring`]"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="2" class="patient__col">
            <v-card for="dp" :elevation="2" class="patient__card">
              <label for="dp" class="patient__label"
                >Tug'ilgan kun, oy, yil</label
              >
              <VueDatePicker
                v-model="dateOfBirth"
                :format="format"
                :format-locale="uz"
                class="patient__date-picker"
                cancel-text="Bekor qilish"
                select-text="Saqlash"
                id="dp"
                :readonly="!edit"
                required
              ></VueDatePicker>
            </v-card>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              label="Ambulator raqam"
              v-model="ambulatorCard"
              variant="solo"
              class="patient__input-field"
              :readonly="!edit"
              required
              :rules="[() => !!ambulatorCard || `Bu joyni to'ldiring`]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              label="Manzil"
              v-model="address"
              variant="solo"
              class="patient__input-field"
              :readonly="!edit"
              required
              :rules="[() => !!address || `Bu joyni to'ldiring`]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              label="Telefon raqam"
              v-model="phone"
              variant="solo"
              class="patient__input-field"
              :readonly="!edit"
              required
              :rules="[() => !!phone || `Bu joyni to'ldiring`]"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn
              :loading="submitLoading"
              :disabled="!submitBool || submitLoading"
              @click="submit"
              class="patient__submit-btn"
              color="success"
            >
              Saqlash
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <div class="patient__reports">
        <h2 class="patient__reports-title">Hisobotlar</h2>

        <v-sheet class="patient__reports-sheet">
          <v-btn class="patient__reports-btn" @click="addReport" color="success"
            >Hisobot qoshish</v-btn
          >
        </v-sheet>

        <v-table class="patient__reports-table">
          <thead>
            <tr>
              <th class="text-left">Sana</th>
              <th class="text-left">Qaytish sanasi</th>
              <th class="text-left">To'liq Ma'lumot</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="report in reports" :key="report.id">
              <td>{{ report.date }}</td>
              <td>{{ report.returnDate }}</td>
              <td><a :href="report.link" target="_blank">Link</a></td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
#dp {
  z-index: 98;
  background: #fff;
}
</style>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { uz } from 'date-fns/locale';
import { useRoute } from 'vue-router';
import { useDataStore } from '../../../stores/data.js';

const router = useRoute();
const dataStore = useDataStore();

const patient = computed(() => dataStore.patientData);
const edit = ref(false);
const submitLoading = ref(false);
const submitBool = ref(false);

const firstName = ref('');
const lastName = ref('');
const middleName = ref('');
const dateOfBirth = ref('');
const address = ref('');
const phone = ref('');
const ambulatorCard = ref('');

onMounted(() => {
  const fullPath = router.fullPath;
  const segments = fullPath.split('/');
  const id = segments[segments.length - 1];
  dataStore.findPatientById(id);
});

const load = ref(true);

function loading() {
  load.value = false;
}

function resetPatientData() {
  firstName.value = patient.value?.firstName || '';
  lastName.value = patient.value?.lastName || '';
  middleName.value = patient.value?.middleName || '';
  dateOfBirth.value = patient.value?.dateOfBirth || '';
  address.value = patient.value?.address || '';
  phone.value = patient.value?.phone || '';
  ambulatorCard.value = patient.value?.ambulatorCard || '';
}

function toggleEdit(type, func) {
  if (type === 'edit') {
    edit.value = true;
  } else if (type === 'cancel') {
    edit.value = false;
    resetPatientData();
    submitBool.value = false; // Reset submitBool on cancel
  } else if (type === 'cancel' && func === 'submitted') {
    edit.value = false;
    submitBool.value = false; // Reset submitBool after submission
  }
}

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day > 9 ? day : '0' + day}.${
    month > 9 ? month : '0' + month
  }.${year}`;
};

function submit() {
  if (
    submitBool.value &&
    firstName.value !== '' &&
    lastName.value !== '' &&
    middleName.value !== '' &&
    dateOfBirth.value !== '' &&
    phone.value !== '' &&
    address.value !== '' &&
    ambulatorCard.value !== ''
  ) {
    submitLoading.value = true;
    dataStore
      .patchPatient({
        id: patient.value.id,
        firstName: firstName.value,
        lastName: lastName.value,
        middleName: middleName.value,
        dateOfBirth: dateOfBirth.value,
        address: address.value,
        phone: phone.value,
        ambulatorCard: ambulatorCard.value,
      });
    toggleEdit('cancel', 'submitted');

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

// Watch for changes in patient data and input fields
watch(patient, (newVal) => {
  if (newVal) {
    loading();
    resetPatientData();
    sameChecker(); // Initial check if values are different
  }
});

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
</script>

<template>
  <section v-if="load">Loading...</section>
  <section class="patient" v-else>
    <div class="container">
      {{ patient }}
      <br />
      {{ dataStore.patientList }}
      <h1 class="patient__title">Bemorning sahifasi - {{ firstName }}</h1>

      <v-sheet class="patient__edit-sheet">
        <v-btn
          class="patient__edit-btn elevation-5"
          :color="edit == false ? 'success' : 'error'"
          :variant="edit == false ? 'tonal' : 'border'"
          @click="toggleEdit(edit == false ? 'edit' : 'cancel')"
        >
          {{ edit == false ? 'Tahrirlash' : 'Bekor qilish' }}
        </v-btn>
      </v-sheet>

      <v-form @submit.prevent="submit" class="patient__form`">
        <v-row>
          <v-col cols="12" sm="6">
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
          <v-col cols="12" sm="6">
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
          <v-col cols="12" sm="6">
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

          <v-col cols="12" sm="6" class="patient__col">
            <v-card for="dp" :elevation="2" class="patient__card">
              <label for="dp" class="patient__label">Tug'ilgan kun, oy, yil</label>
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
          <v-col cols="12" sm="6">
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
          <v-col cols="12" sm="6">
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
          <v-col cols="12" sm="6">
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

        <v-table fixed-header>
          <thead>
            <tr>
              <th class="text-left">Date</th>
              <th class="text-left">Return Date</th>
              <th class="text-left">Link</th>
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

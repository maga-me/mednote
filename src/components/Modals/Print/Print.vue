<script setup>
import { ref, defineProps, watch, defineEmits, computed, onMounted, reactive } from "vue";
import draggable from "vuedraggable";
const emit = defineEmits(["update-recommendations"]);

// const format = (date) => {
//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();

//   return `${day > 9 ? day : "0" + day}.${
//     month > 9 ? month : "0" + month
//   }.${year}`;
// };

const format = (date) => {
  const parsedDate = new Date(date); // Ensure date is correctly parsed
  const day = parsedDate.getDate();
  const month = parsedDate.getMonth() + 1;
  const year = parsedDate.getFullYear();

  return `${day > 9 ? day : "0" + day}.${month > 9 ? month : "0" + month}.${year}`;
};

// const recommendations = ref([]);
const props = defineProps({
  recommendations: {
    type: Array,
    required: true,
  },
  informations: {
    type: Object,
    required: true,
  },
  returnDate: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  }
});

// const fio = ref(`ads`)
const fio = ref(`${props.informations.lastName} ${props.informations.firstName} ${props.informations?.middleName}`)
const date = ref(format(new Date));
const dateOfBirth  = ref(format(new Date(props.informations.dateOfBirth))); 
// const dateOfBirth  = ref("asd"); 
const phoneNumber = ref(props.informations.phone);
// const phoneNumber = ref("asd");
const address = ref(props.informations.address);
// const address = ref("asd");

const recommendations = ref(props.recommendations);
// const recommendations = ref("asd");

const comment = ref(props.comment);
// const comment = ref("");

const returnDate = ref();

const hoveredIdx = ref(null);

watch(
  () => recommendations.value,
  (newVal) => {
    emit("update-recommendations", newVal);
  }
);
watch(
  () => props.returnDate,
  (newReturnDate) => {
    if(newReturnDate) {

      returnDate.value = format(newReturnDate)
    }
  }
);

watch(
  () => props.comment,
  (newComment) => {
    if(newComment) {
      comment.value = newComment
    } else if(newComment == '') {
      comment.value = ''
    }
  }
  );
  

</script>

<template>
  <div class="print">
    <div class="container">
      <table>
        <thead>
          <tr>
            <th>ФИО</th>
            <td colspan="4">
              {{ fio }}
            </td>
          </tr>
          <tr>
            <th>Сана</th>
            <th>Туғилган йили</th>
            <th>Тел рақам</th>
            <th>Манзил</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ date }}</td>
            <td>{{ dateOfBirth }}</td>
            <td>{{ phoneNumber }}</td>
            <td>{{ address }}</td>
          </tr>
        </tbody>
      </table>
      <div class="recommendations" v-if="recommendations.length">
        <h3>ТАВСИЯ бемор учун</h3>
        <table>
          <tbody>
            <draggable
              v-model="recommendations"
              item-key="index"
              class="drag-list"
              ghost-class="ghost"
              style="overflow: hidden"
            >
              <template
                style="width: 100%; overflow: hidden"
                #item="{ element, index }"
              >
                <tr :class="{ hovered: hoveredIdx === index }" class="recommendation">
                  <td>{{ index + 1 }}</td>
                  <td>
                    {{ element }}
                  </td>

                  <!-- <td>
                  </td> -->

                  <div class="recommendation__tab">
                    <v-btn
                      elevation="0"
                      class="recommendation__tab-drag--btn"
                      icon="mdi-drag"
                    >
                    </v-btn>
                    <v-btn
                      elevation="0"
                      class="recommendation__tab-del--btn"
                      icon="mdi-delete-outline"
                      @mouseover="hoveredIdx = index"
                      @mouseleave="hoveredIdx = null"
                      @click="$emit('delRecommendation', index)"
                    >
                    </v-btn>
                  </div>
                </tr>
              </template>
            </draggable>
          </tbody>
        </table>
      </div>

      <div class="comment" v-if="comment">
        <h3 class="comment__title">Изох</h3>
        <p class="comment__txt">{{ comment }}</p>
      </div>

      <div class="return-visit">
        <h3 class="return-visit__title">Қайта кўрик</h3>
        <div class="return-visit__date">{{ returnDate }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.buttons {
  margin-top: 35px;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.not-draggable {
  cursor: grab;
}
</style>

<!--  -->

<!-- <template>
  <section class="print">
    <div class="container">
      <h2 class="print__title">Hisobotni tahrirlash</h2>
      <div class="add-recommendation">
        <v-text-field
          label="Тавсия киритинг"
          variant="outlined"
          clearable
          v-model="newRecommendation"
          aria-required
        />
        <v-btn elevation="1" color="success" @click="addRecommendation"
          >Қўшиш</v-btn
        >
      </div>
      <br />
      <v-textarea label="Izoh киритинг" variant="outlined"></v-textarea>

      <div class="print__date-picker_wrapper">
        <label
          :for="id"
          class="print__date-picker_label"
          :class="{ 'label-active': isFocused || returnDate }"
        >
          Tug'ilgan kun, oy, yil
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
          :rules="[requiredRule]"
        ></VueDatePicker>
      </div>
    </div>

    <div class="container">
      <table>
        <thead>
          <tr>
            <th>ФИО</th>
            <td colspan="4">
              {{ fio }}
            </td>
          </tr>
          <tr>
            <th>Сана</th>
            <th>Туғилган йили</th>
            <th>Тел рақам</th>
            <th>Манзил</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ date }}</td>
            <td>{{ dateOfBirth }}</td>
            <td>{{ phoneNumber }}</td>
            <td>{{ address }}</td>
          </tr>
        </tbody>
      </table>
      <div class="recommendations" v-if="recommendations.length">
        <h3>ТАВСИЯ бемор учун</h3>
        <table>
          <tbody>
            <tr v-for="(recommendation, index) in recommendations" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ recommendation }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="return-visit">Қайта кўрик</div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

import "@vuepic/vue-datepicker/dist/main.css";
import { uz } from "date-fns/locale";

import VueDatePicker from "@vuepic/vue-datepicker";

// Date Picker

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day > 9 ? day : "0" + day}.${
    month > 9 ? month : "0" + month
  }.${year}`;
};

const id = `dp-${Math.random().toString(36).substring(2, 10)}`;
const isFocused = ref(false);
const returnDate = ref(null);

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};

const fio = ref("Salohiddinov Muhammadaziz Jahongir o'g'li");

const date = ref("31.07.2024");
const dateOfBirth = ref("12.04.2008");
const phoneNumber = ref("+998900929477");
const address = ref("Chilanzar 16-25-16");

const recommendations = ref([]);
const newRecommendation = ref("");

const addRecommendation = () => {
  if (newRecommendation.value.trim() !== "") {
    recommendations.value.push(newRecommendation.value.trim());
    newRecommendation.value = "";
  }
};

const requiredRule = [(v) => !!v || "Required"];
</script>

<style scoped>
.print__date-picker_wrapper {
  position: relative;
  margin-top: 20px;
}

.print__date-picker_label {
  position: absolute;
  top: -1.5em;
  left: 0;
  transition: all 0.2s;
  pointer-events: none;
}

.print__date-picker_label.label-active {
  top: -2.5em;
  font-size: 0.75em;
}

.print__date-picker {
  width: 100%;
}

.print__title {
  text-align: center;
  margin-bottom: 20px;
}

.add-recommendation {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
  height: 62px;
}

.recommendations {
  margin-top: 20px;
}

.return-visit {
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
}

.container {
  width: 50%;
  font-family: "Times New Roman", Times, serif;
}

.container:nth-last-of-type(1) {
  border: 1px solid #000;
  padding: 0;
  margin-left: 10px;
  overflow-y: auto;
}

.container:nth-last-of-type(2) {
  margin-right: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  border: 1px solid #000;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

.recommendations table {
  width: 100%;
  border-collapse: collapse;
}

.recommendations td {
  border: 1px solid #000;
  padding: 8px;
  text-align: center;
}

.recommendations td:nth-last-child(1) {
  text-align: start;
}

.recommendations td:first-child {
  width: 50px;
}
</style> -->

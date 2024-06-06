<script setup>
import LogoutIcon from "@/components/icones/LogoutIcon.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const overlay = ref(false);
const userData = JSON.parse(localStorage.getItem("userData"))

function logout() {
  overlay.value = false;

  if (userData) {
    localStorage.removeItem("userData");
    window.location.reload()
  }
}

</script>

<template>
  <header class="header">
    <nav class="nav">
      <div class="container">
        <router-link to="/" class="nav__logo">Mednote</router-link>

        <!-- <router-link to="/login" class="nav__logo"></router-link> -->

        <div class="nav__logout" v-show="userData ? true : false">
          <v-btn class="nav__logout-btn" @click="overlay = !overlay"
            ><span>Chiqish</span> <LogoutIcon
          /></v-btn>

          <v-overlay v-model="overlay" class="nav__logout-overlay">
            <v-card variant="default" class="nav__logout-bar">
              <h5 class="nav__logout-bar--title">Chiqish</h5>

              <p class="nav__logout-bar--txt">Siz chiqishni xohlaysizmi?</p>

              <div class="nav__logout-bar__btns">
                <v-btn
                  class="nav__logout-bar--btn nav__logout-bar--btn-cancel"
                  variant="text"
                  ><span @click="overlay = false">Bekor qilish</span></v-btn
                >
                <v-btn
                  class="nav__logout-bar--btn nav__logout-bar--btn-ok"
                  variant="tonal"
                  color="error"
                  @click="logout"
                  ><span>Chiqish</span></v-btn
                >
              </div>
            </v-card>
          </v-overlay>
        </div>
      </div>
    </nav>
  </header>
</template>

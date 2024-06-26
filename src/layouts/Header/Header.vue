<script setup>
import LogoutIcon from "@/components/icones/LogoutIcon.vue";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const overlay = ref(false);
const userData = ref(JSON.parse(localStorage.getItem("userData")));

onMounted(() => {
  reRouting();
});

watch(router.currentRoute, () => {
  reRouting();
});

watch(userData, () => {
  reRouting();
});

function logout() {
  overlay.value = false;

  if (userData.value) {
    localStorage.removeItem("userData");
    userData.value = null;
    
    setTimeout(() => {
      location.reload();
      router.push("/login");
    }, 300);
  }
}

function reRouting() {
  const fullPath = router.currentRoute.value.fullPath;

  if (userData.value) {
    if (router.currentRoute.value.path === "/login") {
      router.push("/");
    }
  } else {
    if (fullPath && fullPath.startsWith("/patients/patient")) {
      router.push("/login");
    }
  }
}
</script>

<template>
  <header class="header elevation-5">
    <nav class="nav">
      <div class="container">
        <router-link to="/" class="nav__logo">Mednote</router-link>

        <div class="nav__logout" v-show="userData">
          <v-btn class="nav__logout-btn" :elevation="8" @click="overlay = true">
            <span>Chiqish</span>
            <LogoutIcon />
          </v-btn>

          <v-overlay v-model="overlay" class="nav__logout-overlay">
            <v-card variant="default" class="nav__logout-bar">
              <h5 class="nav__logout-bar--title">Chiqish</h5>

              <p class="nav__logout-bar--txt">Siz chiqishni xohlaysizmi?</p>

              <div class="nav__logout-bar__btns">
                <v-btn
                  class="nav__logout-bar--btn nav__logout-bar--btn-cancel"
                  variant="text"
                  @click="overlay = false"
                >
                  <span>Bekor qilish</span>
                </v-btn>
                <v-btn
                  class="nav__logout-bar--btn nav__logout-bar--btn-ok"
                  variant="tonal"
                  color="error"
                  @click="logout"
                >
                  <span>Chiqish</span>
                </v-btn>
              </div>
            </v-card>
          </v-overlay>
        </div>
      </div>
    </nav>
  </header>
</template>

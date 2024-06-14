import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage/HomePage.vue";
import LoginPage from "../pages/LoginPage/LoginPage.vue";
import ReportersPage from "../pages/ReportersPage/ReportersPage.vue";
import PatientsPage from "../pages/PatientsPage/PatientsPage.vue";
import PatientPage from "../pages/PatientsPage/PatientPage/PatientPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/reporters",
      name: "reporters",
      component: ReportersPage,
    },
    {
      path: "/patients",
      name: "patients",
      component: PatientsPage,
      // children: [
        
      // ],
    },
    {
      path: "/patients/patient/:id", // Dynamic route for patient page with id parameter
      name: "patient", // Name for the route
      component: PatientPage,
      props: true,
    },
  ],
});

export default router;

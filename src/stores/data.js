import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => ({
    patientList: [
      {
        id: 1,
        firstName: "Madeleine",
        lastName: "Figueroa",
        middleName: "Niamh",
        dateOfBirth: "2008-04-12T12:30:00Z",
        address: "Tashkent",
        phone: "+998976554321",
        ambulatorCard: "N12345",
        type: "patient",
        doctorId: 1,
      },
      {
        id: 2,
        firstName: "O'Doherty",
        lastName: "Kathleen",
        middleName: "Riggs",
        dateOfBirth: "2003-06-13T12:30:00Z",
        address: "Tashkent",
        phone: "+998976554321",
        ambulatorCard: "N12345",
        type: "patient",
        doctorId: 3,
      },
      {
        id: 3,
        firstName: "Henri",
        lastName: "Merrill",
        middleName: "Kayne",
        dateOfBirth: "2008-01-14T12:30:00Z",
        address: "Tashkent",
        phone: "+998976554321",
        ambulatorCard: "N12345",
        type: "patient",
        doctorId: 4,
      },
      {
        id: 4,
        firstName: "Elaine",
        lastName: "Stokes",
        middleName: "Glenn",
        dateOfBirth: "2008-10-30T12:30:00Z",
        address: "Tashkent",
        phone: "+998976554321",
        ambulatorCard: "N12345",
        type: "patient",
        doctorId: 2,
      },
      {
        id: 5,
        firstName: "Muhamadaziz",
        lastName: "Salohiddinov",
        middleName: "Jahongir o'gli",
        dateOfBirth: "2008-04-12T12:30:00Z",
        address: "Tashkent",
        phone: "+998900929477",
        ambulatorCard: "N0002",
        type: "patient",
        doctorId: 4,
      },
      {
        id: 6,
        firstName: "FFFF",
        lastName: "LLL",
        middleName: "MMMM",
        dateOfBirth: "2008-10-30T12:30:00Z",
        address: "Tashkent",
        phone: "+998976554321",
        ambulatorCard: "N12345",
        type: "patient",
        doctorId: 2,
      },
    ],
    reporterList: [
      {
        id: 1,
        firstName: "Maga",
        lastName: "Salohiddinov",
        phone: "+998976554321",
        workplace: "test workplace",
        password: "12345",
        address: "Tashkent",
        type: "reporter",
      },
      {
        id: 2,
        firstName: "Bonilla",
        lastName: "Coffman",
        phone: "+998976554321",
        workplace: "test workplace",
        password: "12345",
        address: "Tashkent",
        type: "reporter",
      },
      {
        id: 3,
        firstName: "Souza",
        lastName: "Bentley",
        phone: "+998976554321",
        workplace: "test workplace",
        password: "12345",
        address: "Tashkent",
        type: "reporter",
      },
      {
        id: 4,
        firstName: "Pagan",
        lastName: "Yang",
        phone: "+998976554321",
        workplace: "test workplace",
        password: "12345",
        address: "Tashkent",
        type: "reporter",
      },
      {
        id: 5,
        firstName: "Maga",
        lastName: "Salohiddinov",
        phone: "+998976554321",
        workplace: "test workplace",
        password: "12345",
        address: "Tashkent",
        type: "reporter",
      },
      {
        id: 6,
        firstName: "AAA",
        lastName: "BBB",
        phone: "+998976554321",
        workplace: "test workplace",
        password: "12345",
        address: "Tashkent",
        type: "reporter",
      },
    ],
    patientData: {},
    patientDetails: [
      {
        id: 1,
        // firstName: "test",
        // lastName: "test",
        // middleName: "test",
        // dateOfBirth: 2020,
        // address: "Samarkand",
        // phone: "+998976554321",
        // ambulatorCard: "N12345",
        reports: [
          {
            id: 1,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: "",
          },
          {
            id: 2,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: "",
          },
        ],
      },
      {
        id: 2,
        // firstName: "test",
        // lastName: "test",
        // middleName: "test",
        // dateOfBirth: 2020,
        // address: "Samarkand",
        // phone: "+998976554321",
        // ambulatorCard: "N12345",
        reports: [
          {
            id: 1,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: "",
          },
          {
            id: 2,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: "",
          },
          {
            id: 3,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: "",
          },
          {
            id: 4,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: "",
          },
          {
            id: 5,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: "",
          },
          {
            id: 6,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: "",
          },
          {
            id: 7,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: "",
          },
        ],
      },
      {
        id: 3,
        // firstName: "test",
        // lastName: "test",
        // middleName: "test",
        // dateOfBirth: 2020,
        // address: "Samarkand",
        // phone: "+998976554321",
        // ambulatorCard: "N12345",
        reports: [
          {
            id: 1,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: "",
          },
        ],
      },
      {
        id: 4,
        // firstName: "test",
        // lastName: "test",
        // middleName: "test",
        // dateOfBirth: 2020,
        // address: "Samarkand",
        // phone: "+998976554321",
        // ambulatorCard: "N12345",
        reports: [
          {
            id: 1,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: "",
          },
          {
            id: 2,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: "",
          },
          {
            id: 3,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: "",
          },
        ],
      },
      {
        id: 5,
        // firstName: "test",
        // lastName: "test",
        // middleName: "test",
        // dateOfBirth: 2020,
        // address: "Samarkand",
        // phone: "+998976554321",
        // ambulatorCard: "N12345",
        reports: [
          {
            id: 1,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: "",
          },
          {
            id: 2,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: "",
          },
          {
            id: 3,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: "",
          },
        ],
      },
      {
        id: 6,
        // firstName: "test",
        // lastName: "test",
        // middleName: "test",
        // dateOfBirth: 2020,
        // address: "Samarkand",
        // phone: "+998976554321",
        // ambulatorCard: "N12345",
        reports: [
          {
            id: 1,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: '',
          },
          {
            id: 2,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: '',
          },
          {
            id: 3,
            date: "10/06/2024",
            returnDate: "17/06/2024",
            link: '',
          },
    ],
      },
    ],
  }),
  getters: {
    totalPatients: (state) => state.patientList.length,
    totalReporters: (state) => state.reporterList.length,
  },
  actions: {
    addPatient(patient) {
      if (!Array.isArray(this.patientList)) {
        this.patientList = [];
      }
      this.patientList.unshift(patient);
    },
    addReporter(reporter) {
      this.reporterList.unshift(reporter);
    },
    findPatientById(id) {
      this.patientData = this.patientList.find(
        (patient) => patient.id === Number(id)
      );
    },
    patchPatient(updatedPatient) {
      this.patientData = updatedPatient;

      const index = this.patientList.findIndex(
        (patient) => patient.id === updatedPatient.id
      );
      if (index !== -1) {
        this.patientList[index] = updatedPatient;
      }
    },
  },
});

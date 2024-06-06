import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useDataStore = defineStore('data', {
  state: () => ({
    patientList: [
      {
        id: 1,
        firstName: "Madeleine",
        lastName: "Figueroa",
        middleName: "Niamh",
        dateOfBirth: "2008-04-12T12:30:00Z",
        address: {
          street: "Street Temur Malik, Mirzo-ulugbek Area, 100125",
          city: "Toshkent",
          district: "Chilonzor",
          country: "Uzbekistan",
        },
        phone: "+998976554321",
        ambulatorCard: "N12345",
        type: "patient"
      },
      {
        id: 2,
        firstName: "O'Doherty",
        lastName: "Kathleen",
        middleName: "Riggs",
        dateOfBirth: "2003-06-13T12:30:00Z",
        address: {
          street: "Street Temur Malik, Mirzo-ulugbek Area, 100125",
          city: "Toshkent",
          district: "Chilonzor",
          country: "Uzbekistan",
        },
        phone: "+998976554321",
        ambulatorCard: "N12345",
        type: "patient"
      },
      {
        id: 3,
        firstName: "Henri",
        lastName: "Merrill",
        middleName: "Kayne",
        dateOfBirth: "2008-01-14T12:30:00Z",
        address: {
          street: "Street Temur Malik, Mirzo-ulugbek Area, 100125",
          city: "Toshkent",
          district: "Chilonzor",
          country: "Uzbekistan",
        },
        phone: "+998976554321",
        ambulatorCard: "N12345",
        type: "patient"
      },
      {
        id: 4,
        firstName: "Elaine",
        lastName: "Stokes",
        middleName: "Glenn",
        dateOfBirth: "2008-10-30T12:30:00Z",
        address: {
          street: "Street Temur Malik, Mirzo-ulugbek Area, 100125",
          city: "Toshkent",
          district: "Chilonzor",
          country: "Uzbekistan",
        },
        phone: "+998976554321",
        ambulatorCard: "N12345",
        type: "patient"
      },
    ],
    reporterList: [
      {
        id: 1,
        firstName: "Moran",
        lastName: "Vasquez",
        phone: "+998976554321",
        workplace: "test workplace",
        password: "12345",
        address: {
          street: "Street Temur Malik, Mirzo-ulugbek Area, 100125",
          city: "Toshkent",
          district: "Chilonzor",
          country: "Uzbekistan",
        },
        type: "reporter"
      },
      {
        id: 2,
        firstName: "Bonilla",
        lastName: "Coffman",
        phone: "+998976554321",
        workplace: "test workplace",
        password: "12345",
        address: {
          street: "Street Temur Malik, Mirzo-ulugbek Area, 100125",
          city: "Toshkent",
          district: "Chilonzor",
          country: "Uzbekistan",
        },
        type: "reporter"
      },
      {
        id: 3,
        firstName: "Souza",
        lastName: "Bentley",
        phone: "+998976554321",
        workplace: "test workplace",
        password: "12345",
        address: {
          street: "Street Temur Malik, Mirzo-ulugbek Area, 100125",
          city: "Toshkent",
          district: "Chilonzor",
          country: "Uzbekistan",
        },
        type: "reporter"
      },
      {
        id: 4,
        firstName: "Pagan",
        lastName: "Yang",
        phone: "+998976554321",
        workplace: "test workplace",
        password: "12345",
        address: {
          street: "Street Temur Malik, Mirzo-ulugbek Area, 100125",
          city: "Toshkent",
          district: "Chilonzor",
          country: "Uzbekistan",
        },
        type: "reporter"
      }
    ],
  }),
  getters: {
    totalPatients: (state) => state.patientsList.length,
    totalReporters: (state) => state.reporterList.length,
  },
  actions: {
    addPatient(patient) {
      this.patientsList.push(patient);
    },
    addReporter(reporter) {
      this.reporterList.push(reporter);
    }
  }
});

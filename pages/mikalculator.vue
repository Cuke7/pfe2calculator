<template>
  <v-row justify="center">
    <v-col cols="12" lg="8" class="pa-6">
      <div class="text-h4 primary--text text-center my-12">
        Mikalculator2000
      </div>
      <v-card class="pa-4">
        <v-row justify="center">
          <v-col cols="auto">
            <v-avatar color="grey" size="164">
              <v-img src="/micka.jpg"></v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <v-card-title class="pl-0"> Jet d'attaque </v-card-title>
        <v-row align="center">
          <v-col cols="4" class="text-body-1"> CA de Micka </v-col>
          <v-col cols="8">
            <v-slider
              v-model="CA"
              trackColor="grey"
              min="0"
              max="25"
              thumb-label="always"
            >
            </v-slider>
          </v-col>
          <v-col cols="4" class="text-body-1"> Probabilité de succès </v-col>
          <v-col cols="8">
            <v-slider
              v-model="sucessRate"
              trackColor="grey"
              min="10"
              max="100"
              step="5"
              thumb-label="always"
            >
              <template v-slot:thumb-label="{ value }">
                {{ value }} %
              </template>
            </v-slider>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="auto">Bonus à l'attaque minimal requis : </v-col>
          <v-col cols="auto" class="primary--text font-weight-bold">
            <v-chip color="primary">
              {{ bonusAttaque }}
            </v-chip>
          </v-col>
        </v-row>
        <!-- <v-card-title class="pl-0"> Jet de dégâts </v-card-title>
        <DicePicker v-model="dices" /> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    CA: 20,
    sucessRate: 80,
    dices: ["d6"],
  }),

  computed: {
    bonusAttaque() {
      return this.sucessRate / 5 + this.CA - 21;
    },
  },

  // methods: {
  //   compute(CA, sucessRate) {
  //     return sucessRate / 5 + CA - 21;
  //   },
  // },
};
</script>

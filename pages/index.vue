<template>
  <v-row justify="center" align="center" class="px-2">
    <v-col cols="12" md="8">
      <div class="text-h3 text-center primary--text my-12">
        Calculateur de dégâts PF2E
      </div>
      <v-card-title class="px-0"> Modificateurs fixes : </v-card-title>
      <v-row align="center">
        <v-col cols="6">
          <v-text-field
            label="Modif attaque"
            outlined
            type="number"
            v-model="modifAttaque"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Modif dégâts"
            outlined
            type="number"
            v-model="modifDegats"
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <div v-for="attack in attacks" :key="attack.id">
        <Attack :attackInit="attack"></Attack>
      </div>

      <v-row justify="center" align="center" class="my-2">
        <v-col cols="auto" class="font-weight-bold">
          Ajouter une attaque
        </v-col>
        <v-col cols="auto">
          <v-btn color="green" fab width="40" height="40" @click="addAttack()">
            <v-icon color="white"> mdi-plus </v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row justify="end">
        <v-col cols="auto">
          <v-btn color="primary"> Compute </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  mounted() {
    this.addAttack();
  },
  data: () => ({
    modifAttaque: 0,
    modifDegats: 0,
  }),
  computed: {
    attacks() {
      return this.$store.state.attacks;
    },
  },
  methods: {
    addAttack() {
      this.$store.commit("addAttack");
    },
  },
};
</script>

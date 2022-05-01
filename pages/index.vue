<template>
  <v-row justify="center">
    <v-col cols="12" lg="8" class="pa-0">
      <div class="text-h3 primary--text text-center my-12">
        PF2E damage calculator
      </div>
      <v-row>
        <v-col cols="6">
          <v-text-field
            outlined
            label="Modif attaque"
            v-model="globalModifAttaque"
            type="Number"
          >
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            outlined
            label="Modif dégâts"
            v-model="globalModifDegats"
            type="Number"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="auto" class="text-body-1 font-weight-bold">
          Ajouter une attaque
        </v-col>
        <v-col cols="auto">
          <v-btn color="green" fab width="40" height="40" @click="addAttack()">
            <v-icon> mdi-plus </v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <div v-for="attack in attacks" :key="attack.id">
        <Attack></Attack>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "main",

  mounted() {
    this.$store.commit("ADD_ATTACK");
  },

  data: () => ({
    //
  }),

  computed: {
    attacks() {
      return this.$store.state.attacks;
    },
    globalModifAttaque: {
      set(val) {
        this.$store.commit("GLOBAL_MODIF_ATTAQUE", val);
      },
      get() {
        return this.$store.state.globalModifAttaque;
      },
    },
    globalModifDegats: {
      set(val) {
        this.$store.commit("GLOBAL_MODIF_DEGATS", val);
      },
      get() {
        return this.$store.state.globalModifDegats;
      },
    },
  },

  methods: {
    addAttack() {
      this.$store.commit("ADD_ATTACK");
    },
  },
};
</script>

<template>
  <div>
    <v-card-title> Modificateurs globaux</v-card-title>
    <v-row>
      <v-col cols="5">
        <v-text-field
          outlined
          label="Modif attaque"
          v-model="globalModifAttaque"
          type="Number"
          hide-details
        >
        </v-text-field>
      </v-col>
      <v-col cols="5">
        <v-text-field
          outlined
          label="Modif dégâts"
          v-model="globalModifDegats"
          type="Number"
          hide-details
        >
        </v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
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
};
</script>

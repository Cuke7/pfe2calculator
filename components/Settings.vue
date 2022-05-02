<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card-title> Attaques </v-card-title>

      <v-row>
        <v-col cols="12" v-for="attack in attacks" :key="attack.id">
          <Attack :id="attack.id" class="mb-3"></Attack>
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <v-col cols="auto" class="text-body-1"> Ajouter une attaque </v-col>
        <v-col cols="auto">
          <v-btn color="green" fab width="40" height="40" @click="addAttack()">
            <v-icon> mdi-plus </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "main",

  data: () => ({}),

  computed: {
    attacks() {
      return this.$store.state.attacks;
    },
  },

  methods: {
    addAttack() {
      this.$store.commit("ADD_ATTACK");
    },
  },
};
</script>

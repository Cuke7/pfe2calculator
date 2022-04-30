<template>
  <v-row align="center">
    <v-col cols="10">
      <v-row align="center">
        <v-col cols="6">
          <v-text-field
            label="Modif attaque"
            outlined
            type="Number"
            v-model="attack.modifAttack"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Modif dégâts"
            outlined
            type="Number"
            v-model="attack.modifDegats"
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="2">
      <v-btn color="red" fab width="40" height="40" @click="remove()">
        <v-icon color="white"> mdi-minus </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  // mounted() {
  //   this.attack = { ...this.attackProp };
  // },
  props: ["attackInit"],
  data() {
    return {
      attack: { ...this.attackInit },
    };
  },

  watch: {
    attack: {
      deep: true,
      handler(attack) {
        this.$store.commit("updateAttacks", attack);
      },
    },
  },
  methods: {
    remove() {
      this.$store.commit("removeAttack", this.attack.id);
    },
  },
};
</script>

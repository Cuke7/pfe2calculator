<template>
  <div>
    <v-row align="center">
      <v-col cols="2">
        <v-text-field
          outlined
          label="Modif jet d'attaque"
          v-model="attack.modifAttaque"
          type="number"
          hide-details=""
        />
      </v-col>
      <v-col cols="2">
        <v-text-field
          outlined
          label="Modif dégâts"
          v-model="attack.modifDegats"
          type="number"
          hide-details
        />
      </v-col>
      <v-col cols="7">
        <DicePicker v-model="attack.selectedDices" />
      </v-col>
      <v-col cols="1">
        <v-btn fab width="40" height="40" color="red" @click="remove()">
          <v-icon> mdi-minus </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["id"],
  // mounted() {
  //   this.attack = this.$store.getters.GET_ATTACK(this.id);
  // },
  data: () => ({
    // attack: this.attackInit,
    attack: {
      modifAttaque: 0,
      modifDegats: 0,
      selectedDices: ["d6"],
    },
  }),

  watch: {
    attack: {
      deep: true,
      handler(val) {
        console.log("HEY");
        let attack_temp = { ...val };
        attack_temp.id = this.id;
        this.$store.commit("UPDATE_ATTACK", attack_temp);
      },
    },
  },

  // computed: {
  //   attack: {
  //     get() {
  //       return this.$store.getters.GET_ATTACK(this.id);
  //     },
  //     set(val) {
  //       this.$store.commit("UPDATE_ATTACK", val);
  //     },
  //   },
  // },

  methods: {
    remove() {
      this.$store.commit("REMOVE_ATTACK", this.id);
    },
  },
};
</script>

<template>
  <v-row align="center">
    <v-col cols="5">
      <v-select
        :items="dices"
        label="Ajouter un dé de dégâts"
        v-model="selectedDice"
        hide-details
        outlined
      >
      </v-select>
    </v-col>

    <v-col cols="7">
      <v-chip
        v-for="(dice, index) in selectedDices"
        :key="index"
        class="ma-1"
        close
        @click:close="removeChip(dice)"
        color="primary"
      >
        {{ dice }}
      </v-chip>
    </v-col>
  </v-row>
</template>

<script>
export default {
  model: {
    prop: "selectedDices",
    event: "update:selectedDices",
  },
  props: ["selectedDices"],
  data: () => ({
    dices: ["d4", "d6", "d8", "d10", "d12"],
    selectedDice: [],
  }),

  watch: {
    selectedDice(val) {
      if (val.length > 0) {
        this.selectedDices.push(val);
        this.selectedDice = [];
      }
    },
  },

  methods: {
    removeChip(dice) {
      this.selectedDices.splice(this.selectedDices.indexOf(dice), 1);
    },
  },
};
</script>

<template>
  <v-row align="center" class="my-4">
    <v-col cols="11">
      <v-row align="center">
        <v-col cols="3">
          <v-text-field
            label="Modif attaque"
            outlined
            type="Number"
            v-model="attack.modifAttack"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="Modif dégâts"
            outlined
            type="Number"
            v-model="attack.modifDegats"
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="3">
          <v-autocomplete
            :items="dices"
            color="primary"
            outlined
            label="Dés de dégâts"
            hide-details
            v-model="selectedDice"
          >
          </v-autocomplete>
        </v-col>
        <v-col cols="3">
          <ChipGroup
            :initialChips="selectedDices"
            @remove="removeChip"
          ></ChipGroup>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="1">
      <v-btn color="red" fab width="40" height="40" @click="remove()">
        <v-icon color="white"> mdi-minus </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import ChipGroup from "./ChipGroup.vue";
export default {
  // mounted() {
  //   this.attack = { ...this.attackProp };
  // },
  props: ["attackInit"],
  data() {
    return {
      attack: { ...this.attackInit },
      dices: ["d4", "d6", "d8", "d10", "d12"],
      selectedDice: null,
      selectedDices: [],
    };
  },
  watch: {
    attack: {
      deep: true,
      handler(attack) {
        attack.selectedDices = this.selectedDices;
        this.$store.commit("updateAttacks", attack);
      },
    },
    selectedDice(val) {
      if (val.length > 0) {
        this.selectedDices.push(val);
        this.selectedDice = [];
        this.attack.selectedDices = this.selectedDices;
        this.$store.commit("updateAttacks", this.attack);
      }
    },
  },
  methods: {
    remove() {
      this.$store.commit("removeAttack", this.attack.id);
    },
    removeChip(chip) {
      this.selectedDices.splice(this.selectedDices.indexOf(chip), 1);
    },
  },
  components: { ChipGroup },
};
</script>

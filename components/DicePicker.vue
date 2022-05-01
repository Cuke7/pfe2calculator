<template>
  <v-row align="center">
    <v-col cols="6">
      <v-select :items="dices" label="Dés de dégâts"> </v-select>
    </v-col>
    <v-col cols="6"> Dices </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dices: ["d4", "d6", "d8", "d10", "d12"],
  }),
};
</script>

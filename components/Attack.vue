<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-text-field
          outlined
          label="Modif jet d'attaque"
          v-model="modifAttaque"
          type="number"
        />
      </v-col>
      <v-col cols="6">
        <DicePicker />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data: () => ({
    modifAttaque: "2",
  }),
};
</script>

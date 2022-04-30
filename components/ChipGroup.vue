<template>
  <div>
    <v-chip
      v-for="(chip, index) in initialChips"
      :key="index"
      close
      @click:close="close(chip)"
      color="primary"
      class="ma-1"
    >
      {{ chip }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: ["initialChips"],
  data: () => ({
    //
  }),
  methods: {
    close(chip) {
      this.$emit("remove", chip);
    },
  },
};
</script>

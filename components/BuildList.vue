<template>
  <div>
    <v-row v-for="(dataset, index) in datasets" :key="index">
      <v-col cols="12" class="body-text-1">
        <v-row align="center" justify="center">
          <v-col cols="10">
            <li
              :style="'color: ' + dataset.borderColor"
              class="font-weight-bold"
            >
              {{ dataset.label }}
            </li>
          </v-col>
          <v-col cols="2">
            <v-btn icon width="30" height="30" @click="remove(dataset)">
              <v-icon color="red"> mdi-trash-can </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    datasets() {
      return this.$store.state.datasets;
    },
  },
  methods: {
    remove(dataset) {
      this.$store.commit("REMOVE_DATASET", dataset);
    },
  },
};
</script>

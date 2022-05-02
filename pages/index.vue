<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" lg="8" class="pa-0">
        <div class="text-h3 primary--text text-center my-12">
          PF2E damage calculator
        </div>
        <ModifGlobaux />
        <Settings />
        <v-divider class="my-6"></v-divider>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" lg="10">
        <Graph />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Settings from "../components/Settings.vue";
import ModifGlobaux from "../components/ModifGlobaux.vue";
export default {
  layout: "main",
  components: { Settings, ModifGlobaux },
  mounted() {
    this.$store.commit("ADD_ATTACK");
  },
};
</script>

<template>
  <v-row justify="center">
    <v-col cols="12" lg="8" class="pa-6">
      <v-row justify="end">
        <v-col cols="auto">
          <v-btn color="primary" class="mr-12" nuxt to="/mikalculator"
            >Mikalculator2000
            <v-icon right> mdi-arrow-right </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <div class="text-h3 primary--text text-center my-12">
        PF2E damage calculator
      </div>
      <ModifGlobaux />
      <v-divider class="mt-6"></v-divider>
      <Settings />
      <v-divider class="my-6"></v-divider>
      <Graph />
    </v-col>
  </v-row>
</template>

<script>
import Settings from "../components/Settings.vue";
import ModifGlobaux from "../components/ModifGlobaux.vue";
export default {
  components: { Settings, ModifGlobaux },
  mounted() {
    this.$store.commit("ADD_ATTACK");
  },
};
</script>

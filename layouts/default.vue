<template>
  <v-app dark>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    //
  }),
};
</script>

<style>
.v-main {
  background-image: url("/background.jpg");
  background-repeat: repeat;
}

.v-card {
  background-image: url("/background.jpg");
  background-repeat: repeat;
}
</style>

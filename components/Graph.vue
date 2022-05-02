<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="4">
        <v-text-field
          color="primary"
          v-model="buildName"
          label="Nom du build"
          hide-details=""
        >
        </v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="compute()"> Calculer </v-btn>
      </v-col>
    </v-row>
    <v-row justify="space-between">
      <v-col cols="9" class="mb-12 mt-6">
        <client-only>
          <line-chart :chart-options="options" :chart-data="chartData" />
        </client-only>
      </v-col>
      <v-col cols="3">
        <BuildList />
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="2000">
      Dés de dégâts manquants.
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import BuildList from "./BuildList.vue";
export default {
  layout: "main",
  data: () => ({
    buildName: "",
    snackbar: false,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 18,
            },
          },
          title: {
            display: true,
            text: "CA adverse",
            font: {
              size: 20,
            },
            color: "rgba(109, 0, 0, 1)",
          },
        },
        y: {
          ticks: {
            font: {
              size: 18,
            },
          },
          title: {
            display: true,
            text: "Dégâts moyens par tour",
            font: {
              size: 20,
            },
            color: "rgba(109, 0, 0, 1)",
          },
        },
      },
    },
  }),
  computed: {
    attacks() {
      return this.$store.state.attacks;
    },
    globalModifAttaque() {
      return this.$store.state.globalModifAttaque;
    },
    globalModifDegats() {
      return this.$store.state.globalModifDegats;
    },
    labels() {
      let labels = [];
      for (let CA = 10; CA < 26; CA++) {
        labels.push(CA);
      }
      return labels;
    },
    datasets() {
      return this.$store.state.datasets;
    },
    chartData() {
      if (this.datasets.length == 0) {
        return {
          labels: [],
          datasets: [
            {
              label: "Dégât moyen par tour",
              data: [],
              borderWidth: 1,
            },
          ],
        };
      }
      return {
        labels: this.labels,
        datasets: this.datasets,
      };
    },
  },
  methods: {
    getColor() {
      let l = this.$store.state.datasets.length;
      let colors = ["#2745a8", "#941212", "#0c5c27", "#3e065e"];
      return colors[l];
    },
    compute() {
      this.$vuetify.goTo(400, { duration: 1000 });
      let attacks = this.attacks;

      let globalModifAttaque = Number(this.globalModifAttaque);
      let globalModifDegats = Number(this.globalModifDegats);
      let results = [];
      let turnNumber = 10000;
      for (let CA = 10; CA < 26; CA++) {
        let dmg = 0;
        for (let t = 0; t < turnNumber; t++) {
          for (const attack of attacks) {
            let diceDamage = this.getAverageDiceDamage(attack.selectedDices);
            let result = this.rollAttack(
              20,
              CA,
              globalModifAttaque + Number(attack.modifAttaque)
            );
            if (result.hit) {
              dmg +=
                diceDamage + globalModifDegats + Number(attack.modifDegats);
            }
            if (result.cc) {
              dmg += diceDamage;
            }
          }
        }
        results.push(dmg / turnNumber);
      }
      let color = this.getColor();
      let buildName = this.buildName;
      if (buildName == "") {
        buildName = "Build n°" + Number(this.$store.state.datasets.length + 1);
      }
      //   this.chartData = {
      //     labels: this.labels,
      //     datasets: [
      //       {
      //         label: "Build n°1",
      //         data: results,
      //         backgroundColor: [color],
      //         borderColor: [color],
      //         borderWidth: 1,
      //       },
      //     ],
      //   };
      this.$store.commit("ADD_DATASET", {
        label: buildName,
        data: results,
        backgroundColor: [color],
        borderColor: [color],
        borderWidth: 1,
      });
    },
    getAverageDiceDamage(dices) {
      let result = 0;
      for (const dice of dices) {
        let diceNumber = dice.split("d")[1];
        result += (Number(diceNumber) + 1) / 2;
      }
      if (result == 0) {
        this.snackbar = true;
      }
      return result;
    },
    rollAttack(diceSize, CA, bonus_attaque) {
      let roll = Math.floor(Math.random() * diceSize + 1);
      let cc = false;
      let ec = false;
      let hit = false;
      if (roll + bonus_attaque >= CA) {
        hit = true;
      }
      if (roll + bonus_attaque - CA >= 10) {
        cc = true;
      }
      if (roll + bonus_attaque - CA <= -10) {
        ec = true;
      }
      return { hit, cc, ec };
    },
  },
  components: { BuildList },
};
</script>

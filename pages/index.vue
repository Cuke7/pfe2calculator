<template>
  <v-row justify="center">
    <v-col cols="12" lg="6" class="pa-0">
      <div class="text-h3 primary--text text-center my-12">
        PF2E damage calculator
      </div>
      <v-card-title> Modificateurs globaux : </v-card-title>
      <v-row>
        <v-col cols="5">
          <v-text-field
            outlined
            label="Modif attaque"
            v-model="globalModifAttaque"
            type="Number"
          >
          </v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field
            outlined
            label="Modif dégâts"
            v-model="globalModifDegats"
            type="Number"
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-card-title> Attaques </v-card-title>

      <div v-for="attack in attacks" :key="attack.id">
        <Attack :id="attack.id"></Attack>
      </div>

      <v-row align="center" justify="center" class="mt-6">
        <v-col cols="auto" class="text-body-1 font-weight-bold">
          Ajouter une attaque
        </v-col>
        <v-col cols="auto">
          <v-btn color="green" fab width="40" height="40" @click="addAttack()">
            <v-icon> mdi-plus </v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row justify="end">
        <v-col cols="auto">
          <v-btn color="primary" @click="results = compute()"> Calculer </v-btn>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" class="my-12">
          <client-only v-if="chartDisplay">
            <line-chart
              :height="200"
              :chart-options="options"
              :chart-data="chartData"
            />
          </client-only>
        </v-col>
        <v-col class="my-12"> </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "main",

  mounted() {
    this.$store.commit("ADD_ATTACK");
  },

  data: () => ({
    results: [],
    chartDisplay: false,
    chartData: {
      labels: [],
      datasets: [
        {
          label: "Dégât moyen par tour",
          data: [],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
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
            text: "Dégâts moyen par  tour",
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
    globalModifAttaque: {
      set(val) {
        this.$store.commit("GLOBAL_MODIF_ATTAQUE", val);
      },
      get() {
        return this.$store.state.globalModifAttaque;
      },
    },
    globalModifDegats: {
      set(val) {
        this.$store.commit("GLOBAL_MODIF_DEGATS", val);
      },
      get() {
        return this.$store.state.globalModifDegats;
      },
    },
  },

  methods: {
    addAttack() {
      this.$store.commit("ADD_ATTACK");
    },

    compute() {
      this.chartDisplay = true;
      this.$vuetify.goTo(400, { duration: 1000 });
      let attacks = this.attacks;
      let globalModifAttaque = this.globalModifAttaque;
      let globalModifDegats = this.globalModifDegats;
      let results = [];
      let turnNumber = 10000;
      let labels = [];

      for (let CA = 10; CA < 26; CA++) {
        labels.push(CA);
        let dmg = 0;
        for (let t = 0; t < turnNumber; t++) {
          for (const attack of attacks) {
            let diceDamage = this.getAverageDiceDamage(attack.selectedDices);
            let result = this.rollAttack(20, CA, globalModifAttaque);
            if (result.hit) {
              dmg += diceDamage + globalModifDegats;
            }
            if (result.cc) {
              dmg += diceDamage;
            }
          }
        }
        results.push(dmg / turnNumber);
      }

      this.chartData = {
        labels,
        datasets: [
          {
            label: "Dégât moyen par tour",
            data: results,
            backgroundColor: ["rgba(109, 0, 0, 1)"],
            borderColor: ["rgba(109, 0, 0, 1)"],
            borderWidth: 1,
          },
        ],
      };

      return results;
    },

    getAverageDiceDamage(dices) {
      let result = 0;
      for (const dice of dices) {
        let diceNumber = dice.split("d")[1];
        result += (Number(diceNumber) + 1) / 2;
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
};
</script>

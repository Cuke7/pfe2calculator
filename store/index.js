export const state = () => ({
  attacks: [],
  attacksNumber: 0,
});

export const mutations = {
  addAttack(state, val) {
    let id = state.attacksNumber;
    state.attacks.push({
      id: id,
      modifAttack: 0,
      modifDegats: 0,
      selectedDices: [],
    });
    state.attacksNumber++;
  },
  updateAttacks(state, attack) {
    for (let i = 0; i < state.attacks.length; i++) {
      if (state.attacks[i].id == attack.id) {
        state.attacks[i] = attack;
      }
    }
  },
  removeAttack(state, id) {
    for (let i = 0; i < state.attacks.length; i++) {
      let attack = state.attacks[i];
      if (attack.id == id) {
        console.log(attack);
        state.attacks.splice(i, 1);
      }
    }
  },
};

// export const getters = {
//   getAttack: (state) => (val) => {
//     // console.log(val);
//     for (const attack of state.attacks) {
//       if (val == attack.id) {
//         return attack;
//       }
//     }
//   },
// };

export const state = () => ({
  globalModifAttaque: 0,
  globalModifDegats: 0,
  attacks: [],
  attackNumber: 0,
});

export const mutations = {
  GLOBAL_MODIF_ATTAQUE(state, val) {
    state.globalModifAttaque = val;
  },
  GLOBAL_MODIF_DEGATS(state, val) {
    state.globalModifDegats = val;
  },

  ADD_ATTACK(state) {
    let id = state.attackNumber;
    state.attacks.push({
      id: id,
      modifAttack: 0,
      modifDegats: 0,
      selectedDices: [],
    });

    state.attackNumber++;
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

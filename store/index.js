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
      modifAttaque: 0,
      modifDegats: 0,
      selectedDices: ["d6"],
    });
    state.attackNumber++;
  },

  REMOVE_ATTACK(state, id) {
    for (let i = 0; i < state.attacks.length; i++) {
      let attack = state.attacks[i];
      if (attack.id == id) {
        state.attacks.splice(i, 1);
      }
    }
  },

  UPDATE_ATTACK(state, val) {
    for (let i = 0; i < state.attacks.length; i++) {
      if (state.attacks[i].id == val.id) {
        state.attacks[i] = val;
      }
    }
  },
};

export const getters = {
  GET_ATTACK: (state) => (id) => {
    return { ...state.attacks.find((attack) => attack.id === id) };
  },
};

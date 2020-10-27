import idgen from "idgen";

const state = {
  list: [
    { id: idgen(5), name: "Эдуард", phone: "+79051287643" },
    { id: idgen(5), name: "Даниил", phone: "+79493476541" },
    { id: idgen(5), name: "Евгений", phone: "+79913549115" }
  ]
};

const mutations = {
  ADD_CONTACT(state, contact) {
    state.list.push(contact);
  },
  REMOVE_CONTACT(state, id) {
    const index = state.list.findIndex(item => item.id === id);
    state.list.splice(index, 1);
  }
};

const actions = {
  // Обычно в боевых проектах в экшенах делаюсьтся АПИ запросы и по этому я использую из для вызова мутации а не вызываю мутации напрямую
  addContact({ commit }, contact = {}) {
    commit("ADD_CONTACT", contact);
  },
  removeContact({ commit }, id) {
    if (confirm("Хотите удалить контакт?")) commit("REMOVE_CONTACT", id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};


import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [
      
    ]
  },
  mutations: {
    addItem(state, item) {
      state.items.push(item);
    },
    editItem(state, { item, name = item.name, done = item.done }) {
      item.name = name;
      item.done = done;
    },
    removeItem(state, item) {
      state.items.splice(state.items.indexOf(item), 1);
    },
    fetchTodo(state, items) {
      state.items = items;
    }
  },
  actions: {
    fetchTodo({commit}) {
      let response = {
        data: [
          {name: 'milk', done: false}
        ]
      }
      commit('fetchTodo', response.data);
    },
    addItem({commit}, item) {
      commit('addItem', {name: item, done: false});
    },
    editItem({commit}, { item, name}) {
      commit('editItem', {item, name});
    },
    toggleItem({commit}, item) {
      commit('editItem', { item, done: !item.done});
    }
  }
});
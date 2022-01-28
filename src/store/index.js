import { createStore as vuexCreateStore } from "vuex";
import { getTask, updateTask } from "@/services/TaskActions.js";

const storeConfiguration = {
  state: {
    tasks: [],
  },
  mutations: {
    SET_TASKS(store, value) {
      store.tasks = value;
    },
  },
  actions: {
    async getTasksFromApi({ commit }) {
      const tasks = await getTask();
      commit("SET_TASKS", tasks);
    },

    async updateTaskFromServer({ dispatch }, [value, id]) {
      await updateTask(value, id);
      await dispatch("getTasksFromApi");
    },
  },
};

const defaultOverrides = {
  state: () => {
    return {};
  },
};

function makeState(initialState, overrideState) {
  return {
    ...(typeof initialState === "function" ? initialState() : initialState),
    ...overrideState(),
  };
}

export function createStore(storeOverrides = defaultOverrides) {
  return vuexCreateStore({
    ...storeConfiguration,
    ...storeOverrides,
    ...{ state: makeState(storeConfiguration.state, storeOverrides.state) },
  });
}

export default createStore();

import { mount } from "@vue/test-utils";
import TaskList from "@/components/task/task-list.vue";
import { createStore } from "@/store";
import { task as mockEvents } from "../../db.json";

function mountEventList(config = {}) {
  config.mountOptions = config.mountOptions || {};
  config.plugins = config.plugins || {};
  return mount(TaskList, {
    global: {
      plugins: [createStore(config.plugins.store)],
    },
    ...config.mountOptions,
  });
}

let wrapper;

describe("TaskList", () => {
  beforeEach(() => {
    wrapper = mountEventList();
  });
  it("should render the events", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("correct render page title", () => {
    const title = wrapper.get('[data-testid="title"]');

    expect(title.text()).toContain("Ваши задачи");
  });

  it("check tasks list", () => {
    wrapper = mountEventList({
      plugins: {
        store: {
          state: () => ({
            tasks: mockEvents,
          }),
        },
      },
    });

    const tasks = wrapper.findAll('[data-testid="task"]');

    expect(tasks).toHaveLength(mockEvents.length);

    tasks.forEach((event, i) => {
      const eventText = event.text();
      expect(eventText).toContain(mockEvents[i].message);
    });
  });

  it("dispatch completed this task", () => {
    const mutations = {
      updateTaskFromServer: jest.fn(),
    };

    wrapper = mountEventList({
      plugins: {
        store: {
          state: () => (
            {
              tasks: mockEvents,
            },
            mutations
          ),
        },
      },
    });

    const tasks = wrapper.findAll('[data-testid="task"]');

    tasks.forEach((event) => {
      event.trigger("click");
      expect(mutations.updateTaskFromServer).toHaveBeenCalled();
    });
  });
});

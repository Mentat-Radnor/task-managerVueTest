import { mount } from "@vue/test-utils";

import TaskElement from "@/components/task/task-element.vue";
import { deleteTask } from "@/services/TaskActions";
// import flushPromises from "flush-promises";

jest.mock("@/services/TaskActions");
beforeEach(() => {
  jest.clearAllMocks();
});

describe("TaskElement", () => {
  test("is Vue instance", () => {
    const wrapper = mount(TaskElement, {
      propsData: { task: { message: "Task 1", completed: false, id: 0 } },
    });

    expect(wrapper).toBeTruthy();
  });

  test("renders the task name", () => {
    const taskMessage = "Купить хлеб";
    const wrapper = mount(TaskElement, {
      propsData: { task: { message: taskMessage, completed: false, id: 0 } },
    });

    const wrapperHtml = wrapper.html();

    expect(wrapperHtml).toContain(taskMessage);
  });

  test("Calls deleteTask when the delete button is clicked", async () => {
    const wrapper = mount(TaskElement, {
      propsData: { task: { message: "Task 1", completed: false, id: 0 } },
    });

    const button = wrapper.find("[data-testid='delete-button']");

    deleteTask.mockResolvedValue();

    await button.trigger("click");

    expect(deleteTask).toHaveBeenCalledTimes(1);
  });

  it("click checkobox and complete the task", async () => {
    const taskComplete = jest.fn();
    const task = { message: "Task 1", completed: false, id: 0 };
    const wrapper = mount(TaskElement, {
      props: { task },
    });

    const checkbox = wrapper.find('[data-testid="task-completed"]');

    taskComplete.mockResolvedValue();

    await checkbox.trigger("click");
    const updateEvent = wrapper.emitted("update-task-completed");

    expect(updateEvent).toHaveLength(1);
  });
});

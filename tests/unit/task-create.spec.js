import { mount } from "@vue/test-utils";
import TaskCreate from "@/components/task/task-create.vue";
import { postTask } from "@/services/TaskActions";
import flushPromises from "flush-promises";

jest.mock("@/services/TaskActions");
beforeEach(() => {
  jest.clearAllMocks();
});

describe("TestCreate.vue", () => {
  it("Check value Submit form", async () => {
    const wrapper = mount(TaskCreate);
    wrapper.trigger("submit");

    const mockMessage = "Купить молоко";
    postTask.mockResolvedValueOnce({ message: mockMessage });
    await flushPromises();

    expect(postTask).toHaveBeenCalledTimes(1);
  });
});

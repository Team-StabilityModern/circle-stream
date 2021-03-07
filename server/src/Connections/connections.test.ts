import { SocketStream } from "fastify-websocket";
import Connections from "./index";

interface Singleton {
  __singleton_test_flag: "hi";
}

interface TestFlag {
  jestPushTestPassed: boolean;
  jestForeachTestPassed: boolean;
  jestRemoveTest: boolean | null;
}

interface ConnectionPrivateMethods {
  connections: Record<string, JestSocketStream>;
}

type JestConnections = Connections & Partial<Singleton>;
type JestSocketStream = SocketStream & Partial<TestFlag>;

let instance: JestConnections;
let connection: JestSocketStream = ({
  jestPushTestPassed: false,
  jestForeachTestPassed: false,
  jestRemoveTest: null,
} as unknown) as JestSocketStream;
let connection2 = Object.assign(
  {
    __jest_another_connection_test_flag: true,
  },
  connection
);

describe("The instance should be singleton when the ID is the same", () => {
  it("Try to run .getInstance the first time", () => {
    instance = Connections.getInstance("a");
  });

  it("Try to inject something to the instance", () => {
    instance.__singleton_test_flag = "hi";
  });

  it("Try to run .getInstance the second time, the __singleton_test_flag should be not undefined", () => {
    const instance2: JestConnections = Connections.getInstance("a");
    expect(instance2.__singleton_test_flag).toBe("hi");
  });
});

describe("The instance should be another one when the ID is not the same", () => {
  it("Try to run .getInstance the third time with another ID, the __singleton_test_flag should be undefined", () => {
    const instance2: JestConnections = Connections.getInstance("b");
    expect(instance2.__singleton_test_flag).toBeUndefined();
  });
});

describe("push() do push a connection", () => {
  it("Try to push a mock connection", () => {
    instance.push("test", connection);
  });

  it("Try to push another mock connection", () => {
    instance.push("test2", connection2);
  });

  it("Does both the connection existed?", () => {
    const connections = ((instance as unknown) as ConnectionPrivateMethods)
      .connections;

    connections["test"].jestPushTestPassed = true;
    connections["test2"].jestPushTestPassed = true;

    expect(connection.jestPushTestPassed).toBe(true);
    expect(connection2.jestPushTestPassed).toBe(true);
  });
});

describe("get() do get a connection", () => {
  it("Try to get the mock connection", () => {
    expect(instance.get("test")).toBe(connection);
  });

  it("Try to get the mock connection 2", () => {
    const gottenConnection = instance.get("test2");
    expect(gottenConnection).toBe(connection2);
    expect(
      (gottenConnection as typeof connection2)
        .__jest_another_connection_test_flag
    ).toBe(true);
  });

  it("Try to get the connection that never existed", () => {
    expect(instance.get("test!!!")).toBe(null);
  });
});

describe("listAllId() do list ID of all the online connections", () => {
  it("listAllId should returns 'test' and 'test2' which is what we added in push()", () => {
    expect(instance.listAllId()).toStrictEqual(["test", "test2"]);
  });
});

describe("forEach() do something in every connections in the pool", () => {
  it("Mark the jestForeachTestPassed of every elements as true.", () => {
    instance.forEach((element: JestSocketStream) => {
      element.jestForeachTestPassed = true;
    });
  });

  it("Expect the connection.jestForeachTestPassed === true.", () => {
    expect(connection.jestForeachTestPassed).toBe(true);
  });

  it("Expect the connection2.jestForeachTestPassed === true.", () => {
    expect(connection2.jestForeachTestPassed).toBe(true);
  });
});

describe("remove() do something in every connections in the pool", () => {
  it("Remove the connection from instance", () => {
    instance.remove("test");
  });

  it("Mark the jestRemoveTest of every remaining elements in the pool as true.", () => {
    instance.forEach((element: JestSocketStream) => {
      element.jestRemoveTest = true;
    });
  });

  it("Expect the connection.jestRemoveTest === null.", () => {
    expect(connection.jestRemoveTest).toBe(null);
  });

  it("Expect the connection2.jestRemoveTest === true.", () => {
    expect(connection2.jestRemoveTest).toBe(true);
  });
});

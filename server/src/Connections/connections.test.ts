import { SocketStream } from 'fastify-websocket';
import Connections from './index';

interface Singleton {
  __singleton_test_flag: "hi"
}

interface TestFlag {
  jestPushTestPassed: boolean;
  jestForeachTestPassed: boolean;
  jestRemoveTestPassed: boolean;
}

interface ConnectionPrivateMethods {
  connections: JestSocketStream[];
}

type JestConnections = Connections & Partial<Singleton>;
type JestSocketStream = SocketStream & Partial<TestFlag>; 

let instance: JestConnections;
let connection: JestSocketStream = ({
  jestPushTestPassed: false,
  jestForeachTestPassed: false,
  jestRemoveTestPassed: true,
}) as unknown as JestSocketStream;

describe("The instance should be singleton", () => {
  it("Try to run .Instance the first time", () => {
    instance = Connections.Instance;
  });

  it("Try to inject something to the instance", () => {
    instance.__singleton_test_flag = "hi";
  });

  it("Try to run .Instance the second time, the __singleton_test_flag should be not undefined", () => {
    const instance2: JestConnections = Connections.Instance;
    expect(instance2.__singleton_test_flag).toBe("hi");
  });
});

describe("push() do push a connection", () => {
  it("Try to push a mock connection", () => {
    instance.push(connection);
  });

  it("Does the connection existed?", () => {
    (instance as unknown as ConnectionPrivateMethods).connections.forEach(element => {
      element.jestPushTestPassed = true;
    });

    expect(connection.jestPushTestPassed).toBe(true);
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
  })
});

describe("remove() do something in every connections in the pool", () => {
  it("Remove the connection from instance", () => {
    instance.remove(connection);
  });

  it("Mark the jestForeachTestPassed of every remaining elements in the pool as false.", () => {
    instance.forEach((element: JestSocketStream) => {
      element.jestRemoveTestPassed = false;
    });
  });

  it("Expect the connection.jestRemoveTestPassed === true.", () => {
    expect(connection.jestRemoveTestPassed).toBe(true);
  })
});

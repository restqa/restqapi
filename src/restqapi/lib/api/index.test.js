describe("# api - Module", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const responseSpy = jest.spyOn(require("./response"), "Response");
  jest.mock("got", () => jest.fn());

  test("init", () => {
    const got = require("got");
    got.mockResolvedValue({
      restqa: {
        headers: {
          "content-type": "application/json",
        },
        statusCode: 201,
      },
    });

    const Api = require("./index");
    const options = {
      config: {
        url: "http://test.com",
      },
    };
    const instance = new Api(options);

    const instanceKeys = Object.keys(instance);
    expect(instanceKeys).toEqual([
      "config",
      "request",
      "response",
      "run",
      "toJSON",
    ]);
    expect(instance.config).toEqual({ url: "http://test.com" });
    expect(instance.request).toBeInstanceOf(Object);
    expect(instance.response).toEqual(null);
    expect(instance.run).toBeInstanceOf(Function);
  });

  test("run - successfull call", async () => {
    const got = require("got");
    got.mockResolvedValue({
      restqa: {
        headers: {
          "content-type": "application/json",
        },
        statusCode: 201,
      },
    });

    const Api = require("./index");
    const options = {
      config: {
        url: "http://test.com",
      },
    };

    const instance = new Api(options);
    await instance.run();

    expect(got).toHaveBeenCalledWith(
      expect.objectContaining({
        hostname: "test.com",
        protocol: "http:",
        pathname: "/",
      })
    );

    expect(responseSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 201,
      })
    );
  });

  test("run - successfull call But api response is not a 2XX", async () => {
    const got = require("got");
    got.mockRejectedValue({
      response: {
        restqa: {
          headers: {
            "content-type": "application/json",
          },
          statusCode: 401,
        },
      },
    });

    const Api = require("./index");
    const options = {
      config: {
        url: "http://test.com",
      },
    };

    const instance = new Api(options);
    await instance.run();

    expect(got).toHaveBeenCalledWith(
      expect.objectContaining({
        hostname: "test.com",
        protocol: "http:",
        pathname: "/",
      })
    );

    expect(responseSpy).toHaveBeenCalledWith({
      headers: {
        "content-type": "application/json",
      },
      statusCode: 401,
    });

    expect(instance.response).toEqual(
      expect.objectContaining({ statusCode: 401 })
    );
  });

  test("run - unsuccessfull call (random error)", async () => {
    const got = require("got");
    got.mockRejectedValue(new Error("Random error"));

    const Api = require("./index");
    const options = {
      config: {
        url: "http://test.com",
      },
    };

    const instance = new Api(options);
    await expect(instance.run()).rejects.toThrow("Random error");

    expect(got).toHaveBeenCalledWith(
      expect.objectContaining({
        hostname: "test.com",
        protocol: "http:",
        pathname: "/",
      })
    );

    expect(instance.response).toEqual(null);
  });

  test("toJson", async () => {
    const got = require("got");
    got.mockRejectedValue({
      response: {
        restqa: {
          headers: {
            "content-type": "application/json",
          },
          statusCode: 401,
        },
      },
    });

    const Api = require("./index");
    const options = {
      config: {
        url: "http://test.com",
      },
    };

    const instance = new Api(options);
    await instance.run();
    const result = instance.toJSON();

    expect(got).toHaveBeenCalledWith(
      expect.objectContaining({
        hostname: "test.com",
        protocol: "http:",
        pathname: "/",
      })
    );

    expect(result.request).toMatchObject({
      hostname: "test.com",
      port: "",
      protocol: "http:",
      pathname: "/",
      responseType: "json",
    });

    expect(result.response).toEqual({
      headers: { "content-type": "application/json" },
      statusCode: 401,
    });
  });

  test("toJson when throw Error", async () => {
    const errorMessage = "the error";

    const got = require("got");
    got.mockRejectedValue(new Error(errorMessage));

    const Api = require("./index");
    const options = {
      config: {
        url: "http://test.com",
      },
    };

    const instance = new Api(options);
    await expect(instance.run()).rejects.toThrow(errorMessage);
    const result = instance.toJSON();

    expect(got).toHaveBeenCalledWith(
      expect.objectContaining({
        hostname: "test.com",
        protocol: "http:",
        pathname: "/",
      })
    );

    expect(result.request).toMatchObject({
      hostname: "test.com",
      port: "",
      protocol: "http:",
      pathname: "/",
      responseType: "json",
    });

    expect(result.response).toBe(null);
    expect(result.error).toBe(errorMessage);
  });
});

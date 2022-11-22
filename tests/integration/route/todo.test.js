const request = require("supertest");
const { app } = require("../../../server");
const { deleteAll, createToDo } = require("../../../controllers/todo");
const endpoint = "/todo";

jest.mock("../../../core/authorizer", () => {
  return async (req, res, next) => {
    res.locals.userId = 1;
    res.locals.role = "admin";
    return next();
  };
});
var id;

// afterAll(async () => {});
describe(endpoint, () => {
  beforeEach(async () => {
    const res = await createToDo("test");
    id = res.insertId;
  });

  afterEach(async () => {
    await deleteAll();
  });
  test("GET /", async () => {
    const response = await request(app).get(endpoint);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe("test");
  });

  test("GET /:id", async () => {
    const response = await request(app).get(`${endpoint}/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("test");
  });

  test("POST /", async () => {
    const response = await request(app).post(endpoint).send({ title: "test2" });
    expect(response.statusCode).toBe(200);
    expect(response.body.insertId).toBeDefined();
    const response2 = await request(app).get(endpoint);
    expect(response2.body).toHaveLength(2);
    expect(response2.body[1].title).toBe("test2");
  });

  test("PUT /:id", async () => {
    const response = await request(app)
      .put(`${endpoint}/${id}`)
      .send({ title: "test3", completed: 1 });
    expect(response.statusCode).toBe(200);
    expect(response.body.affectedRows).toBe(1);
    const response2 = await request(app).get(`${endpoint}/${id}`);
    expect(response2.body.title).toBe("test3");
    expect(response2.body.completed).toBe(1);
  });

  test("DELETE /:id", async () => {
    const response = await request(app).delete(`${endpoint}/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.affectedRows).toBe(1);
    const response2 = await request(app).get(endpoint);
    expect(response2.body).toHaveLength(0);
  });
});

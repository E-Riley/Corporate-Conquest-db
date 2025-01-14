const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seed");
const data = require("../db/data/test-data");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/players", () => {
  test("200: Responds with an array of player objects with a key of player_name", () => {
    return request(app)
      .get("/api/players")
      .expect(200)
      .then(({ body }) => {
        expect(body.players).toHaveLength(4);
        body.players.forEach((player) => {
          expect(player).toMatchObject({
            player_name: expect.any(String),
          });
        });
      });
  });
});

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
            player_id: expect.any(Number),
            player_name: expect.any(String),
            email: expect.any(String),
            created_at: expect.any(String),
          });
        });
      });
  });
});

describe("POST /api/players", () => {
  test("201: responds with a newly created player object", () => {
    const newPlayer = {
      player_name: "mike",
      email: "mike@example.com",
      password: "MikesHashedPassword",
    };

    return request(app)
      .post(`/api/players`)
      .send(newPlayer)
      .expect(201)
      .then(({ body: { player } }) => {
        expect(player).toEqual(
          expect.objectContaining({
            player_name: "mike",
            email: "mike@example.com",
            password: "MikesHashedPassword",
          })
        );
      });
  });
});

describe("GET /api/classes", () => {
  test("200: Responds with an array of class objects with a key of class_name and description", () => {
    return request(app)
      .get("/api/classes")
      .expect(200)
      .then(({ body }) => {
        expect(body.playerClasses).toHaveLength(3);
        body.playerClasses.forEach((playerClass) => {
          expect(playerClass).toMatchObject({
            class_name: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/levels", () => {
  test("200: Responds with an array of level objects with a key of level_name and description", () => {
    return request(app)
      .get("/api/levels")
      .expect(200)
      .then(({ body }) => {
        expect(body.levels).toHaveLength(4);
        body.levels.forEach((level) => {
          expect(level).toMatchObject({
            level_name: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/leaderboard", () => {
  test("200: responds with a leaderboard object, sorted by score", () => {
    return request(app)
      .get("/api/leaderboard")
      .then(({ body: { entries } }) => {
        expect(entries).toHaveLength(4);
      });
  });

  test("200: Responds with an array of leaderboard entries filtered by level_id", () => {
    return request(app)
      .get(`/api/leaderboard?level_id=2`)
      .expect(200)
      .then(({ body: { entries } }) => {
        expect(entries).toBeInstanceOf(Array);
        entries.forEach((entry) => {
          expect(entry).toMatchObject({
            entry_id: expect.any(Number),
            player_id: expect.any(Number),
            level_id: 2,
            score: expect.any(Number),
          });
        });
      });
  });
});

describe("POST /api/leaderboard", () => {
  test("201: Responds with a newly created leaderboard entry", () => {
    const newEntry = {
      player_id: 1,
      level_id: 2,
      class_id: 1,
      score: 2500,
      completion_time: "00:02:33",
    };

    return request(app)
      .post("/api/leaderboard")
      .send(newEntry)
      .expect(201)
      .then(({ body: { entry } }) => {
        expect(entry).toEqual(
          expect.objectContaining({
            entry_id: expect.any(Number),
            player_id: 1,
            level_id: 2,
            class_id: 1,
            score: 2500,
            completion_time: "00:02:33",
          })
        );
      });
  });
});

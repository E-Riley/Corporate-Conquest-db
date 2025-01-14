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

describe("POST /api/players", () => {
  test("201: responds with a newly created player object", () => {
    const newPlayer = {
      player_name: "mike",
    };

    return request(app)
      .post(`/api/players`)
      .send(newPlayer)
      .expect(201)
      .then(({ body: { player } }) => {
        expect(player).toEqual(
          expect.objectContaining({
            player_name: "mike",
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
  test("200: Responds with an array of leaderboard objects", () => {
    return request(app)
      .get("/api/leaderboard")
      .expect(200)
      .then(({ body }) => {
        expect(body.leaderboards).toHaveLength(4);
        body.leaderboards.forEach((highScore) => {
          expect(highScore).toMatchObject({
            player_id: expect.any(Number),
            level_id: expect.any(Number),
            class_id: expect.any(Number),
            score: expect.any(Number),
            completion_time: expect.any(String),
          });
        });
      });
  });
});

describe("POST /api/leaderboard", () => {
  test("201: responds with a newly created player object", () => {
    const newScore = {
      player_id: 45,
      level_id: 1,
      class_id: 3,
      score: 1300,
      completion_time: "00:12:45",
    };

    return request(app)
      .post(`/api/leaderboard`)
      .send(newScore)
      .expect(201)
      .then(({ body: { leaderboards } }) => {
        expect(leaderboards).toEqual(
          expect.objectContaining({
            player_id: 45,
            level_id: 1,
            class_id: 3,
            score: 1300,
            completion_time: "00:12:45",
          })
        );
      });
  });
});

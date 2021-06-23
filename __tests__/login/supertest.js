const request = require("supertest");

const server = "http://localhost:3000";

describe("Route integration", () => {
  describe("/api/users", () => {
    describe("GET", () => {
      it("responds with 200 status and application/json content type", () => {
        return request(server)
          .get("/api/users")
          .expect("Content-Type", /application\/json/)
          .expect(200);
      });

      it("verifying response body contains users key with a defined value", () => {
        return request(server)
          .get("/api/users")
          .then((response) => {
            expect(response.body.users).not.toEqual(undefined);
          });
      });
    });

    describe("POST", () => {
      const user = {
        name: "test",
        username: "test",
        email: "test",
        password: "test",
        instruments: "piano",
        genres: "rock",
        skill: "amateur",
        location: "test",
        birthdate: "test",
        gender: "test",
      };
      const postBody = JSON.stringify(user);

      it("responds with 200 status and application/json content type", () => {
        return request(server)
          .post("/api/users")
          .set("Content-type", "application/json")
          .send(postBody)
          .expect("Content-Type", /application\/json/)
          .expect(200)
          .then((response) => {
            expect(response.body.skill).toEqual("amateur");
          });
      });
    });
  });

  describe("/api/users/25", () => {
    describe("GET", () => {
      it("findUser middleware returns correct user", () => {
        return request(server)
          .set("Cookie", "SSID=20")
          .get("/api/users/25")
          .then((response) => {
            expect(response.body).toEqual(undefined);
          });
      });
    });
  });

  describe("/verify/login", () => {
    describe("POST", () => {
      it("responds with 200 status and application/json content type", () => {
        return request(server)
          .post("/verify/login")
          .expect("Content-Type", /application\/json/)
          .expect(200);
      });

      it("verify json is in the body of response", () => {
        return request(server)
          .post("/verify/login")
          .set("Content-type", "application/json")
          .send({ username: "sdfsdf", password: "sdfsdf" })
          .expect("Content-Type", /application\/json/)
          .expect(200)
          .then((response) => {
            expect(response.body).not.toEqual(undefined);
          });
      });
      it("verify is true is in the body of response", () => {
        return request(server)
          .post("/verify/login")
          .set("Content-type", "application/json")
          .send({ username: "sdfsdf", password: "sdfsdf" })
          .expect("Content-Type", /application\/json/)
          .expect(200)
          .then((response) => {
            expect(response.body.valid).toEqual(true);
            expect(response.body.userId).not.toEqual(undefined);
          });
      });
      it("verify is false is in the body of response", () => {
        return request(server)
          .post("/verify/login")
          .set("Content-type", "application/json")
          .send({ username: "sdfsdf", password: "asdasdfasdfasf" })
          .expect("Content-Type", /application\/json/)
          .expect(200)
          .then((response) => {
            expect(response.body.valid).toEqual(false);
            expect(response.body.userId).toEqual(undefined);
          });
      });
    });
  });
});

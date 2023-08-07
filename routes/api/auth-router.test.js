import mongoose from "mongoose";
import request from "supertest";
import "dotenv/config";
import bcrypt from "bcryptjs";

import app from "../../app.js";
import User from "../../models/user.js";

const { PORT, DB_HOST_TEST } = process.env;

describe("test login route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
    server.close();
  });


  test("test register with correct data", async () => {
    const registerData = {
      email: "test06@mail.com",
      password: "123456",
    };
    const { statusCode, body } = await request(app)
      .post("/users/register")
      .send(registerData);

    expect(statusCode).toBe(201);
    expect(body).toHaveProperty("user"); 
    expect(body.user).toHaveProperty("email", registerData.email);
    expect(body.user).toHaveProperty("subscription", "starter");
    expect(body.user).toHaveProperty("avatarURL");
    
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
     expect(typeof body.user.avatarURL).toBe("string");

    const user = await User.findOne({ email: registerData.email });
    expect(user).toBeTruthy();
  });

  test("test login with correct data", async () => {
    const loginData = {
      email: "test06@mail.com",
      password: "123456",
    };

    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send(loginData);

    expect(statusCode).toBe(200);

    const user = await User.findOne({ email: loginData.email });

    expect(body).toHaveProperty("token");
    expect(body).toHaveProperty("user");

    expect(body.user).toHaveProperty("email");
    expect(body.user).toHaveProperty("subscription");

    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");

    expect(body.user.subscription).toBe(user.subscription);
    expect(body.user.email).toBe(user.email);
    expect(body.token).toBeDefined();
  });

  test("test login with incorrect data", async () => {
    const loginData = {
      email: "testnotexisted@mail.com",
      password: "wrongpassword",
    };

    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send(loginData);

    expect(statusCode).toBe(401);
    expect(body.message).toBe("Email or password is wrong");
  });
});

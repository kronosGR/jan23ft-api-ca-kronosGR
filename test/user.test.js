const express = require('express');
const request = require('supertest');

const URL = 'http://localhost:3000';

describe('Testing routes', () => {
  let token;
  let id;
  test('POST / Login - success', async () => {
    let userInfo = {
      email: 'geo.elgeo@gmail.com',
      password: '123456',
    };
    const { body } = await request(URL).post('/users/login').send(userInfo);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('token');
    token = body.data.token;
  });

  test('GET /todo - Get all todos', async () => {
    const { body } = await request(URL)
      .get('/todo')
      .set('Authorization', 'Bearer ' + token);

    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('result');
    expect(body.data.result.length).toBeGreaterThan(0);
  });

  test('POST /todo - Add new Todo', async () => {
    const { body } = await request(URL)
      .post('/todo')
      .send({
        name: 'Test Todo',
        description: 'A nice todo description',
        CategoryId: 6,
        StatusId: 1,
        UserId: 1,
      })
      .set('Authorization', 'Bearer ' + token);
    console.log(body.data);
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('result');
    expect(body.data.result).toHaveProperty('id');
    id = body.data.result.id;
  });
});

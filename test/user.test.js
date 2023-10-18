const express = require('express');
const request = require('supertest');

const URL = 'http://localhost:3000';

describe('Testing routes', () => {
  let token;
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
  });
});

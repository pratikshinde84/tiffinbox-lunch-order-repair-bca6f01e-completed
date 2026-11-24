const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../app');

test('GET /api/menu returns all 8 dishes', async () => {
  const res = await request(app).get('/api/menu');
  assert.equal(res.status, 200);
  assert.equal(res.body.length, 8);
});

test('GET /api/menu?veg=true returns only vegetarian dishes', async () => {
  const res = await request(app).get('/api/menu').query({ veg: 'true' });
  assert.equal(res.status, 200);
  assert.ok(res.body.length > 0);
  assert.ok(res.body.every((dish) => dish.isVeg === true));
  assert.equal(res.body.length, 4);
});

test('GET /api/menu?veg=false returns all dishes', async () => {
  const res = await request(app).get('/api/menu').query({ veg: 'false' });
  assert.equal(res.status, 200);
  assert.equal(res.body.length, 8);
});

test('POST /api/orders with a valid order returns 201 and the correct total', async () => {
  const res = await request(app).post('/api/orders').send({ dishId: 1, quantity: 2 });
  assert.equal(res.status, 201);
  assert.equal(res.body.dishId, 1);
  assert.equal(res.body.quantity, 2);
  assert.equal(res.body.total, 360);
  assert.equal(typeof res.body.id, 'number');
});

test('POST /api/orders with an unknown dishId returns 404 and does not store the order', async () => {
  const before = (await request(app).get('/api/orders')).body.length;
  const res = await request(app).post('/api/orders').send({ dishId: 999, quantity: 2 });
  assert.equal(res.status, 404);
  assert.equal(typeof res.body.error, 'string');
  assert.ok(res.body.error.length > 0);
  const after = (await request(app).get('/api/orders')).body.length;
  assert.equal(after, before);
});

test('POST /api/orders with quantity 0 returns 400 and does not store the order', async () => {
  const before = (await request(app).get('/api/orders')).body.length;
  const res = await request(app).post('/api/orders').send({ dishId: 1, quantity: 0 });
  assert.equal(res.status, 400);
  assert.equal(typeof res.body.error, 'string');
  assert.ok(res.body.error.length > 0);
  const after = (await request(app).get('/api/orders')).body.length;
  assert.equal(after, before);
});

test('POST /api/orders with quantity above 10 returns 400', async () => {
  const res = await request(app).post('/api/orders').send({ dishId: 1, quantity: 50 });
  assert.equal(res.status, 400);
  assert.equal(typeof res.body.error, 'string');
  assert.ok(res.body.error.length > 0);
});

test('POST /api/orders with a fractional quantity returns 400', async () => {
  const res = await request(app).post('/api/orders').send({ dishId: 1, quantity: 2.5 });
  assert.equal(res.status, 400);
  assert.equal(typeof res.body.error, 'string');
  assert.ok(res.body.error.length > 0);
});

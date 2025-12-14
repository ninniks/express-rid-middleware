import expressRidMiddleware from "../index.js";
import supertest from 'supertest';
import express from 'express';
import test from "node:test";

test( "Testing Express Rid Middleware without RID on headers",  async (t) => {
    const app = express();
    app.use(expressRidMiddleware())

    app.get('/', function(req, res) {
        res.status(200).json({ response: 'Index API call' });
    });

    await t.test('Should return 200', async () => {
        const res = await supertest(app).get('/')
        t.assert.equal(res.status, 200);
    })

    await t.test('Should return JSON response', async () => {
        const res = await supertest(app).get('/')
        t.assert.equal(res.headers['x-request-id'], undefined);
    })

    await t.test('Should not return x-request-id header', async () => {
        const res = await supertest(app).get('/')
        t.assert.equal(res.headers['x-request-id'], undefined);
    })

    await t.test('Should return rid in request object', async () => {
        const req = {};
        const res = {};
        const next = test.mock.fn();

        expressRidMiddleware()(req, res, next);
        t.assert.notEqual(req.context.rid, undefined);
    })
})

test('Testing Express Rid Middleware with RID on headers', async (t) => {
    const app = express();
    app.use(expressRidMiddleware({ setResponseHeader: true}))

    app.get('/', function(req, res) {
        res.status(200).json({ response: 'Index API call' });
    });

    await t.test('Should return defined x-request-id header', async () => {
        const res = await supertest(app).get('/')
        t.assert.notEqual(res.headers['x-request-id'], undefined);
    })
})
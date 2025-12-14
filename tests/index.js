import expressRidMiddleware from "../index.js";
import supertest from 'supertest';
import express from 'express';
import test, {it} from "node:test";

test( "Testing Express Rid Middleware without RID on headers", (t) => {
    const app = express();
    app.use(expressRidMiddleware())

    app.get('/', function(req, res) {
        res.status(200).json({ response: 'Index API call' });
    });

    it('Should return 200', async () => {
        const res = await supertest(app).get('/')
        t.assert.equal(res.status, 200);
    })

    it('Should not return x-request-id header', async () => {
        const res = await supertest(app).get('/')
        t.assert.equal(res.headers['x-request-id'], undefined);
    })

    it('Should not return x-request-id header', async () => {
        const res = await supertest(app).get('/')
        t.assert.equal(res.headers['x-request-id'], undefined);
    })

    it('Should return rid in request object', async () => {
        const req = {};
        const res = {};
        const next = test.mock.fn();

        expressRidMiddleware()(req, res, next);
        t.assert.notEqual(req.context.rid, undefined);
    })
})

test('Testing Express Rid Middleware with RID on headers', (t) => {
    const app = express();
    app.use(expressRidMiddleware({ setResponseHeader: true}))

    app.get('/', function(req, res) {
        res.status(200).json({ response: 'Index API call' });
    });

    it('Should return defined x-request-id header', async () => {
        const res = await supertest(app).get('/')
        t.assert.notEqual(res.headers['x-request-id'], undefined);
    })
})
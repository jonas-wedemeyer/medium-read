const dotenv = require('dotenv').config({ path: './.env' });
const request = require('supertest');

const mocks = require('./mocks');
const app = require('../app');
const db = require('../db');
const Article = require('../models/article');

const { articles } = mocks;

const dbUrl = process.env.NODE_ENV === 'test'
  ? process.env.DB_URL_TEST
  : 'mongodb://localhost:27017/testArticles';

describe('Articles Rest Api', () => {
  beforeAll(async () => {
    await db.connect(dbUrl, { useNewUrlParser: true }, (err) => {
      if (err) console.log(err); // eslint-disable-line no-console
      else console.log('Connected to the database.'); // eslint-disable-line no-console
    });
    await Article.deleteMany({});
    return Article.insertMany(articles);
  });

  afterAll(async () => {
    await Article.deleteMany({})
    return db.connection.close();
  });  

  describe('GET /articles', () => {
    test('should return all articles in json format and respond with 200 status code', (done) => {
      request(app.callback()).get('/articles')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(({ body }) => {
          expect(body.data.articles.length).toEqual(2);
          done();
        });
    });
  });

  // eslint-disable-next-line no-undef
  describe('GET /articles/:title', () => {
    test('should return article in json format if valid title is passed', (done) => {
      request(app.callback()).get(`/articles/${encodeURIComponent(articles[1].title)}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(({ body }) => {
          expect(body.data.article.title).toEqual(articles[1].title);
          done();
        });
    });

    test('should return an error in case an invalid title is passed', (done) => {
      request(app.callback()).get('/articles/fake-title')
        .expect(404)
        .then(() => done());
    });
  });

  describe('DELETE /articles/:id', () => {
    test('should delete an article if valid id is passed', async (done) => {
      const getResponse = await request(app.callback()).get('/articles');
      request(app.callback()).delete(`/articles/${getResponse.body.data.articles[0]._id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(({ body }) => {
          expect(body.data).toEqual(null);
        });
      
      const newResponse = await request(app.callback()).get('/articles');
      expect(newResponse.body.data.articles.length).toEqual(1);
      done();
    });

    test('should send 404 when id is not found', (done) => {
      request(app.callback()).delete('/articles/54759eb3c090d83494e2d804')
        .expect('Content-Type', /text/)
        .expect(404)
        .then((res) => {
          expect(res.text).toEqual('Not Found');
          done();
        });
    });
  });

  describe('POST /articles', () => {
    const art = articles[0];
    test('should post an article to the database and return it in the response body', async (done) => {
      request(app.callback()).post('/articles')
        .send(art)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .then(({ body }) => {
          expect(body.data.article).toMatchObject(art);
        })

      const newResponse = await request(app.callback()).get('/articles');
      expect(newResponse.body.data.articles.length).toEqual(2);
      done();
    });
  });

})

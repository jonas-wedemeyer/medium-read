const request = require('supertest');

const mocks = require('./mocks');
const app = require('../app');
const db = require('../db');
const Article = require('../models/article');

const articles = mocks.articles;

describe('Articles Rest Api', () => {
  
  beforeAll(async () => {
    await db.connect('mongodb://localhost:27017/testArticles', { useNewUrlParser: true, new: true }, (err) => {
      if (err) console.log('Error connecting to the database: ', err); // eslint-disable-line no-console
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
    test('should return all articles in json format and respond with 200 status code', done => {
      request(app.callback()).get('/articles')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body.length).toEqual(2);
          done();
        });
    });

  });

  describe('GET /articles/:title', () => {
    test('should return article in json format if valid title is passed', done => {
      request(app.callback()).get(`/articles/${encodeURIComponent(articles[1].title)}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body.title).toEqual(articles[1].title);
          done();
        });
    });

    test('should return an error in case an invalid title is passed', done => {
      request(app.callback()).get('/articles/FAKETITLE')
        .expect(404)
        .then(() => done());
    });
  });

  describe('POST /articles', () => {
    const art = articles[0];
    test('should post an article to the database and return it in the response body', done => {
      request(app.callback()).post('/articles')
        .send(art)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .then(res => {
          const { title, description, url, image, date_added, completed, deleted } = res.body;
          expect(title).toEqual(art.title)
          expect(description).toEqual(art.description)
          expect(url).toEqual(art.url)
          expect(image).toEqual(art.image)
          expect(date_added instanceof Date)
          expect(completed).toEqual(false)
          expect(deleted).toEqual(false)
          done();
        })
    });
  });

  describe('DELETE /articles/:id', () => {
    test('should delete an article if valid id is passed', async (done) => {
      const getResponse = await request(app.callback()).get('/articles');
      console.log('response body: ', getResponse.body);
      request(app.callback()).delete(`/articles/${getResponse.body[0]._id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body).toEqual({});
          done();
        });
    });
  });
})
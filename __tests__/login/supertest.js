const request = require('supertest');

const server = 'http://localhost:3000';

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
describe('Route integration', () => {
  // describe('/verify/login', () => {
  //   describe('POST', () => {
  //     // Note that we return the evaluation of `request` here! It evaluates to
  //     // a promise, so Jest knows not to say this test passes until that
  //     // promise resolves. See https://jestjs.io/docs/en/asynchronous
  //     it('responds with 200 status and text/html content type', () => {
  //       return request(server)
  //         .get('/verify/login')
  //         .expect('Content-Type', /text\/html/)
  //         .expect(200);
  //     });
  //   });
  // });

  describe('/verify/login', () => {
    describe('POST', () => {
      xit('responds with 200 status and application/json content type', () => {
        return request(server)
          .post('/verify/login')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });

      // For this test, you'll need to inspect the body of the response and
      // ensure it contains the markets list. Check the markets.dev.json file
      // in the dev database to get an idea of what shape you're expecting.
      it('verify json is in the body of response', () => {
        return request(server)
          .post('/verify/login')
          .set('Content-type', 'application/json')
          .send({username:'sdfsdf', password: 'sdfsdf'})
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then(response => {
            expect(response.body).not.toEqual(undefined);
          });
      });
      it('verify is true is in the body of response', () => {
        return request(server)
          .post('/verify/login')
          .set('Content-type', 'application/json')
          .send({username:'sdfsdf', password: 'sdfsdf'})
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then(response => {
            expect(response.body.valid).toEqual(true);
            expect(response.body.userId).not.toEqual(undefined);
          });
      });
      it('verify is false is in the body of response', () => {
        return request(server)
          .post('/verify/login')
          .set('Content-type', 'application/json')
          .send({username:'sdfsdf', password: 'asdasdfasdfasf'})
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then(response => {
            expect(response.body.valid).toEqual(false);
            expect(response.body.userId).toEqual(undefined);
          });
      });
    });
  });
});

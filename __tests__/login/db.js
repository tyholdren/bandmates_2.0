// const fs = require('fs');
// const path = require('path');
// const db = require('../../server/controllers/userController.js');


// describe('db unit tests', () => {
//   beforeAll((done) => {
//     fs.writeFile(testJsonFile, JSON.stringify([]), () => {
//       db.reset();
//       done();
//     });
//   });

//   afterAll((done) => {
//     fs.writeFile(testJsonFile, JSON.stringify([]), done);
//   });
//   describe('#sync', () => {
//     it('writes a valid marketList to the JSON file', () => {
//       const marketList = [{ location: 'here', cards: 11 }, { location: 'there', cards: 0 }];
//       const result = db.sync(marketList);
//       expect(result).not.toBeInstanceOf(Error);
//       const table = JSON.parse(fs.readFileSync(testJsonFile));
//       expect(table).toEqual(marketList);
//     });

//     // TODO: Finish unit testing the sync function

//     it('overwrites previously existing markets', () => {
//       const marketList = [{ location: 'something else', cards: 11 }, { location: 'other thing', cards: 0 }];
//       const result = db.sync(marketList);// storage
//       expect(result).not.toBeInstanceOf(Error);
//       const table = JSON.parse(fs.readFileSync(testJsonFile));
//       expect(table).toEqual(marketList);
//     });
//   });
// });
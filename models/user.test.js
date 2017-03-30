import {expect} from 'chai';
import User from './user';

describe('userSchema', () => {
  it('can have a first and last name', (done) => {
    let user = new User();
    user.firstName= "Andy";
    user.lastName= "Burns";
    user.email="myemail@gmail.com";
    user.validate((error, u) => {
      expect(error).to.not.exist;
      done();
    });
  });

  it('will error without an email', (done) => {
    let user = new User();

    user.validate((error, u) => {
      expect(error).to.exist;
      if (error){
        expect(error.errors.email).to.exist;
      }
      done();
    });
  });
});

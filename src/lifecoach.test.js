// following the test convention for our projects, this should be named
// LifeGoals.test.js and should be in the components folder next to LifeGoals.js
import {expect} from 'chai';
import LifeGoals from './components/LifeGoals';

describe('LifeGoals', () => {
  it('has a state', (done) => {
    let lifeGoal = new LifeGoals();
    expect(lifeGoal).to.exist;
    done();
  });
});

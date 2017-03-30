import {expect} from 'chai';
import LifeGoals from './components/LifeGoals';

describe('LifeGoals', () => {
  it('has a state', (done) => {
    let lifeGoal = new LifeGoals();
    expect(lifeGoal).to.exist;
    done();
  });
});

/* eslint-env mocha */
import {computeWalkingTime} from '../src/walking.js';
import expect from 'expect.js';


describe('tracktime', () => {

  describe('computeWalkingTime', () => {
    it('should return 0 if length is <= 0', () => {
      expect(computeWalkingTime(0, 42)).to.eql(0);
      expect(computeWalkingTime(-10, 9)).to.eql(0);
    });
  });

});

/* eslint-env mocha */
import {computeWalkingTime} from '../src/walking.js';
import expect from 'expect.js';


describe('tracktime', () => {

  describe('computeWalkingTime', () => {
    it('should return 0 if length is <= 0', () => {
      expect(computeWalkingTime(0, 42)).to.be.eql(0);
      expect(computeWalkingTime(-10, 9)).to.be.eql(0);
    });

    it('slope > 40% is clamped', () => {
      const below40 = computeWalkingTime(100, 30);
      const max = computeWalkingTime(100, 40);
      const above40 = computeWalkingTime(100, 50);
      expect(below40).to.be.below(max);
      expect(above40).to.be.eql(max);
    });

    it('slope < 40% is clamped', () => {
      const above40 = computeWalkingTime(100, -30);
      const max = computeWalkingTime(100, -40);
      const below40 = computeWalkingTime(100, -50);
      expect(below40).to.be.eql(max);
      expect(above40).to.be.below(max);
    });

  });

});

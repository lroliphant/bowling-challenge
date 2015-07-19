// * 2 throws in each frame (except the 10th where there is a possibility of 3 throws if a strike or spare was thrown in the 9th)
// * 1 - 9 frames
// * strike - if all 10 pins are knocked down on the 1st throw (throw1) - second throw is disabled
// * spare - if 10 pins are knocked down on the 2nd throw (throw2)
// * score if total pins knocked down in a frame is less than 10, the num of pins knocked down is throw1 + throw2 (returns a numeric score rather than a spare / or strike X)
// * 1 - 9 frames
// * 10th frame - if strike or spare thrown in previous go - 3 throws, if not - disable third throw

describe('Frame', function() {
  var frame;

  beforeEach(function() {
    frame = new Frame;
  });

  describe('detects when a frame is in progress', function() {
    it('is a new frame', function() {
      expect(frame.inProgress()).toBe(true);
    });

    it('after 1  throw', function() {
      frame.trackThrow(1);
      expect(frame.inProgress()).toBe(true);
    });
  });

  describe('detects when frame is over', function() {
    it('after 2 throws', function() {
      frame.trackThrow();
      frame.trackThrow();
      expect(frame.inProgress()).toBe(false);
    });

    it('after strike', function() {
      frame.trackThrow(10);
      expect(frame.inProgress()).toBe(false);
    });

    it('after spare', function() {
      frame.trackThrow(5);
      frame.trackThrow(5);
      expect(frame.inProgress()).toBe(false);
    });

  });

  describe('calculates cumulative score', function() {

    it('when throw is not spare or strike', function() {
      frame.trackThrow(1);
      frame.trackThrow(3);
      expect(frame.calculateScore()).toEqual(4)
    });

    it('when strike is thrown', function() {
      frame.trackThrow(10);
      expect(frame.calculateScore()).toEqual(10);
    });

  });

  describe('detects strike ', function() {

    it('after 1 throw', function() {
      frame.trackThrow(10);
      expect(frame.isStrike()).toBe(true);
    });

    it('but not after if 10 pins knocked down in 2nd throw', function() {
      frame.trackThrow(0);
      frame.trackThrow(10);
      expect(frame.isStrike()).toBe(false);
    });

  });

  describe('detects spare', function() {

    it('when 10 pins knocked down on 2nd throw', function() {
      frame.trackThrow(0);
      frame.trackThrow(10);
      expect(frame.isSpare()).toBe(true);
    });

  });



});
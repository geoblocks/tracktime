// Publicly avaiable formula from: https://www.randonner.ch/fr/signalisation/signalisation/temps-de-marche

const CS = [
  14.271,
  3.6991,
  2.5922,
  -1.4384,
  0.32105,
  0.81542,
  -0.090261,
  -0.20757,
  0.010192,
  0.028588,
  -0.00057466,
  -0.0021842,
  0.000015176,
  0.000086894,
  -0.00000013584,
  -0.0000014026
];

/**
 * Calculates the walking time of a segment.
 * @param {number} length Length in meters.
 * @param {number} heightDifference Height difference in meters.
 * @return {number} Walking time in seconds.
 */
export function computeWalkingTime(length, heightDifference) {
  if (length === 0) {
    return 0;
  }
  const slope10 = 10 * heightDifference / length;
  let minPerKm = 0; // walking speed in minutes per kilometer
  if (-4 < slope10 && slope10 < 4) {
    for (let i = 0, ii = CS.length; i < ii; i++) {
      minPerKm += CS[i] * Math.pow(slope10, i);
    }
  } else if (slope10 > 0) {
    minPerKm = 17 * slope10;
  } else {
    minPerKm = -9 * slope10;
  }
  const secondsPerMeter = 60 * minPerKm / 1000;
  return secondsPerMeter * length;
}

/**
 * Retrieve track properties like the total duration estimated for the track.
 * @param {Array<{ele: number, dist: number}>} trackProfile
 * @return {{distance: number, duration: number, ascent: number, descent: number, minElevation: number, maxElevation: number}}
 */
export function computeTrackProperties(trackProfile) {
  let minElevation = Number.MAX_SAFE_INTEGER;
  let maxElevation = Number.MIN_SAFE_INTEGER;
  let ascent = 0;
  let descent = 0;
  let lastDistance = 0;
  let duration = 0;
  let previousPoint = null;
  for (const currentPoint of trackProfile) {
    minElevation = Math.min(minElevation, currentPoint.ele);
    maxElevation = Math.max(maxElevation, currentPoint.ele);
    if (previousPoint !== null) {
      const elevationDiff = currentPoint.ele - previousPoint.ele;
      if (elevationDiff > 0) {
        ascent += elevationDiff;
      } else {
        descent -= elevationDiff;
      }
      const dist = currentPoint.dist - lastDistance;
      duration += computeWalkingTime(dist, elevationDiff);
    }
    previousPoint = currentPoint;
    lastDistance = currentPoint.dist;
  }
  const distance = lastDistance;
  return {
    distance,
    duration,
    ascent,
    descent,
    minElevation,
    maxElevation
  };
}

/**
 * Format seconds to human readable text in a compact form:
 * s, m or H:m (not m:s or H:m:s)
 */
export const humanReadableTimeFromSeconds = (seconds) => {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const totalMinutes = Math.floor(seconds / 60);
  let hours = Math.floor(totalMinutes / 60) || 0;
  const minutestoDisplay = totalMinutes % 60;
  let timeStr = ``;
  if (hours > 0) {
    timeStr += `${hours}h `;
  }
  timeStr += `${minutestoDisplay}m`;

  return timeStr;
};

export const setAqiInfo = (aqi) => {
  if (aqi < 51) return {
    color: 'green',
    message: 'Good',
  };
  if (aqi < 101) return {
    color: 'yellow',
    message: 'Moderate',
  };
  if (aqi < 151) return {
    color: 'orange',
    message: 'Unhealthy for Sensitive Groups',
  };
  if (aqi < 201) return {
    color: 'red',
    message: 'Unhealthy',
  };
  if (aqi >= 201) return {
    color: 'purple',
    message: 'Very Unhealthy',
  };
  return {
    color: 'black',
    message: 'Unknown',
  };
};

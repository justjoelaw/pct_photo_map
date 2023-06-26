const verifyLocation = (latitude, longitude, setValidLocation) => {
  if (!latitude || !longitude) {
    setValidLocation(false);
  } else if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    setValidLocation(false);
  } else {
    setValidLocation(true);
  }
};

export { verifyLocation };

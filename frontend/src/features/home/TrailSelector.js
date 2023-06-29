import React from 'react';
import { useState, useEffect } from 'react';
import { selectAllTrails } from '../trails/trailsApiSlice';
import { useSelector } from 'react-redux';
import L from 'leaflet';

const TrailSelector = ({ trails, trailId, setTrailId }) => {
  const handleTrailIdChange = (e) => {
    e.preventDefault();
    setTrailId(e.target.value);
  };

  const trailOptions = trails.map((trail) => {
    return (
      <option key={trail.id} value={trail.id}>
        {' '}
        {trail.name}
      </option>
    );
  });

  const content = (
    <div>
      <div>Which trail would you like to view entries for?</div>
      <form>
        <label htmlFor='trail'>Trail:</label>
        <select id='trail' name='trail' value={trailId} onChange={handleTrailIdChange}>
          {trailOptions}
        </select>
      </form>
    </div>
  );
  return content;
};

export default TrailSelector;

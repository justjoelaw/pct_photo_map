import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import JournalEntryMarker from './JournalEntryMarker';

function SetBoundsComponent({ bounds }) {
  const map = useMap();
  map.fitBounds(bounds);
  return null;
}

function TrailMap({ trailId, filteredJournalEntrys }) {
  const [coordinates, setCoordinates] = useState([[0, 0]]);
  const [bounds, setBounds] = useState([
    [0, 0],
    [10, 10],
  ]);
  const polylineRef = useRef(null);

  const addCoordinates = async (filename) => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/waypoints/${filename}.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch JSON data');
      }
      const jsonData = await response.json();
      const formattedCoordinates = jsonData.map((coord) => [coord.latitude, coord.longitude]);
      setCoordinates(formattedCoordinates);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    switch (trailId) {
      case '649a75b796071e8c915f1ccf':
        addCoordinates('pct_markers');
        break;
      case '649a8edd97f443abb40dc521':
        addCoordinates('at_markers');
        break;
      case '649acfcd6e38238813a0aada':
        addCoordinates('laugavegur_markers');
        break;
      default:
        addCoordinates('pct_markers');
        break;
    }
  }, [trailId]);

  useEffect(() => {
    const leafletPolyline = polylineRef.current;
    if (leafletPolyline) {
      const polylineBounds = leafletPolyline.getBounds();
      setBounds(polylineBounds);
    }
  }, [coordinates, trailId]);

  const journalEntryMarkers = filteredJournalEntrys.map((entry) => {
    return <JournalEntryMarker key={entry.id} entry={entry} />;
  });

  return (
    <MapContainer id='mapContainer' scrollWheelZoom={true}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {journalEntryMarkers}
      <Polyline positions={coordinates} ref={polylineRef} />
      <SetBoundsComponent bounds={bounds} />
    </MapContainer>
  );
}

export default TrailMap;

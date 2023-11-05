import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import styled from "styled-components";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGRyemFpYyIsImEiOiJjbG9qdmhsNWoyNHg0MmtxcHBoZG5ldG5kIn0.2qCfw7-HZV8pY4GqWiEnDw";

export const PriceBubble = styled.div<{ top: number; right: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  border-radius: 50%;
  background-color: #3871e0;
  height: 100px;
  font-size: 25px;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  color: white;
  position: absolute;
  top: ${({ top }) => top}px;
  right: ${({ right }) => right}px;
`;

interface LocationPickerProps {
  onPinChange?: (lng: number, lat: number) => void;
  isEditable?: boolean;
  lngLat?: { lng: number; lat: number };
  price?: number;
}
export const LocationPicker = ({
  onPinChange,
  isEditable,
  lngLat,
  price,
}: LocationPickerProps) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRef = useRef(null);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lngLat?.lng ?? 17.785, lngLat?.lat ?? 43.343],
      zoom: zoom,
    });

    if (lngLat) {
      markerRef.current = new mapboxgl.Marker()
        .setLngLat([lngLat.lng, lngLat.lat])
        .addTo(map.current);
    }

    // request permission to access user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (map.current) {
          if (!lngLat) {
            map.current.setCenter([
              position.coords.longitude,
              position.coords.latitude,
            ]);
          }
          // create a custom blue dot marker
          const marker = document.createElement("div");
          marker.id = "marker";
          marker.style.width = "40px";
          marker.style.height = "40px";
          marker.style.borderRadius = "50%";
          marker.style.backgroundColor = "#3871E055";

          // add marker to map
          new mapboxgl.Marker(marker)
            .setLngLat([position.coords.longitude, position.coords.latitude])
            .addTo(map.current);
        }
      },
      (error) => {
        console.log(error);
      }
    );

    map.current.on("move", () => {
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("click", (e) => {
      if (!isEditable) return;

      if (markerRef.current) {
        markerRef.current.remove();
      }

      markerRef.current = new mapboxgl.Marker()
        .setLngLat(e.lngLat)
        .addTo(map.current);

      onPinChange(e.lngLat.lng, e.lngLat.lat);
    });
  }, []);

  useEffect(() => {
    if (map.current && lngLat) {
      map.current.setCenter([lngLat.lng, lngLat.lat]);
      if (markerRef.current) {
        markerRef.current.remove();
      }
      markerRef.current = new mapboxgl.Marker()
        .setLngLat([lngLat.lng, lngLat.lat])
        .addTo(map.current);
    }
  }, [lngLat?.lat, lngLat?.lng]);

  return (
    <div style={{ position: "relative", width: "fit-content" }}>
      <div
        ref={mapContainer}
        style={{
          height: "400px",
          width: "700px",
          borderRadius: "20px",
          marginTop: "20px",
        }}
      />
      {!isEditable && (
        <PriceBubble top={-20} right={-40}>
          {price} €/h
        </PriceBubble>
      )}
    </div>
  );
};

"use client"

import { useEffect, useRef, useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

// Fix for default Leaflet icon in Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapProps {
  center: [number, number];
  onLocationChange: (lat: number, lng: number) => void;
  readOnly?: boolean;
}

interface LocationMarkerProps {
  position: { lat: number; lng: number } | null;
  setPosition: (pos: { lat: number; lng: number }) => void;
  readOnly: boolean;
  onLocationChange: (lat: number, lng: number) => void;
}

function LocationMarker({ position, setPosition, readOnly, onLocationChange }: LocationMarkerProps) {
  const markerRef = useRef<L.Marker | null>(null)
  
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const newPos = marker.getLatLng()
          setPosition(newPos)
          onLocationChange(newPos.lat, newPos.lng)
        }
      },
    }),
    [setPosition, onLocationChange],
  )

  useMapEvents({
    click(e) {
      if(!readOnly) {
        setPosition(e.latlng)
        onLocationChange(e.latlng.lat, e.latlng.lng)
      }
    },
  })

  return position === null ? null : (
    <Marker
      draggable={!readOnly}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={customIcon}
    >
      <Popup>Titik Pertemuan</Popup>
    </Marker>
  )
}

export default function MapComponent({ center, onLocationChange, readOnly = false }: MapProps) {
  const [position, setPosition] = useState<{lat: number, lng: number} | null>({ lat: center[0], lng: center[1] })

  useEffect(() => {
    setPosition({ lat: center[0], lng: center[1] })
  }, [center])

  return (
    <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden shadow-sm border border-gray-200">
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', minHeight: '300px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} readOnly={readOnly} onLocationChange={onLocationChange} />
      </MapContainer>
    </div>
  )
}

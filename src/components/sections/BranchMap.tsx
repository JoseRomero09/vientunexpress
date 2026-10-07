'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Marker, Popup, TileLayer } from 'react-leaflet';
import type { Branch } from '@/types';
import { MapRoot } from './MapRoot';

// Pines propios en /public: evita los iconos por defecto de Leaflet, cuyas rutas
// (marker-icon.png) no existen tras el bundling y dan 404 en consola.
const markerIcon = L.icon({
  iconUrl: '/images/map/marker.svg',
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -38],
});

const EL_SALVADOR_CENTER: L.LatLngExpression = [13.75, -88.9];

// Vista de RF8. flyTo, popup al seleccionar y filtrado de marcadores se conectan en T9.
export default function BranchMap({ branches }: { branches: Branch[] }) {
  return (
    <MapRoot center={EL_SALVADOR_CENTER} zoom={8} options={{ scrollWheelZoom: false }} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {branches.map((branch) => (
        <Marker key={branch.id} position={[branch.lat, branch.lng]} icon={markerIcon} title={branch.name}>
          <Popup>
            <strong>{branch.name}</strong>
            <br />
            {branch.address}, {branch.municipality}
            <br />
            {branch.schedule}
          </Popup>
        </Marker>
      ))}
    </MapRoot>
  );
}

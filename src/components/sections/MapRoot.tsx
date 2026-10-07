'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import L from 'leaflet';
import { LeafletContext, createLeafletContext, type LeafletContextInterface } from '@react-leaflet/core';

interface MapRootProps {
  center: L.LatLngExpression;
  zoom: number;
  className?: string;
  options?: L.MapOptions;
  children: ReactNode;
}

/**
 * Reemplazo de <MapContainer> de react-leaflet 5.
 *
 * MapContainer crea el mapa en un ref callback pero lo destruye en un useEffect: cuando React
 * desconecta y reconecta efectos sin desmontar (StrictMode en desarrollo, Fast Refresh, <Activity>),
 * el mapa queda destruido mientras el contexto sigue apuntándolo y TileLayer falla con
 * "Cannot read properties of undefined (reading 'appendChild')".
 *
 * Aquí la vida del mapa va atada al nodo con un ref callback con limpieza (React 19): se crea al
 * conectar el <div> y se destruye al desconectarlo, siempre en pares.
 */
export function MapRoot({ center, zoom, className, options, children }: MapRootProps) {
  const [context, setContext] = useState<LeafletContextInterface | null>(null);
  // Solo importan los valores iniciales: después la vista se controla con la API del mapa (useMap).
  const initial = useRef({ center, zoom, options });

  const attach = useCallback((node: HTMLDivElement) => {
    const { center: initialCenter, zoom: initialZoom, options: mapOptions } = initial.current;
    const map = L.map(node, mapOptions).setView(initialCenter, initialZoom);
    setContext(createLeafletContext(map));
    return () => {
      setContext(null);
      map.remove();
    };
  }, []);

  return (
    <div ref={attach} className={className}>
      {context && <LeafletContext value={context}>{children}</LeafletContext>}
    </div>
  );
}

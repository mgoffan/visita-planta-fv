'use client';

/* oxlint-disable next/no-img-element */

import { useEffect, useMemo, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import type { Map as MapLibreMap } from 'maplibre-gl';
import type { FeatureCollection, LineString } from 'geojson';
import { ArrowLeft, ArrowRight, Building2, Camera, ClipboardCheck, Compass, Expand, Factory, Layers3, MapPin, Route, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { photoSrc, plantCenter, tourStops } from './tour-data';

const mapStyle: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors',
    },
  },
  layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
};

export function FactoryTour() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);
  const activeStop = tourStops[activeIndex];
  const totalPhotos = tourStops.reduce((total, stop) => total + stop.photos.length, 0);

  const routeGeoJson = useMemo<FeatureCollection<LineString>>(
    () => ({
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {},
        geometry: { type: 'LineString', coordinates: tourStops.map((stop) => stop.coordinates) },
      }],
    }),
    [],
  );

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: plantCenter,
      zoom: 16.25,
      pitch: 25,
      bearing: -7,
      attributionControl: false,
      maxZoom: 19,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'bottom-left');
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left');

    map.on('load', async () => {
      const response = await fetch('data/buildings.geojson');
      const buildings = (await response.json()) as FeatureCollection;
      map.addSource('buildings', { type: 'geojson', data: buildings });
      map.addLayer({
        id: 'building-fill', type: 'fill', source: 'buildings',
        paint: {
          'fill-color': ['case', ['!=', ['get', 'name'], 'Edificio'], '#178b8f', '#64748b'],
          'fill-opacity': ['case', ['!=', ['get', 'name'], 'Edificio'], 0.42, 0.16],
          'fill-outline-color': '#0f4c5c',
        },
      });
      map.addLayer({
        id: 'building-label', type: 'symbol', source: 'buildings',
        filter: ['!=', ['get', 'name'], 'Edificio'],
        layout: {
          'text-field': ['get', 'name'], 'text-size': 11,
          'text-allow-overlap': false, 'text-transform': 'uppercase',
        },
        paint: { 'text-color': '#073b4c', 'text-halo-color': '#ffffff', 'text-halo-width': 1.5 },
      });
      map.addSource('route', { type: 'geojson', data: routeGeoJson });
      map.addLayer({
        id: 'route-line-casing', type: 'line', source: 'route',
        paint: { 'line-color': '#ffffff', 'line-width': 7, 'line-opacity': 0.85 },
      });
      map.addLayer({
        id: 'route-line', type: 'line', source: 'route',
        paint: { 'line-color': '#f97316', 'line-width': 3, 'line-dasharray': [1.5, 1.2] },
      });

      tourStops.forEach((stop, index) => {
        const button = document.createElement('button');
        button.className = `tour-marker ${index === 0 ? 'is-active' : ''}`;
        button.type = 'button';
        button.setAttribute('aria-label', `Parada ${index + 1}: ${stop.title}`);
        button.dataset.index = String(index);
        button.innerHTML = `<span>${index + 1}</span>`;
        button.addEventListener('click', () => { setActiveIndex(index); setPanelOpen(true); });
        markersRef.current.push(
          new maplibregl.Marker({ element: button, anchor: 'center' }).setLngLat(stop.coordinates).addTo(map),
        );
      });
    });

    mapRef.current = map;
    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, [routeGeoJson]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    document.querySelectorAll<HTMLButtonElement>('.tour-marker').forEach((marker) => {
      marker.classList.toggle('is-active', Number(marker.dataset.index) === activeIndex);
    });
    map.flyTo({
      center: activeStop.coordinates,
      zoom: 17.35,
      pitch: 34,
      duration: 1100,
      essential: true,
      padding: { top: 90, right: panelOpen ? 420 : 40, bottom: 80, left: 40 },
    });
  }, [activeIndex, activeStop.coordinates, panelOpen]);

  const selectStop = (index: number) => {
    setActiveIndex((index + tourStops.length) % tourStops.length);
    setPanelOpen(true);
  };

  const fitTour = () => {
    const bounds = tourStops.reduce(
      (current, stop) => current.extend(stop.coordinates),
      new maplibregl.LngLatBounds(tourStops[0].coordinates, tourStops[0].coordinates),
    );
    mapRef.current?.fitBounds(bounds, {
      padding: { top: 110, right: panelOpen ? 430 : 70, bottom: 90, left: 70 }, duration: 900,
    });
  };

  return (
    <main className="tour-shell">
      <div ref={mapContainer} className="map-canvas" aria-label="Mapa interactivo de la planta FV" />

      <header className="topbar">
        <div className="brand-mark" aria-hidden="true"><Factory /></div>
        <div className="brand-copy"><p>FV · Planta Villa Rosa</p><h1>Visita industrial</h1></div>
        <div className="tour-progress" aria-label={`Parada ${activeIndex + 1} de ${tourStops.length}`}>
          <span>{String(activeIndex + 1).padStart(2, '0')}</span>
          <div className="progress-track"><i style={{ width: `${((activeIndex + 1) / tourStops.length) * 100}%` }} /></div>
          <span>{String(tourStops.length).padStart(2, '0')}</span>
        </div>
        <Button variant="outline" size="lg" className="map-overview-button" onClick={fitTour}>
          <Route data-icon="inline-start" /> Ver recorrido
        </Button>
      </header>

      <nav className="stop-rail" aria-label="Paradas de la visita">
        {tourStops.map((stop, index) => (
          <button key={stop.id} className={index === activeIndex ? 'active' : ''}
            onClick={() => selectStop(index)} aria-current={index === activeIndex ? 'step' : undefined}>
            <span>{index + 1}</span><strong>{stop.title}</strong>
          </button>
        ))}
      </nav>

      {!panelOpen && <button className="reopen-panel" onClick={() => setPanelOpen(true)}><Compass /> Continuar visita</button>}

      <aside className={`tour-panel ${panelOpen ? 'is-open' : ''}`} aria-label="Detalle de la parada">
        <button className="panel-close" onClick={() => setPanelOpen(false)} aria-label="Cerrar detalle"><X /></button>
        <div className="panel-scroll">
          <div className="stop-heading">
            <div className="stop-number">{String(activeIndex + 1).padStart(2, '0')}</div>
            <div><p className="eyebrow">{activeStop.kicker}</p><h2>{activeStop.title}</h2></div>
          </div>
          <div className="location-row">
            <span><Building2 /> Nave {activeStop.building}</span>
            <span className="status-pill"><MapPin /> ubicación orientativa</span>
          </div>
          <p className="stop-description">{activeStop.description}</p>
          <div className="observation-card">
            <div className="observation-title"><ClipboardCheck /> Lo que observamos</div>
            <ul>
              {activeStop.observations.map((observation) => <li key={observation}>{observation}</li>)}
            </ul>
          </div>
          <button className="hero-photo" onClick={() => setLightboxPhoto(activeStop.photos[0])}>
            <img src={photoSrc(activeStop.photos[0])} alt={`${activeStop.title}: vista principal`} />
            <span><Expand /> Ampliar</span>
          </button>
          {activeStop.photos.length > 1 && (
            <div className="photo-grid" aria-label={`Fotos de ${activeStop.title}`}>
              {activeStop.photos.slice(1).map((photo, index) => (
                <button key={photo} onClick={() => setLightboxPhoto(photo)}>
                  <img src={photoSrc(photo)} alt={`${activeStop.title}, imagen ${index + 2}`} loading="lazy" />
                </button>
              ))}
            </div>
          )}
          <div className="source-note">
            <Layers3 /><p><strong>Mapa abierto</strong> Contornos de OpenStreetMap. Las fotos de WhatsApp no conservan GPS; la nave indicada es una primera asignación para validar.</p>
          </div>
        </div>
        <footer className="panel-footer">
          <Button variant="outline" size="lg" onClick={() => selectStop(activeIndex - 1)} aria-label="Parada anterior"><ArrowLeft /></Button>
          <div><span>Siguiente</span><strong>{tourStops[(activeIndex + 1) % tourStops.length].title}</strong></div>
          <Button size="lg" onClick={() => selectStop(activeIndex + 1)} aria-label="Siguiente parada"><ArrowRight /></Button>
        </footer>
      </aside>

      <div className="legend-card">
        <span><i className="legend-route" /> Recorrido</span>
        <span><i className="legend-building" /> Naves</span>
        <span><Camera /> {totalPhotos} fotos</span>
      </div>

      <Dialog open={lightboxPhoto !== null} onOpenChange={(open) => !open && setLightboxPhoto(null)}>
        <DialogContent className="photo-dialog" showCloseButton>
          <DialogTitle>{activeStop.title}</DialogTitle>
          <DialogDescription>Registro fotográfico de la visita a la planta.</DialogDescription>
          {lightboxPhoto && <img src={photoSrc(lightboxPhoto)} alt={`Detalle de ${activeStop.title}`} />}
        </DialogContent>
      </Dialog>
    </main>
  );
}

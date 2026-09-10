export type TourStop = {
  id: string;
  title: string;
  building: string;
  coordinates: [number, number];
  kicker: string;
  description: string;
  photos: string[];
  locationStatus: 'provisional' | 'verified';
};

export const plantCenter: [number, number] = [-58.8547873, -34.4207543];

export const tourStops: TourStop[] = [
  {
    id: 'prensado', title: 'Prensado y conformado', building: 'PRENSADO',
    coordinates: [-58.85281, -34.41995], kicker: 'Del tubo a la primera geometría',
    description: 'La visita comienza con la preparación y el conformado de componentes. Las imágenes muestran materiales en proceso, prensas, herramientas y controles de operación.',
    photos: ['01', '02', '03', '04', '05'], locationStatus: 'provisional',
  },
  {
    id: 'fundicion', title: 'Fundición y control inicial', building: 'HORNOS',
    coordinates: [-58.85286, -34.42208], kicker: 'Formar, revisar y aprender del defecto',
    description: 'Moldes y piezas fundidas permiten observar cómo se controla la calidad desde el origen. El listado visual de defectos convierte la experiencia del proceso en un estándar compartido.',
    photos: ['06', '07'], locationStatus: 'provisional',
  },
  {
    id: 'mecanizado', title: 'Mecanizado CNC', building: 'MECOL',
    coordinates: [-58.85288, -34.42155], kicker: 'Precisión repetible en cada componente',
    description: 'Planos, tiempos de puesta en marcha, dispositivos y centros CNC muestran la disciplina necesaria para transformar las piezas y sostener tolerancias de fabricación.',
    photos: ['08', '09', '10', '11', '12', '15'], locationStatus: 'provisional',
  },
  {
    id: 'plasticos', title: 'Componentes plásticos', building: 'PLASTICO',
    coordinates: [-58.85279, -34.41956], kicker: 'Procesos complementarios dentro de la planta',
    description: 'La fabricación integra también componentes plásticos y tareas de preparación, con puestos específicos y circulación de materiales dentro del flujo general.',
    photos: ['13'], locationStatus: 'provisional',
  },
  {
    id: 'galvanoplastia', title: 'Tratamiento de superficies', building: 'GALVO',
    coordinates: [-58.85388, -34.41851], kicker: 'Protección y terminación superficial',
    description: 'Las piezas avanzan suspendidas por una línea de tratamiento. Esta etapa prepara y protege la superficie antes de los controles y terminaciones finales.',
    photos: ['14'], locationStatus: 'provisional',
  },
  {
    id: 'laboratorio', title: 'Laboratorio', building: 'GALVO',
    coordinates: [-58.85362, -34.41866], kicker: 'Verificación antes de liberar el proceso',
    description: 'El laboratorio acompaña la producción con mediciones y ensayos. La observación del trabajo analítico conecta los parámetros del proceso con el resultado final.',
    photos: ['16', '17'], locationStatus: 'provisional',
  },
  {
    id: 'acabados', title: 'Acabados y mejora continua', building: 'MONTAJE',
    coordinates: [-58.85508, -34.41988], kicker: 'Orden visual en el tramo final',
    description: 'El sector de acabados hace visible la gestión cotidiana: información del área, seguridad, criterios Lean y seguimiento de novedades en el lugar de trabajo.',
    photos: ['18'], locationStatus: 'provisional',
  },
  {
    id: 'logistica', title: 'Almacén y trazabilidad', building: 'ALMACEN',
    coordinates: [-58.85439, -34.41978], kicker: 'Identificar, ordenar y preparar la salida',
    description: 'Racks, etiquetas y unidades de carga muestran cómo el flujo físico se apoya en identificación visual, orden y trazabilidad para llegar al siguiente proceso.',
    photos: ['19', '20', '21'], locationStatus: 'provisional',
  },
];

export const photoSrc = (photo: string) => `photos/photo-${photo}.webp`;

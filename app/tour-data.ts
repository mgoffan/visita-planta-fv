export type TourStop = {
  id: string;
  title: string;
  building: string;
  coordinates: [number, number];
  kicker: string;
  description: string;
  observations: string[];
  photos: string[];
  locationStatus: 'provisional' | 'verified';
};

export const plantCenter: [number, number] = [-58.8547873, -34.4207543];

export const tourStops: TourStop[] = [
  {
    id: 'prensado', title: 'Prensado y conformado', building: 'PRENSADO',
    coordinates: [-58.85281, -34.41995], kicker: 'Del tubo a la primera geometría',
    description: 'La visita comienza con la preparación y el conformado de componentes. El sector combina operaciones manuales y equipos de prensado para obtener las primeras geometrías antes del mecanizado.',
    observations: ['Piezas y tubos se agrupan por orden antes de avanzar.', 'Las herramientas de corte se identifican y almacenan visualmente.', 'Los controles de máquina integran operación automática y parada de emergencia.'],
    photos: ['01', '02', '03', '04', '05'], locationStatus: 'provisional',
  },
  {
    id: 'fundicion', title: 'Fundición y control inicial', building: 'HORNOS',
    coordinates: [-58.85286, -34.42208], kicker: 'Formar, revisar y aprender del defecto',
    description: 'Moldes y piezas fundidas permiten observar cómo se controla la calidad desde el origen. El listado visual de defectos convierte la experiencia del proceso en un estándar compartido para actuar antes de sumar valor.',
    observations: ['El control visual clasifica plegaduras, rechupes, cenizas y uniones en frío.', 'Las piezas defectuosas se comparan con ejemplos visibles en el puesto.', 'Los moldes identificados permiten rastrear lotes y referencias.'],
    photos: ['06', '07'], locationStatus: 'provisional',
  },
  {
    id: 'colada-continua', title: 'Colada continua y coquillas', building: 'HORNOS',
    coordinates: [-58.85266, -34.42196], kicker: 'Automatización, energía y repetibilidad',
    description: 'En esta etapa el metal alimenta moldes permanentes o coquillas para formar cuerpos y componentes. Las nuevas imágenes conectan el herramental, las piezas obtenidas y la operación del horno en una misma secuencia.',
    observations: ['Un control enciende y apaga el horno automáticamente cada 3 minutos.', 'La mejora, informada como terminada y actualizada en septiembre de 2025, busca reducir hasta 6% el consumo de energía eléctrica del proceso.', 'Coquillas, bandejas y piezas se identifican para ordenar el flujo y sostener la repetibilidad.'],
    photos: ['22', '23', '24', '25', '26', '27', '28'], locationStatus: 'provisional',
  },
  {
    id: 'mecanizado', title: 'Mecanizado CNC', building: 'MECOL',
    coordinates: [-58.85288, -34.42155], kicker: 'Precisión repetible en cada componente',
    description: 'Planos, tiempos de puesta en marcha, dispositivos y centros CNC muestran la disciplina necesaria para transformar las piezas y sostener tolerancias de fabricación.',
    observations: ['Cada puesto mantiene plano, método y hoja de registro junto al equipo.', 'Los centros CNC requieren calentamientos documentados de 10 a 20 minutos según la máquina.', 'Las piezas se separan e identifican antes de pasar al proceso siguiente.'],
    photos: ['08', '09', '10', '11', '12', '15'], locationStatus: 'provisional',
  },
  {
    id: 'plasticos', title: 'Componentes plásticos', building: 'PLASTICO',
    coordinates: [-58.85279, -34.41956], kicker: 'Procesos complementarios dentro de la planta',
    description: 'La fabricación integra también componentes plásticos y tareas de preparación, con puestos específicos y circulación de materiales dentro del flujo general.',
    observations: ['Los rollos se preparan y cortan en una celda dedicada.', 'El abastecimiento se mantiene junto al puesto para reducir movimientos.'],
    photos: ['13'], locationStatus: 'provisional',
  },
  {
    id: 'galvanoplastia', title: 'Tratamiento de superficies', building: 'GALVO',
    coordinates: [-58.85388, -34.41851], kicker: 'Protección y terminación superficial',
    description: 'Las piezas avanzan suspendidas por una línea de tratamiento. Esta etapa prepara y protege la superficie antes de los controles y terminaciones finales.',
    observations: ['Las piezas viajan colgadas en bastidores para exponer su superficie.', 'La manipulación se integra a una línea automatizada de proceso.'],
    photos: ['14'], locationStatus: 'provisional',
  },
  {
    id: 'laboratorio', title: 'Laboratorio', building: 'GALVO',
    coordinates: [-58.85362, -34.41866], kicker: 'Verificación antes de liberar el proceso',
    description: 'El laboratorio acompaña la producción con mediciones y ensayos. La observación del trabajo analítico conecta los parámetros del proceso con el resultado final.',
    observations: ['El sector utiliza material volumétrico y análisis de laboratorio.', 'Los resultados permiten ajustar condiciones del tratamiento superficial.'],
    photos: ['16', '17'], locationStatus: 'provisional',
  },
  {
    id: 'acabados', title: 'Acabados y mejora continua', building: 'MONTAJE',
    coordinates: [-58.85508, -34.41988], kicker: 'Orden visual en el tramo final',
    description: 'El sector de acabados hace visible la gestión cotidiana: información del área, seguridad, criterios Lean y seguimiento de novedades en el lugar de trabajo.',
    observations: ['La cartelera combina información semanal, seguridad y estándares Lean.', 'El código de colores diferencia entrada, salida, material no conforme y desperdicio.', 'La práctica 5S ordena, limpia, estandariza y sostiene el puesto.'],
    photos: ['18'], locationStatus: 'provisional',
  },
  {
    id: 'logistica', title: 'Almacén y trazabilidad', building: 'ALMACEN',
    coordinates: [-58.85439, -34.41978], kicker: 'Identificar, ordenar y preparar la salida',
    description: 'Racks, etiquetas y unidades de carga muestran cómo el flujo físico se apoya en identificación visual, orden y trazabilidad para llegar al siguiente proceso.',
    observations: ['Cada contenedor lleva identificación visible de pieza y orden.', 'Los racks aprovechan la altura y separan referencias.', 'Los pasillos marcados mantienen la circulación despejada.'],
    photos: ['19', '20', '21'], locationStatus: 'provisional',
  },
];

export const photoSrc = (photo: string) => `photos/photo-${photo}.webp`;

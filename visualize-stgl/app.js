require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/SubtypeGroupLayer",
  "esri/widgets/LayerList",
], (Map, MapView, SubtypeGroupLayer, LayerList) => {

  const map = new Map({
    basemap: "streets-night-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 4,
    center: [-90, 34]
  });

  const webStyleSymbolUrl = "https://arcgis.com/sharing/rest/content/items/beb787401c41401ba1eef6ce161d6664/data";

  // create web style symbol from the symbol name
  function createMarineSymbol(name) {
    return {
      type: "simple",
      symbol: {
        type: "web-style",  // autocasts as new WebStyleSymbol()
        styleUrl: webStyleSymbolUrl,
        name: name
      }
    }
  }

  const turtleUniqueValueRenderer = {
    type: "unique-value",  // autocasts as a UniqueValueRenderer,
    field: "TURTLE_SPECIES",
    defaultSymbol: {
      type: "simple-marker",  // autocasts as a SimpleMarkerSymbol()
      style: "circle",
      color: "#ED9310",
      size: 6
    },
    uniqueValueInfos: [
      {
        value: "caretta",
        symbol: {
          type: "simple-marker",
          style: "circle",
          color: "#D9351A",
          size: 6
        }
      }, {
        value: "kempii",
        symbol: {
          type: "simple-marker",
          style: "circle",
          color: "#FFC730",
          size: 6
        }
      }, {
        value: "imbricata",
        symbol: {
          type: "simple-marker",
          style: "circle",
          color: "#2C6954",
          size: 6
        }
      }, {
        value: "coriacea",
        symbol: {
          type: "simple-marker",
          style: "circle",
          color: "#8C213F",
          size: 6
        }
      }
    ]
  }

  const sublayers = [
    {
      subtypeCode: 0, // Unknown
      visible: true,
      renderer: createMarineSymbol("Unkown"),
      title: "Unknown"
    }, {
      subtypeCode: 1, // Fish
      visible: true,
      renderer: createMarineSymbol("Fish"),
      title: "Fish"
    }, {
      subtypeCode: 2, // Dolphin
      visible: true,
      renderer: createMarineSymbol("Dolphin"),
      title: "Dolphin"
    }, {
      subtypeCode: 3, // Whale
      visible: true,
      renderer: createMarineSymbol("Whale"),
      title: "Whale",
      minScale: 10000000,
    }, {
      subtypeCode: 4, // Crab
      visible: true,
      renderer: createMarineSymbol("Crab"),
      title: "Crab"
    }, {
      subtypeCode: 5, // Lobster
      visible: true,
      renderer: createMarineSymbol("Lobster"),
      title: "Lobster"
    }, {
      subtypeCode: 6, // Seal/Sea Lion
      visible: true,
      renderer: createMarineSymbol("SealSeaLion"),
      title: "Seal/Sea Lion"
    }, {
      subtypeCode: 7, // Manatee
      visible: true,
      renderer: createMarineSymbol("Manatee"),
      title: "Manatee"
    }, {
      subtypeCode: 8, // Oyster/Clam
      visible: true,
      renderer: createMarineSymbol("OysterClam"),
      title: "Oyster/Clam"
    }, {
      subtypeCode: 9, // Turtle
      visible: true,
      renderer: turtleUniqueValueRenderer,
      title: "Turtle"
    }, {
      subtypeCode: 10, // Echinoderm
      visible: false,
      renderer: createMarineSymbol("Echinoderm"),
      title: "Echinoderm"
    }
  ];

  // initializing a SubtypeGroupLayer
  const stgl = new SubtypeGroupLayer({
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/MarineLife/FeatureServer/0",
    outFields: ['*'],
    sublayers: sublayers
  });

  map.add(stgl);

  // initializing the LayerList widget
  const layerList = new LayerList({
    view: view
  });
  // add the widget to the view
  view.ui.add(layerList, "top-right");

});
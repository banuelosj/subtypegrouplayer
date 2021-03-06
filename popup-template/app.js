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
    zoom: 5,
    center: [-90, 28]
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

  const fishPopupTemplate = {
    title: "WildLife Fish - SubtypeCode: {TYPE}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "REGION",
            label: "Region"
          },
          {
            fieldName: "SANCTUARY",
            label: "WildLife Sanctuary Nearby"
          },
          {
            fieldName: "FISH_PROTECTED_HABITAT",
            label: "Nearby Protected Habitat"
          }
        ]
      }
    ]
  };

  const whalePopupTemplate = {
    title: "WildLife Whale - SubtypeCode: {TYPE}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "REGION",
            label: "Region"
          },
          {
            fieldName: "SANCTUARY",
            label: "WildLife Sanctuary Nearby"
          },
          {
            fieldName: "WHALE_HABITAT_LOC",
            label: "Nearby Whale Habitat"
          }
        ]
      }
    ]
  };

  const turtlePopupTemplate = {
    title: "WildLife Turtle - SubtypeCode: {TYPE}",
    content: `This turtle species is - {TURTLE_SPECIES}`
  };

  const defaultPopupTemplate = {
    title: "WildLife Animal - SubtypeCode: {TYPE}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "REGION",
            label: "Region"
          },
          {
            fieldName: "SANCTUARY",
            label: "WildLife Sanctuary Nearby"
          }
        ]
      }
    ]
  };

  const sublayers = [
    {
      subtypeCode: 0, // Unknown
      visible: true,
      renderer: createMarineSymbol("Unkown"),
      title: "Unknown",
      popupTemplate: defaultPopupTemplate
    }, {
      subtypeCode: 1, // Fish
      visible: true,
      renderer: createMarineSymbol("Fish"),
      title: "Fish",
      popupTemplate: fishPopupTemplate
    }, {
      subtypeCode: 2, // Dolphin
      visible: true,
      renderer: createMarineSymbol("Dolphin"),
      title: "Dolphin",
      popupTemplate: defaultPopupTemplate
    }, {
      subtypeCode: 3, // Whale
      visible: true,
      renderer: createMarineSymbol("Whale"),
      title: "Whale",
      minScale: 10000000,
      popupTemplate: whalePopupTemplate
    }, {
      subtypeCode: 4, // Crab
      visible: true,
      renderer: createMarineSymbol("Crab"),
      title: "Crab",
      popupTemplate: defaultPopupTemplate
    }, {
      subtypeCode: 5, // Lobster
      visible: true,
      renderer: createMarineSymbol("Lobster"),
      title: "Lobster",
      popupTemplate: defaultPopupTemplate
    }, {
      subtypeCode: 6, // Seal/Sea Lion
      visible: true,
      renderer: createMarineSymbol("SealSeaLion"),
      title: "Seal/Sea Lion",
      popupTemplate: defaultPopupTemplate
    }, {
      subtypeCode: 7, // Manatee
      visible: true,
      renderer: createMarineSymbol("Manatee"),
      title: "Manatee",
      popupTemplate: defaultPopupTemplate
    }, {
      subtypeCode: 8, // Oyster/Clam
      visible: true,
      renderer: createMarineSymbol("OysterClam"),
      title: "Oyster/Clam",
      popupTemplate: defaultPopupTemplate
    }, {
      subtypeCode: 9, // Turtle
      visible: true,
      renderer: createMarineSymbol("Turtle"),
      title: "Turtle",
      popupTemplate: turtlePopupTemplate
    }, {
      subtypeCode: 10, // Echinoderm
      visible: false,
      renderer: createMarineSymbol("Echinoderm"),
      title: "Echinoderm",
      popupTemplate: defaultPopupTemplate
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
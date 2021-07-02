require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/SubtypeGroupLayer",
  "esri/widgets/LayerList"
], (Map, MapView, SubtypeGroupLayer, LayerList) => {

  const map = new Map({
    basemap: "topo"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 4,
    center: [-90, 34]
  });

  // initializing a SubtypeGroupLayer
  const stgl = new SubtypeGroupLayer({
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/MarineLife/FeatureServer/0",
    outFields: ['*']
  });

  map.add(stgl);

  // initializing the LayerList widget
  const layerList = new LayerList({
    view: view
  });
  // add the widget to the view
  view.ui.add(layerList, "top-right");
});
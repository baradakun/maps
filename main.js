require([
  "esri/layers/GeoJSONLayer",
  "esri/widgets/Search"
], function(GeoJSONLayer, Search) {
  const arcgisMap = document.querySelector("arcgis-map");

  arcgisMap.addEventListener("arcgisViewReadyChange", () => {
    const view = arcgisMap.view;

    // 観光地レイヤ
    const layer = new GeoJSONLayer({
      url: "kanko3.geojson",
      title: "観光地",
      popupTemplate: {
        title: "属性情報",
        content: [{
          type: "fields",
          fieldInfos: [
            { fieldName: "P12_003", label: "名前" },
            { fieldName: "P12_004", label: "種別" }
          ]
        }]
      },
      labelingInfo: [{
        labelExpressionInfo: {
          expression: "$feature.P12_003"
        },
        symbol: {
          type: "text",
          color: "black",
          haloColor: "white",
          haloSize: 1,
          font: {
            size: 12,
            family: "sans-serif",
            weight: "bold"
          }
        },
        labelPlacement: "center-center"
      }],
      labelsVisible: true
    });

    // 都道府県レイヤ
    const layer2 = new GeoJSONLayer({
      url: "https://raw.githubusercontent.com/baradakun/test_okiba/refs/heads/main/pref.geojson",
      title: "都道府県",
      popupTemplate: {
        title: "属性情報",
        content: [{
          type: "fields",
          fieldInfos: [
            { fieldName: "pref_no", label: "No." },
            { fieldName: "pref_name", label: "名前" }
          ]
        }]
      },
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: [200, 200, 255, 0.4],  // 薄い青
          outline: {
            color: [100, 100, 200],
            width: 1
          }
        }
      }
    });

    arcgisMap.addLayer(layer2);
    arcgisMap.addLayer(layer);

    // 検索ウィジェット追加
    const searchWidget = new Search({
      view: view,
      sources: [{
        layer: layer,
        searchFields: ["P12_003"],       // 検索対象の属性
        displayField: "P12_003",
        exactMatch: false,
        outFields: ["*"],
        name: "観光地",
        placeholder: "観光地名を検索"
      }]
    });

    view.ui.add(searchWidget, "top-right");
  });
});

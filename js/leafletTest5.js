

/*var map = L.map('Mainmap').setView([ 42.7500, 12.5674], 6);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
        +'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.outdoors'
}).addTo(map);	*/


/*var geojson= L.geoJson(provData).addTo(map);*/

//1. First Fetch The Data From API
// group airtable data 
var spots = L.layerGroup();
//fetch data from airtable API
var items = [];
var airtable_read_endpoint = "https://api.airtable.com/v0/appo36qThhhtsAGFH/Destination%20Details%20IndexPage?api_key=keysAky6ucMNj4qo4";
var data = [];
$.getJSON(airtable_read_endpoint, function(result) {
       $.each(result.records, function(key,value) {
           items = {};
            items["Destination"]=value.fields.Destination;   //no space when naming the fields. 
            items["picUrl"]=value.fields.picUrl; 
            items["DesPageLink"]=value.fields.DesPageLink;
            items["lat"]=value.fields.lat; 
            items["lng"]=value.fields.lng; 
            data.push(items);
            console.log(items);
        }); // end .each
        
        //show markers and popup 
        for (var i in data) {
            var latlng = L.latLng({ lat: data[i].lat, lng: data[i].lng});
            L.marker( latlng )
                .bindPopup('<a href="'+data[i].DesPageLink+'" target="_blank">'+data[i].Destination+'</a>'+'<br><img src="' + data[i].picUrl+'" width = "80px" >')   //圖片文字居中? how to use hover to show popup?
                .addTo(spots);  //addTo(map);
        }
}); // end getJSON



//2. Draw The Map And Define Its Layers(tiles)
var mbAttr = 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>, '+'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
     mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiam95Y2VsZWVjdWhrIiwiYSI6ImNrMmRlN29nYTI1eHAzY2xzM3V6dHFxamoifQ.QIW1qp-AFcGHJxmUjHo1XA';  //get default public token on: https://account.mapbox.com/
 
// 定義了兩個mapboxTiles
var outdoors = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr}), // find id in this site: https://www.mapbox.com/maps/streets/ (the "streets" layer looks like "outdoors" more than street..)
   satellite = L.tileLayer(mbUrl, {id: 'mapbox.satellite', attribution: mbAttr});

/*var map = L.map('Mainmap')  
      .addLayer(mapboxTiles)
      //.setView([ 40.8438, 14.2477], 13.3);
      .setView([ 42.7100, 12.5674], 6.2);*/

var map = L.map('Mainmap', {     //draw a default map 
	center: [42.7100, 12.5674],
	zoom: 6,
	layers: [outdoors, spots]  //show outdoor and spots layers
});

var baseLayers = {     // 2 tile layers
	"Outdoors": outdoors,
	"Satellite Streets": satellite
};

var overlays = {   //overlays-->sth put on the base layers (markers)
	"Destinations": spots
};



//3. Choropleth Map
// set a default style
function style(feature) {  
    return {
        weight: 3,  // 描边的粗细 
        color: '#f35b00',
        dashArray: '3',  //虚线 密度
        fillOpacity: 0,  //border only
        /*fillColor: '#f35b00'*/
    };
}

// functions + mouse listeners
function highlightFeature(e) {
    var layer = e.target;  //e.target: get access to the layer that was hovered
    layer.setStyle({       //, and set style of the layer 
        weight: 5,
        color: '#ff8c09',
        /*fillOpacity: 0.7*/
    });
    
    //some custom info control 
    /*if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);*/
}

var geojson;  //defining it to make sure the geojson layer is accessible for the listener ( geojson=L.geoJson... )

function resetHighlight(e) {  // when mouseout, go back to the default style
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {  //zoom to the province
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {  //add listeners!! when ... happens, execute the above function
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature   
    });
}

geojson = L.geoJson(provData, {    //通過這個getjson獲取到italyTopo2.js中，放在provData這個object的數據
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

//4. Actually Add The Above Functions And Layers To The Map
//放在最下面
L.control.layers(baseLayers,overlays).addTo(map);
//L.geoJson(statesData).addTo(map);  

// Capri map
var mapboxTiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiam95Y2VsZWVjdWhrIiwiYSI6ImNrMmRlN29nYTI1eHAzY2xzM3V6dHFxamoifQ.QIW1qp-AFcGHJxmUjHo1XA',
                 {id: 'mapbox.streets',attribution: 'Map data &copy;<a href="https://openstreetmap.org">OpenStreetMap</a>'+', Imagery ©<a href="https://www.mapbox.com/">Mapbox</a>', maxZoom: 18,});

var map = L.map('Caprimap')
          .addLayer(mapboxTiles)
          .setView([ 40.55073, 14.23], 13.5);
// create custom icon
var arrow = L.icon({
    iconUrl: 'img/arrow.svg',
    iconSize: [40, 50],    
    popupAnchor: [0,-15]});
var blue= L.icon({
    iconUrl: 'img/Mapmark2.svg',  //.svg change the details in AI
    iconSize: [25, 35], // size of the icon
    popupAnchor: [0,-15]});
var orange = L.icon({
    iconUrl: 'img/Tea4.svg',
    iconSize: [30, 40],    
    popupAnchor: [0,-15]});

layerGroup = L.layerGroup().addTo(map);

// get Capri destinations
var items = [];
var airtable_read_endpoint = "https://api.airtable.com/v0/appyTPMiNYQLqMmTw/CapriDestinationDetails?api_key=keysAky6ucMNj4qo4";
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
    
}); // end getJSON  
function show_destinations(){
    for (var i in data) {
        var latlng = L.latLng({ lat: data[i].lat, lng: data[i].lng});
        L.marker( latlng,{icon: arrow} )
        .bindPopup('<a href="'+data[i].DesPageLink+'" target="_blank">'+data[i].Destination+'</a>'+'<br><img src="' + data[i].picUrl+'" width = "80px" >')   //圖片文字居中? how to use hover to show popup?
        .addTo(layerGroup);
    }
}

// get Capri other destinations
var items_O = [];
var airtable_read_endpoint_O = "https://api.airtable.com/v0/apptFmTJgMzfmM8xb/CapriOtherDestinationDetails?api_key=keysAky6ucMNj4qo4";
var data_O = [];
$.getJSON(airtable_read_endpoint_O, function(result) {
    $.each(result.records, function(key,value) {
        items_O = {};
        items_O["Destination"]=value.fields.Destination;   //no space when naming the fields. 
        items_O["picUrl"]=value.fields.picUrl; 
        items_O["DestinationLink"]=value.fields.DestinationLink;
        items_O["lat"]=value.fields.lat; 
        items_O["lng"]=value.fields.lng; 
        data_O.push(items_O);
        console.log(items_O);
    }); // end .each
    
}); // end getJSON  
function show_otherdes(){
    for (var i in data_O) {
        var latlng_O = L.latLng({ lat: data_O[i].lat, lng: data_O[i].lng});
        L.marker( latlng_O,{icon: blue} )
        .bindPopup(data_O[i].Destination + '<br><img src="' + data_O[i].picUrl+'" width = "80px" >'+ '<br>' + '<br><a href="'+data_O[i].DestinationLink+'" target="_blank">'+'View page'+ '</a>')   //圖片文字居中? how to use hover to show popup?
        .addTo(layerGroup);
    }
}

// get Capri restaurants
var items_R=[]
var airtable_read_endpoint_R = "https://api.airtable.com/v0/appf0csODyWOwkDRZ/RestaurantsMergeFinal?api_key=keysAky6ucMNj4qo4";
var data_R = [];
$.getJSON(airtable_read_endpoint_R, function(result) {
    $.each(result.records, function(key,value) {
        items_R = {};
        items_R ["Restaurant"]=value.fields.Restaurant;   //no space when naming the fields. 
        items_R["picRestUrl"]=value.fields.picRestUrl; 
        items_R ["Cuisine"]=value.fields.Cuisine; 
        items_R ["Tel"]=value.fields.Tel;
        items_R ["Address"]=value.fields.Address;
        items_R ["Restaurant_url"]=value.fields.Restaurant_url;
        items_R ["lat"]=value.fields.lat; 
        items_R ["lng"]=value.fields.lng; 
        data_R.push(items_R );
        console.log(items_R );
    }); // end .each

}); // end Restaurant getJSON  
function show_restaurants(){
    for (var k in data_R) {
        var latlng_R = L.latLng({ lat: data_R[k].lat, lng: data_R[k].lng});
        L.marker( latlng_R,{icon: orange})
            .bindPopup( '<b>'+data_R[k].Restaurant+'</b>' + '<br><img src="' + data_R[k].picRestUrl+'" width = "80px" >'+ '<br>'+ data_R[k].Cuisine +'<br><b>Tel:</b>'+ data_R[k].Tel +'<br><b>Add:</b>'+data_R[k].Address )
            .addTo(layerGroup);
    }
}

// Capri climate chart
var items = [];
var i = 0;
var airtable_read_endpoint = "https://api.airtable.com/v0/appGOx67BUbFGJUbY/WeatherCapri?api_key=keysAky6ucMNj4qo4";
var dataSetCA = [];
$.getJSON(airtable_read_endpoint, function(result){
    $.each(result.records, function(key,value){
        items = [];
        items.push(value.fields.Month);
        items.push(value.fields.Jan);   //no space when naming the fields. 
        items.push(value.fields.Feb);
        items.push(value.fields.Mar);
        items.push(value.fields.Apr);
        items.push(value.fields.May);
        items.push(value.fields.June);
        items.push(value.fields.July);
        items.push(value.fields.Aug);
        items.push(value.fields.Sept);
        items.push(value.fields.Oct);
        items.push(value.fields.Nov);
        items.push(value.fields.Dec);
        dataSetCA.push(items);
        console.log(items);    
    }); // end .each
        console.log(dataSetCA);


  var chart = c3.generate({
    bindto:'#CAclimateChart',
   bar: {title:'Title'},
    data: {
      columns: dataSetCA,
      type : 'line',
      types:{
        Rainfall:'bar'
      },
      //types:{dataSet:'line'}
      //types:dataSet.Rainfall:'line',
      axes: {
        Temperature: 'y',
        Rainfall: 'y2'
      }
    },
    tooltip: {
        grouped: false, // Default true
       // title:['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'],     
    },
    axis: {
        x: {
          label: {text: 'Month',position: 'outer-center'},
          /*tick:{values:['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec']},*/
          type: 'category',
          categories:['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'],
          tick: {
          rotate: 30,
            }
        },
        y: {
          label: {text: 'Temperature (˚C)',position: 'outer-middle'},
          max: 30,
          min: 0,
          padding: {top: 0,bottom: 0}
        },
        y2: {
            show: true,
            label: {text: 'Rainfall (mm)',position: 'outer-middle'},
        }
    },
    color:{
        pattern:['#ff7f0e','#15869f']
    }
    
  });  // end c3.generate
}); // end .getJSON
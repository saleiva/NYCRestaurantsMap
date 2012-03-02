
// Define the map to use from MapBox
var url = 'http://api.tiles.mapbox.com/v3/mapbox.mapbox-streets.jsonp';

var map;
var cartodb_restaurants;

function initialize() {

    // Get metadata about the map from MapBox
    wax.tilejson(url,function(tilejson) {
          
        // Make a new Leaflet map in your container div
        map = new L.Map('map_canvas',{maxZoom:16})  // container's id="mapbox"
        
        .setView(new L.LatLng(40.7143528, -74.0059731), 15)

        // Add MapBox Streets as a base layer
        .addLayer(new wax.leaf.connector(tilejson));      

        cartodb_restaurants = new L.CartoDBLayer({
            map_canvas: 'map_canvas',
            map: map,
            user_name:'viz2',
            table_name: 'ny_restaurants_ratings',
            query: "SELECT * FROM {{table_name}}",
            infowindow: true,
            auto_bound: false,
            debug: true
        });
    });
}

function viewCategory(c){
	if(c=='u'){
		cartodb_restaurants.update('query', "SELECT * FROM {{table_name}} WHERE grade!='A' AND grade != 'B' AND grade !='C'");	
	}else{
		cartodb_restaurants.update('query', "SELECT * FROM {{table_name}} WHERE grade='"+c+"'");
	}
}

class GeoJSON {

	constructor ( json ) {

		this.json = json;
		this.radius = config.sizes.globe;

		//
		groups.geojson = new THREE.Group();
		groups.geojson.name = 'geoJSON';
		//
		this.initGeoJson();

		return groups.geojson;

	}

	initGeoJson () {

		// const features = this.json.features;
		//
		// features.forEach( feature => {
		//
		// 	groups.geojson.add( new THREE.Line(
		// 	    new THREE.GeoJsonGeometry( feature, this.radius ),
		// 	    new THREE.LineBasicMaterial({ color: 'blue' })
		// 	) );
		//
		// } );

		// FeatureCollection
		// const myLine = new THREE.Line(
		//     new THREE.GeoJsonGeometry(geoJson),
		//     new THREE.LineBasicMaterial({ color: 'blue' })
		// );

		// https://github.com/sermonis/three-geojson-geometry
		const alt = this.radius;

		const lineObjs = [
	      // new THREE.LineSegments(
			//   // https://github.com/d3/d3-geo/blob/main/README.md#geoGraticule10
			// new THREE.GeoJsonGeometry(d3.geoGraticule10(), alt),
	      //   new THREE.LineBasicMaterial({ color: 'white', opacity: 0.04, transparent: true })
	      // )
	    ];

	    const materials = [
	      new THREE.LineBasicMaterial({ color: 'blue' }), // outer ring
	      new THREE.LineBasicMaterial({ color: 'green' }) // inner holes
	    ];

	    this.json.features.forEach(({ properties, geometry }) => {
	      lineObjs.push(new THREE.LineSegments(
	        new THREE.GeoJsonGeometry(geometry, alt),
	        materials
	      ))
	    });

		lineObjs.forEach(obj => groups.geojson.add(obj));

	}

	/* Draw GeoJSON
	Iterates through the latitude and longitude values, converts the values to XYZ coordinates,
	and draws the geoJSON geometries.
	*/

	// constructor ( json, radius, shape, materalOptions, container ) {
	// Draw the GeoJSON
    // $.getJSON( 'test_geojson/countries.json', function ( data ) {
	//
	// 	drawThreeGeo( data, 10, 'sphere', {
	//
	// 		color: 0x80FF80
	//
	// 	}, planet );
	//
	// } );

	// constructor ( json, shape ) {
	//
	// 	this.json = json;
	// 	this.shape = shape || 'sphere';
	// 	this.radius = config.sizes.globe;
	//
	// 	this.x_values = [];
	//     this.y_values = [];
	//     this.z_values = [];
	//
	// 	// this.geometry = new THREE.SphereGeometry( this.radius, 64, 64 );
	// 	//
	// 	groups.geojson = new THREE.Group();
	// 	groups.geojson.name = 'geoJSON';
	// 	//
	// 	this.initGeoJson();
	//
	// 	return groups.geojson;
	//
	// }
	//
	// initGeoJson () {
	//
	// 	// const scale = config.scale.globeScale;
	// 	//
	// 	// this.globeMaterial = this.createGlobeMaterial();
	// 	//
	// 	// this.globe = new THREE.Mesh( this.geometry, this.globeMaterial );
	// 	// this.globe.scale.set( scale, scale, scale );
	// 	//
	// 	// elements.globe = this.globe;
	// 	//
	// 	// groups.map = new THREE.Group();
	// 	// groups.map.name = 'Map';
	// 	//
	// 	// groups.map.add( this.globe );
	// 	// groups.globe.add( groups.map );
	//
	//     var json_geom = this.createGeometryArray(this.json);
	//     //An array to hold the feature geometries.
	//     var convertCoordinates = this.getConversionFunctionName(this.shape);
	//     //Whether you want to convert to spherical or planar coordinates.
	//     var coordinate_array = [];
	//     //Re-usable array to hold coordinate values. This is necessary so that you can add
	//     //interpolated coordinates. Otherwise, lines go through the sphere instead of wrapping around.
	//
    // for (var geom_num = 0; geom_num < json_geom.length; geom_num++) {
	//
    //     if (json_geom[geom_num].type == 'Point') {
    //         convertCoordinates(json_geom[geom_num].coordinates);
    //         this.drawParticle(this.x_values[0], this.y_values[0], this.z_values[0]);
	//
    //     } else if (json_geom[geom_num].type == 'MultiPoint') {
    //         for (var point_num = 0; point_num < json_geom[geom_num].coordinates.length; point_num++) {
    //             convertCoordinates(json_geom[geom_num].coordinates[point_num]);
    //             this.drawParticle(this.x_values[0], this.y_values[0], this.z_values[0]);
    //         }
	//
    //     } else if (json_geom[geom_num].type == 'LineString') {
    //         coordinate_array = this.createCoordinateArray(json_geom[geom_num].coordinates);
	//
    //         for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
    //             convertCoordinates(coordinate_array[point_num]);
    //         }
    //         this.drawLine(this.x_values, this.y_values, this.z_values);
	//
    //     } else if (json_geom[geom_num].type == 'Polygon') {
    //         for (var segment_num = 0; segment_num < json_geom[geom_num].coordinates.length; segment_num++) {
    //             coordinate_array = this.createCoordinateArray(json_geom[geom_num].coordinates[segment_num]);
	//
    //             for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
    //                 convertCoordinates(coordinate_array[point_num]);
    //             }
    //             this.drawLine(this.x_values, this.y_values, this.z_values);
    //         }
	//
    //     } else if (json_geom[geom_num].type == 'MultiLineString') {
    //         for (var segment_num = 0; segment_num < json_geom[geom_num].coordinates.length; segment_num++) {
    //             coordinate_array = this.createCoordinateArray(json_geom[geom_num].coordinates[segment_num]);
	//
    //             for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
    //                 convertCoordinates(coordinate_array[point_num]);
    //             }
    //             this.drawLine(this.x_values, this.y_values, this.z_values);
    //         }
	//
    //     } else if (json_geom[geom_num].type == 'MultiPolygon') {
    //         for (var polygon_num = 0; polygon_num < json_geom[geom_num].coordinates.length; polygon_num++) {
    //             for (var segment_num = 0; segment_num < json_geom[geom_num].coordinates[polygon_num].length; segment_num++) {
    //                 coordinate_array = this.createCoordinateArray(json_geom[geom_num].coordinates[polygon_num][segment_num]);
	//
    //                 for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
    //                     convertCoordinates(coordinate_array[point_num]);
    //                 }
    //                 this.drawLine(this.x_values, this.y_values, this.z_values);
    //             }
    //         }
    //     } else {
    //         throw new Error('The geoJSON is not valid.');
    //     }
	//
	// }
	//
	// }
	//
	// createGeometryArray ( json ) {
	//
	// 	var geometry_array = [];
	//
    //     if (json.type == 'Feature') {
    //         geometry_array.push(json.geometry);
    //     } else if (json.type == 'FeatureCollection') {
    //         for (var feature_num = 0; feature_num < json.features.length; feature_num++) {
    //             geometry_array.push(json.features[feature_num].geometry);
    //         }
    //     } else if (json.type == 'GeometryCollection') {
    //         for (var geom_num = 0; geom_num < json.geometries.length; geom_num++) {
    //             geometry_array.push(json.geometries[geom_num]);
    //         }
    //     } else {
    //         throw new Error('The geoJSON is not valid.');
    //     }
    //     //alert(geometry_array.length);
    //     return geometry_array;
    // }
	//
	// getConversionFunctionName (shape) {
    //     var conversionFunctionName;
	//
    //     if (shape == 'sphere') {
    //         conversionFunctionName = this.convertToSphereCoords;
    //     } else if (shape == 'plane') {
    //         conversionFunctionName = this.convertToPlaneCoords;
    //     } else {
    //         throw new Error('The shape that you specified is not valid.');
    //     }
    //     return conversionFunctionName;
    // }
	//
	// createCoordinateArray ( feature ) {
    //     //Loop through the coordinates and figure out if the points need interpolation.
    //     var temp_array = [];
    //     var interpolation_array = [];
	//
    //     for (var point_num = 0; point_num < feature.length; point_num++) {
    //         var point1 = feature[point_num];
    //         var point2 = feature[point_num - 1];
	//
    //         if (point_num > 0) {
    //             if (this.needsInterpolation(point2, point1)) {
    //                 interpolation_array = [point2, point1];
    //                 interpolation_array = this.interpolatePoints(interpolation_array);
	//
    //                 for (var inter_point_num = 0; inter_point_num < interpolation_array.length; inter_point_num++) {
    //                     temp_array.push(interpolation_array[inter_point_num]);
    //                 }
    //             } else {
    //                 temp_array.push(point1);
    //             }
    //         } else {
    //             temp_array.push(point1);
    //         }
    //     }
    //     return temp_array;
    // }
	//
	// needsInterpolation ( point2, point1 ) {
    //     //If the distance between two latitude and longitude values is
    //     //greater than five degrees, return true.
    //     var lon1 = point1[0];
    //     var lat1 = point1[1];
    //     var lon2 = point2[0];
    //     var lat2 = point2[1];
	//
	// 	var lon_distance = Math.abs(lon1 - lon2);
    //     var lat_distance = Math.abs(lat1 - lat2);
	//
    //     if (lon_distance > 5 || lat_distance > 5) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
	//
	// interpolatePoints ( interpolation_array ) {
	//
	// 	//This function is recursive. It will continue to add midpoints to the
    //     //interpolation array until needsInterpolation() returns false.
    //     var temp_array = [];
    //     var point1, point2;
	//
    //     for (var point_num = 0; point_num < interpolation_array.length - 1; point_num++) {
    //         point1 = interpolation_array[point_num];
    //         point2 = interpolation_array[point_num + 1];
	//
    //         if (this.needsInterpolation(point2, point1)) {
    //             temp_array.push(point1);
    //             temp_array.push(this.getMidpoint(point1, point2));
    //         } else {
    //             temp_array.push(point1);
    //         }
    //     }
	//
    //     temp_array.push(interpolation_array[interpolation_array.length - 1]);
	//
    //     if (temp_array.length > interpolation_array.length) {
    //         temp_array = this.interpolatePoints(temp_array);
    //     } else {
    //         return temp_array;
    //     }
    //     return temp_array;
    // }
	//
	// getMidpoint (point1, point2) {
    //     var midpoint_lon = (point1[0] + point2[0]) / 2;
    //     var midpoint_lat = (point1[1] + point2[1]) / 2;
    //     var midpoint = [midpoint_lon, midpoint_lat];
	//
    //     return midpoint;
    // }
	//
	// convertToSphereCoords (coordinates_array, sphere_radius) {
    //     var lon = coordinates_array[0];
    //     var lat = coordinates_array[1];
	//
    //     this.x_values.push(Math.cos(lat * Math.PI / 180) * Math.cos(lon * Math.PI / 180) * sphere_radius);
    //     this.y_values.push(Math.cos(lat * Math.PI / 180) * Math.sin(lon * Math.PI / 180) * sphere_radius);
    //     this.z_values.push(Math.sin(lat * Math.PI / 180) * sphere_radius);
    // }
	//
	// convertToPlaneCoords (coordinates_array) {
    //     var lon = coordinates_array[0];
    //     var lat = coordinates_array[1];
	//
    //     this.z_values.push((lat / 180) * this.radius);
    //     this.y_values.push((lon / 180) * this.radius);
    // }
	//
	// drawParticle (x, y, z) {
    //     var particle_geom = new THREE.Geometry();
    //     particle_geom.vertices.push(new THREE.Vector3(x, y, z));
	//
    //     var particle_material = new THREE.ParticleSystemMaterial({
	//
	// 		color: 0x80FF80
	//
	// 	});
	//
    //     var particle = new THREE.ParticleSystem(particle_geom, particle_material);
    //     // container.add(particle);
	// 	groups.geojson.add( particle );
	//
    //     this.clearArrays();
    // }
	//
	// drawLine (x_values, y_values, z_values, options) {
    //     var line_geom = new THREE.Geometry();
    //     this.createVertexForEachPoint(line_geom, x_values, y_values, z_values);
	//
    //     var line_material = new THREE.LineBasicMaterial(options);
    //     var line = new THREE.Line(line_geom, line_material);
	//
	// 	// container.add(line);
	// 	groups.geojson.add( line );
	//
    //     this.clearArrays();
    // }
	//
	// createVertexForEachPoint (object_geometry, values_axis1, values_axis2, values_axis3) {
    //     for (var i = 0; i < values_axis1.length; i++) {
    //         object_geometry.vertices.push(new THREE.Vector3(values_axis1[i],
    //             values_axis2[i], values_axis3[i]));
    //     }
    // }
	//
    // clearArrays() {
    //     this.x_values.length = 0;
    //     this.y_values.length = 0;
    //     this.z_values.length = 0;
    // }
























	// initAtmosphere () {
	//
	// 	this.atmosphereMaterial = this.createGlobeAtmosphere();
	// 	this.atmosphere = new THREE.Mesh( this.geometry, this.atmosphereMaterial )
	// 	this.atmosphere.scale.set(1.2, 1.2, 1.2);
	//
	// 	elements.atmosphere = this.atmosphere;
	//
	// 	groups.atmosphere = new THREE.Group();
	// 	groups.atmosphere.name = 'Atmosphere';
	//
	// 	groups.atmosphere.add( this.atmosphere );
	// 	groups.globe.add( groups.atmosphere );
	//
	// }

	// createGlobeMaterial () {
	//
	// 	const texture = loader.load( './assets/textures/earth_dark.jpg' );
	//
	// 	const shaderMaterial = new THREE.ShaderMaterial( {
	//
	// 		uniforms: { texture: { value:  texture } },
	// 		vertexShader: shaders.globe.vertexShader,
	// 		fragmentShader: shaders.globe.fragmentShader,
	// 		blending: THREE.AdditiveBlending,
	// 		transparent: true,
	//
	// 	} );
	//
	// 	const normalMaterial = new THREE.MeshBasicMaterial( {
	//
	// 		blending: THREE.AdditiveBlending,
	// 		transparent: true,
	//
	// 	} );
	//
	// 	return shaderMaterial;
	//
	// }

	// createGlobeAtmosphere () {
	//
	// 	return new THREE.ShaderMaterial( {
	//
	// 		vertexShader: shaders.atmosphere.vertexShader,
	// 		fragmentShader: shaders.atmosphere.fragmentShader,
	// 		blending: THREE.AdditiveBlending,
	// 		side: THREE.BackSide,
	// 		transparent: true,
	// 		uniforms: {}
	//
	// 	} );
	//
	// }

};

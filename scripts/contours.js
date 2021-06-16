class GeoJSON {

	constructor ( json ) {

		this.json = json;
		this.radius = config.sizes.globe;

		//
		groups.contours = new THREE.Group();
		groups.contours.name = 'geoJSON';
		groups.contours.rotateY( THREE.Math.degToRad( 90 ) );
		//

		this.initGeoJson();

		return groups.contours;

	}

	initGeoJson () {

		// TODO: d3 geometry creation.
		// https://github.com/sermonis/three-geojson-geometry
		// https://github.com/sermonis/three-geojson-geometry/blob/master/src/index.js

		const lineObjs = [
	      // new THREE.LineSegments(
			//   // https://github.com/d3/d3-geo/blob/main/README.md#geoGraticule10
			// new THREE.GeoJsonGeometry(d3.geoGraticule10(), alt),
	      //   new THREE.LineBasicMaterial({ color: 'white', opacity: 0.04, transparent: true })
	      // )
	    ];

		const materials = [

			// new THREE.LineBasicMaterial( { color: 'blue', linewidth: 3, } ), // outer ring
			new THREE.LineBasicMaterial( { color: 0xffaa00, linewidth: 3, } ), // outer ring
			// new THREE.LineDashedMaterial( { color: 0xffaa00, dashSize: 3, gapSize: 1 } ), // outer ring
			new THREE.LineBasicMaterial( { color: 'green', linewidth: 3, } ), // inner holes

		];

		this.json.features.forEach( ( { properties, geometry } ) => {

			lineObjs.push( new THREE.LineSegments(
				new THREE.GeoJsonGeometry( geometry, this.radius ),
				materials
			) );

		} );

		lineObjs.forEach( obj => groups.contours.add( obj ) );

		// lineObjs.forEach( obj => {
		//
		// 	// obj.rotateY( THREE.Math.degToRad( -90 ) );
		// 	// obj.computeLineDistances();
		// 	groups.geojson.add( obj );
		//
		// } );

	}

};

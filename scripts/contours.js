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

			// https://threejs.org/examples/#webgl_lines_fat
			// https://github.com/mrdoob/three.js/blob/master/examples/webgl_lines_fat.html

			// new THREE.LineBasicMaterial( { color: 'blue', linewidth: 3, } ), // outer ring
			// new THREE.LineBasicMaterial( { color: 0xffaa00, linewidth: 3, transparent: true, opacity: 0 } ), // outer ring
			new THREE.LineBasicMaterial( { color: 0xffaa00, linewidth: 3, transparent: true, opacity: 0 } ), // outer ring
			// new THREE.MeshBasicMaterial( { color: 0xffaa00, linewidth: 3, } ), // outer ring
			// new THREE.LineDashedMaterial( { color: 0xffaa00, dashSize: 3, gapSize: 1 } ), // outer ring
			new THREE.LineBasicMaterial( { color: 'green', linewidth: 3, } ), // inner holes

		];

		// const vectorArray = [];

		this.json.features.forEach( ( { properties, geometry } ) => {

			// console.log( geometry );
			// console.log( new THREE.GeoJsonGeometry( geometry, this.radius ) );
			// console.log( new THREE.GeoJsonGeometry( geometry, this.radius ).toJSON() );

			// const g = new THREE.GeoJsonGeometry( geometry, this.radius );

			// console.log( g.getAttribute( 'position' ) );
			// console.log( g.toNonIndexed() );
			// g.toNonIndexed()

			// const vertices = g.getAttribute( 'position' );
			// console.log( new THREE.BufferAttribute( vertices, 3 ) );

			// console.log( new THREE.BufferAttribute( g.getAttribute( 'position' ) ) );
			// console.log( g.getAttribute( 'position' ) );
			// console.log( g.toNonIndexed() );
			// const s = new THREE.ShapeGeometry();
			// g.computeVertexNormals();
			// console.log( s.fromGeometry(g.toNonIndexed()) );

			// fromGeometry
			// THREE.GeometryUtils.center(geometry);

			// copyArray: ƒ (a)
			// copyAt: ƒ (a,b,c)
			// copyColorsArray: ƒ (a)
			// copyIndicesArray: ƒ ()
			// copyVector2sArray: ƒ (a)
			// copyVector3sArray: ƒ (a)
			// copyVector4sArray:

			// const position = g.attributes.position;
			// const vector = new THREE.Vector3();
			// // const vector = new THREE.Vector2();
			//
			// // vector.fromBufferAttribute(position, i);
			// vector.fromBufferAttribute(position, 0); // 0 -?
			//
			// for ( let i = 0, length = position.length; i < length; i ) {
			//
			// 	// vectorArray.push( vector.fromBufferAttribute( position, i ) );
			// 	vectorArray.push( vector.fromBufferAttribute( position, i ) );
			//
			// };
			// gjg.computeVertexNormals();
			// console.log( position.length, position );
			// console.log( vector );

			// const shapeGeometry = new THREE.ShapeGeometry();
			// console.log( shapeGeometry.fromGeometry(gjg) );

			// fromDirectGeometry: ƒ (a)
			// fromGeometry: ƒ (a)

			lineObjs.push( new THREE.LineSegments(
			// lineObjs.push( new THREE.Mesh(
				new THREE.GeoJsonGeometry( geometry, this.radius ),
				materials
			) );

		} );

		// console.log( vectorArray );
		// console.log( lineObjs );

		lineObjs.forEach( obj => groups.contours.add( obj ) );

		// lineObjs.forEach( obj => {
		//
		// 	// obj.rotateY( THREE.Math.degToRad( -90 ) );
		// 	obj.computeLineDistances();
		// 	groups.contours.add( obj );
		//
		// } );

	}

};

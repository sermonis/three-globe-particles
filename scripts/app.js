class App {

	constructor ( { animate, setup, preload } ) {

		this.preload = preload;
		this.animate = animate;
		this.setup = setup;

		window.app = this;

	}

	init = async () => {

		this.initScene();
		// this.initRaycaster();
		this.initRenderer();
		this.initCamera();
		this.initControls();
		this.initRaycaster();
		this.initStats();

		if ( this.preload ) {

			await this.preload();

		}

		this.render();
		this.update();

	}

	initScene = () => {

		this.scene = new THREE.Scene();

	}

	initRenderer = () => {

		this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );

		this.renderer.setClearColor( 0x000000, 1.0 );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.setPixelRatio( window.devicePixelRatio * 1.5 );

		this.renderer.shadowMap.enabled = true;

	}

	initCamera = () => {

		this.ratio = window.innerWidth / window.innerHeight;
		this.camera = new THREE.PerspectiveCamera( 60, this.ratio, 0.1, 10000 );
		this.camera.lookAt( this.scene.position );
		this.camera.position.set( 0, 15, 30 );

	}

	initControls = () => {

		this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );

	}

	initRaycaster = () => {

		this.raycaster = new THREE.Raycaster();
		this.pointer = new THREE.Vector2();

	}

	initStats = () => {

		this.stats = new Stats();
		this.stats.setMode( 0 );

		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.right = '10px';
		this.stats.domElement.style.bottom = '10px';

		document.body.appendChild( this.stats.domElement );

	}

	render = () => {

		this.setup( this );
		document.body.appendChild( this.renderer.domElement );

	}

	update = () => {

		this.animate( this );

		this.stats.update();
		this.controls.update();

		// Update the picking ray with the camera and mouse position.
		this.raycaster.setFromCamera( this.pointer, this.camera );

		// Calculate objects intersecting the picking ray.
		const intersects = this.raycaster.intersectObjects( this.scene.children, true );
		// const intersects = this.raycaster.intersectObject( this.scene );

		// if ( intersects.length && intersects[ 0 ].object.isMesh && intersects[0].object.type == 'GeoJsonGeometry' ) {
		// if ( intersects.length && intersects[ 0 ].object.isMesh ) {
		// if ( intersects.length && intersects[ 0 ].object.isGroup && intersects[ 0 ].object.name == 'geoJSON' ) {
		// if ( intersects.length && intersects[ 0 ].object.type == 'LineSegments' ) {
		if ( intersects.length && intersects[ 0 ].object.isLineSegments ) {

			const object = intersects[ 0 ].object;

			// console.log( 'intersects', intersects );
			// console.log( 'object', object );
			console.log( 'object.type', object.type, object );
			// object.material[0].color.set( 0xff0000 );
			object.scale.multiplyScalar( 1.2 );
			// object.material[0].opacity = 1;
			// const mat = object.material[0].copy();
			// mat.opacity = 1;
			// object.material[0] = mat;

		}

		// for ( let i = 0; i < intersects.length; i ++ ) {
		//
		// 	// console.log( 'intersects', intersects )
		//
		// 	// intersects[ i ].object.material.color.set( 0xff0000 );
		//
		// }

		this.renderer.render( this.scene, this.camera );
		this.renderer.setAnimationLoop( this.update );

	}

	addControlGui = callback => {

		const gui = new dat.GUI();
		callback( gui );

	}

	handleResize = () => {

		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );

	}

	handlePointerMove = ( e ) => {

		if ( !!this.pointer ) {

			// console.log( 'handlePointerMove', e );

			this.pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1;
			this.pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

		}

	}

}

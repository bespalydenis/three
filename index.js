// Обозначаю $, когда выделяю элемент из dom
let $select = document.querySelector('#select')
let $renderType = document.querySelector('#renderType')
let $updateSize = document.querySelector('#updateSize')


var render = function(type = 'cube', scale = [5, 5 ,5]){
	let scene = new THREE.Scene()
	let camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 1000 )


	let renderer = new THREE.WebGLRenderer({
		antialias: true
	})

	renderer.setClearColor( 0xffffff )
	renderer.setSize( window.innerWidth, window.innerHeight )
	document.body.appendChild( renderer.domElement )

	let controls = new THREE.OrbitControls(camera, renderer.domElement)
	controls.maxPolarAngle = Math.PI / 2

	let geometry
	switch(type) {
		case 'cube':
			geometry = new THREE.BoxBufferGeometry( 1, 1, 1 )
			break;
		case 'cylinder':
			geometry = new THREE.CylinderGeometry( 1,1,1 );
			break;
		case 'sphere':
			geometry = new THREE.SphereGeometry( 1, 50, 50 );
			break;
	}
	
	let material = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe: true} )
	let element = new THREE.Mesh( geometry, material )
	element.receiveShadow = true
	scene.add( element )

	camera.position.x = scale[0]
	camera.position.y = scale[1]
	camera.position.z = scale[2]

	element.rotation.x += 0
	element.rotation.y += 4.05

	function animate() {
		requestAnimationFrame(animate)
		controls.update()
		renderer.render(scene, camera)
	}
	animate()
};


render()

// Выбор фигуры
$select.addEventListener('click', function(e){
	if(e.target.classList.contains('select_option') && !e.target.classList.contains('active')) {
		let selectedType = e.target.dataset.type
		document.querySelector('canvas').remove()
		document.querySelector('.select_option.active').classList.remove('active')
		e.target.classList.add('active')
		render(selectedType)
	}
})

// Изменение размера
$updateSize.addEventListener('click', function(e){
	let size = [].slice.call(document.querySelectorAll('#size input'))
	let selectedType = document.querySelector('.select_option.active').dataset.type
	size = size.map(function(el){
		return +el.value
	})
	document.querySelector('canvas').remove()
	render(selectedType, size)
})






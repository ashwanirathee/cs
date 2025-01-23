
const angleSlide_component = document.getElementById("angleSlide");
let g_globalAngle  = 0;
function init() {
	// scene graph which holds all the shapes
	scene = new SceneGraph();
	// render which has the function that actuall renders everything
	renderer = new WebGLRenderer();
}

function main() {
	// setup webgl in general
	setupWebGL();

	// connects the variables and setup the GLSL shader 
	connectVariablesToGLSL();

	// setup the scene graph and the renderer
	init();

	// adds the event listeners for various events
	// addEventListeners();
	angleSlide_component.addEventListener("mouseup", () => {
		g_globalAngle = angleSlide_component.value;
		console.log(g_globalAngle);
		renderAllShapes();
	});
	// clear
	clearCanvas();
}

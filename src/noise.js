const canvas = document.querySelector('canvas'),
				 ctx = canvas.getContext('2d')

canvas.width = canvas.height = 256

resize();
window.onresize = resize;

function resize() {
	
	canvas.style.width = window.innerWidth + 'px'
	canvas.style.height = window.innerHeight + 'px'
}

function noise(ctx) {
    
	const w = ctx.canvas.width,
				h = ctx.canvas.height,
				idata = ctx.createImageData(w, h),
				buffer32 = new Uint32Array(idata.data.buffer),
				len = buffer32.length
	  let i = 0

	for(; i < len;i++)
		
		if (Math.random() < 0.5) buffer32[i] = 0xff000000;

		ctx.putImageData(idata, 0, 0);
}

(function loop() {
    noise(ctx);
    requestAnimationFrame(loop);
})();
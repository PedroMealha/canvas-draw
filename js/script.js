class _Engine {
	constructor(args) {
		Object.assign(this, args);
		this.canvas = document.querySelector(args.canvas);
		let picker = document.querySelector('#color');
		this.color = picker.value;
		this.ctx = this.canvas.getContext('2d');

		this.w = this.canvas.clientWidth;
		this.h = this.canvas.clientHeight;

		this.cBCR = this.canvas.getBoundingClientRect();

		this.mouse = {
			x: null,
			y: null
		}

		this.pos = {
			x: 0,
			y: 0,
			newX: 0,
			newY: 0
		}

		this.onResize();
		window.addEventListener('resize', e => this.onResize());

		this.isMouseDown = false;

		picker.addEventListener('change', e => {
			this.color = e.target.value;
		});

		this.canvas.addEventListener('mousedown', e => {
			this.isMouseDown = true;
			this.pos.x = e.offsetX;
			this.pos.y = e.offsetY;
		});

		this.canvas.addEventListener('mouseup', e => {
			this.isMouseDown = false;
		});

		this.canvas.addEventListener('mousemove', e => {
			this.mouse.x = e.clientX - this.cBCR.x;
			this.mouse.y = e.clientY - this.cBCR.y;

			this.ctx.lineWidth = this.size;
			this.ctx.lineCap = 'round';
			this.ctx.strokeStyle = this.color;
			this.ctx.shadowColor = this.color;
			this.ctx.shadowBlur = this.blur;

			if (this.isMouseDown) {
				this.pos.newX = e.offsetX;
				this.pos.newY = e.offsetY;

				this.ctx.beginPath();
				this.ctx.moveTo(this.mouse.x, this.mouse.y);
				this.ctx.lineTo(this.pos.x, this.pos.y);
				this.ctx.stroke();

				this.pos.x = this.pos.newX;
				this.pos.y = this.pos.newY;
			}
		});
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.w, this.h);
	}

	onResize() {
		this.w = this.canvas.clientWidth;
		this.h = this.canvas.clientHeight;
		this.canvas.setAttribute("width", this.w);
		this.canvas.setAttribute("height", this.h);
		this.cBCR = this.canvas.getBoundingClientRect();
	}
}

const particles = new _Engine({
	canvas: `canvas`,
	size: 15,
	blur: 15
})
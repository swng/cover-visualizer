// const { decoder } = require('tetris-fumen');

const fumen_colors = {
    I: { normal: '#009999', light: '#00FFFF' },
    T: { normal: '#990099', light: '#FF00FF' },
    S: { normal: '#009900', light: '#00FF00' },
    Z: { normal: '#990000', light: '#FF0000' },
    L: { normal: '#996600', light: '#FF9900' },
    J: { normal: '#0000BB', light: '#0000FF' },
    O: { normal: '#999900', light: '#FFFF00' },
    X: { normal: '#999999', light: '#CCCCCC' },
    Empty: { normal: '#f3f3ed' }
};

function fumen_draw(fumenPage, tilesize, numrows, transparent) {
	const field = fumenPage.field;
	const operation = fumenPage.operation;

	function operationFilter(e) {
		return i == e.x && j == e.y;
	}

	if (numrows == undefined) {
		numrows = 0;
		for (i = 0; i < 10; i++) {
			for (j = 0; j < 23; j++) {
				if (field.at(i, j) != '_') {
					numrows = Math.max(numrows, j);
				}
				if (operation != undefined && operation.positions().filter(operationFilter).length > 0) {
					numrows = Math.max(numrows, j);
				}
			}
		}
		numrows += 1;
	}
	const width = tilesize * 10;
	const height = numrows * tilesize;

	var canvas = document.createElement('canvas');
	canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    
    var gridCvs = document.createElement('canvas');
    gridCvs.width = tilesize;
    gridCvs.height = tilesize;
	var gridCtx = gridCvs.getContext('2d');

    context.fillStyle = '#000000';

    gridCtx.fillStyle = '#000000';
    if (transparent) gridCtx.fillStyle = 'rgba(0, 0, 0, 0)';
	gridCtx.fillRect(0, 0, tilesize, tilesize);
	gridCtx.strokeStyle = '#333333';
	gridCtx.strokeRect(0, 0, tilesize, tilesize);
    var pattern = context.createPattern(gridCvs, 'repeat');
    
	// context.fillRect(0, 0, width, height);

    context.clearRect(0, 0, width, height);
	context.fillStyle = pattern;
    context.fillRect(0, 0, width, height);


	for (i = 0; i < 10; i++) {
		for (j = 0; j < numrows; j++) {
			if (field.at(i, j) != '_') {
				context.fillStyle = fumen_colors[field.at(i, j)].light;
				context.fillRect(i * tilesize + 1, height - (j + 1) * tilesize + 1, tilesize - 2, tilesize - 2);
			}
			if (operation != undefined && operation.positions().filter(operationFilter).length > 0) {
				context.fillStyle = fumen_colors[operation.type].light;
				context.fillRect(i * tilesize + 1, height - (j + 1) * tilesize + 1, tilesize - 2, tilesize - 2);
			}
		}
	}/*
	for (i = 0; i < 10; i++) {
		for (j = 0; j < numrows; j++) {
			if (field.at(i, j) != '_') {
				context.fillStyle = colors[field.at(i, j)].normal;
				context.fillRect(i * tilesize, height - (j + 1) * tilesize, tilesize, tilesize);
			}
			if (operation != undefined && operation.positions().filter(operationFilter).length > 0) {
				context.fillStyle = colors[operation.type].normal;
				context.fillRect(i * tilesize, height - (j + 1) * tilesize, tilesize, tilesize);
			}
		}
	}*/
	return canvas;
}

function fumen_drawFumens(fumenPages, tilesize, numrows, start, end, transparent) {
	if (end == undefined) {
		end = fumenPages.length;
	}
	if (numrows == undefined) {
		numrows = 0;
		function operationFilter(e) {
			return i == e.x && j == e.y;
		}
		for (x = start; x < end; x++) {
			field = fumenPages[x].field;
			operation = fumenPages[x].operation;
			for (i = 0; i < 10; i++) {
				for (j = 0; j < 23; j++) {
					if (field.at(i, j) != '_') {
						numrows = Math.max(numrows, j);
					}
					if (operation != undefined && operation.positions().filter(operationFilter).length > 0) {
						numrows = Math.max(numrows, j);
					}
				}
			}
		}
		numrows += 1;
	}
	numrows = Math.min(23, numrows);
	const width = tilesize * 10;
	const height = numrows * tilesize;
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');
	const encoder = new GIFEncoder();
	encoder.start();
	encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
	encoder.setDelay(delay); // frame delay in ms
	encoder.setQuality(1); // image quality. 10 is default.
	if (transparent) {
		encoder.setTransparent('rgba(0, 0, 0, 0)');
	}
	for (x = start; x < end; x++) {
		frame = fumen_draw(fumenPages[x], tilesize, numrows, transparent).getContext('2d');
		encoder.addFrame(frame);
	}
	encoder.finish();
	// encoder.download('download.gif');
	return encoder;
}

cellSize = 22;
height = undefined;
transparency_fumen = false;
delay = 500;

start = 0;
end = undefined;

function fumenrender(fumenCodes, container, comments = undefined) {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
    fumenCodes.forEach((code, index) => {
        try {
            var pages = decoder.decode(code);
            a = document.createElement("figure");
            if (pages.length == 1) {
                canvas = fumen_draw(pages[0], cellSize, height, transparency_fumen);

                documentCanvas = document.createElement('canvas');
                documentCanvas.style.padding = '18px';

                var ctx = documentCanvas.getContext('2d');
                documentCanvas.height = canvas.height;
                documentCanvas.width = canvas.width;

                ctx.drawImage(canvas, 0, 0);

                var data_url = documentCanvas.toDataURL();
                var img = document.createElement('img');
                img.src = data_url;

                a.appendChild(img);
                if (comments != undefined) {
                    caption = document.createElement("figcaption");
                    comment = comments[index];
                    if (typeof comment == "object") {
                        comment = score_object_string(comment);
                    }
                    caption.innerHTML = comment;
                    a.appendChild(caption);
                }

                // documentCanvas.style.border = '5px solid #555';
            }
            if (pages.length > 1) {
                gif = fumen_drawFumens(pages, cellSize, height, start, end, transparency_fumen);

                var binary_gif = gif.stream().getData(); //notice this is different from the as3gif package!
                var data_url = 'data:image/gif;base64,' + encode64(binary_gif);
                var img = document.createElement('img');
                img.style.padding = '18px';
                img.src = data_url;

                // img.style.border = '5px solid #555';

                a.appendChild(img);
            }
            container.appendChild(a);
        } catch (error) { console.log(code, error); }
    });
}
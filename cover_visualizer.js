const { decoder, encoder } = require('tetris-fumen');
data = [];
setup = 'v115@vhAAgH';

included = [
	'alt sdpc 19 cover.csv',
	'alt sdpc 23 a cover.csv',
	'alt sdpc 23 b cover.csv',
	'alt sdpc 25 cover.csv',
	'alt sdpc 64 cover.csv',
	'jigsaw jaws variant solutions cover.csv',
	'jigsaw pco variant solutions cover.csv',
	'jstris sdpc cover.csv',
	'no 180 sdpc cover.csv',
	'teto sdpc cover.csv',
]; // update this list as we add more files
included_dropdown = document.getElementById('files');
for (filename of included) {
	included_dropdown.append(new Option(filename));
}

function loadFile() {
	const [file] = document.querySelector('input[type=file]').files;
	const reader = new FileReader();

	reader.addEventListener(
		'load',
		() => {
			// this will then display a text file
			// console.log(reader.result);
			data = $.csv.toArrays(reader.result);
			console.log(data[0]);
			console.log('Sample queue: ' + data[1][0]);

			container = document.getElementById('setup preview');

			fumen = data[0][1];
			pages = decoder.decode(fumen);
			pages[0].operation = undefined;
			setup = encoder.encode([pages[0]]);

            if (document.getElementById('mirror').checked) {
                fumenrender(mirrorFumen([setup]), container);
			} else fumenrender([setup], container);
		},
		false
	);

	if (file) {
		if (file.type && file.type != 'text/csv') {
			console.log('File is not a csv.', file.type, file);
			return;
		}
		reader.readAsText(file);
	}
}

function loadIncludedFile() {
	filename = document.getElementById('files').value; // .replace(/ /g, '%20') ??
	const url = window.location.href.replace('index.html', '') + 'cover_csvs/' + filename;
	fetch(url)
		.then((r) => r.text())
		.then((t) => {
			data = $.csv.toArrays(t);
			console.log(data[0]);
			console.log('Sample queue: ' + data[1][0]);

			container = document.getElementById('setup preview');

			fumen = data[0][1];
			pages = decoder.decode(fumen);
			pages[0].operation = undefined;
			setup = encoder.encode([pages[0]]);

			if (document.getElementById('mirror').checked) {
				fumenrender(mirrorFumen([setup]), container);
            } else fumenrender([setup], container);
            
		});
}

document.getElementById('mirror').addEventListener('change', (e) => {
    mirror_mino_text();
    container = document.getElementById('setup preview');
	if (e.target.checked) {
		console.log('mirrored orientation');
        fumenrender(mirrorFumen([setup]), container);
	} else {
		console.log('standard orientation');
		fumenrender([setup], container);
	}
});

document.addEventListener('keyup', (event) => {
    if (event.key == 'm') {
        mirror_mino_text();
        document.getElementById('mirror').checked ^= true;
        container = document.getElementById('setup preview');

		if (document.getElementById('mirror').checked) {
			console.log('mirrored orientation');
			fumenrender(mirrorFumen([setup]), container);
		} else {
			console.log('standard orientation');
			fumenrender([setup], container);
		}
	}
});

document.getElementById('queue').addEventListener('keyup', (event) => {
    if (event.key !== 'Enter') return; // Use `.key` instead.
    
    container = document.getElementById('container');

	queue = document.getElementById('queue').value;

	queue = queue.toUpperCase();

	if (queue == 'ALL') {
		solutions = data[0].slice(1);
        solutions = unglueFumen(solutions);
        fumenrender(solutions, container);
        
		return;
	}

	queue = queue.replace(/[^LJIOSZT]/g, ''); // only allow characters that are tetraminoes in the queue

	console.log(`Searching with queue '${queue}'`);
	document.getElementById('queue').value = queue;

	if (document.getElementById('mirror').checked) { // mirror the queue we're searching the data with 
		mirrored_queue = '';
		for (char of queue) {
			mirrored_queue += reverseMappingLetters[char];
		}
		queue = mirrored_queue;
	}

	expected_length = data[2][0].length;

	if (queue.length > expected_length) queue = queue.substring(0, expected_length);

	if (queue.length == expected_length) {
		found = false;

		data.forEach((entry) => {
			// to do: replace this linear search with a binary search
			if (entry[0] == queue) {
				found = true;
				solutions = [];
				for (i = 0; i < entry.length; i++) {
					if (entry[i] == 'O') solutions.push(data[0][i]);
				}

				solutions = unglueFumen(solutions);

                if (document.getElementById('mirror').checked) solutions = mirrorFumen(solutions);

				fumenrender(solutions, container);

				if (solutions.length == 0) console.log('No valid solutions for this queue.');
				return;
			}
		});

        if (!found) {
            console.log('Unsupported queue.');
            fumenrender([], container);
        }
	} else if (queue.length < expected_length) {
		found = false;

		solutions_boolean = Array( data[0].length ).fill(false) ;

		data.forEach((entry) => {
			if (entry[0].startsWith(queue)) {
				found = true;
				for (i = 0; i < entry.length; i++) {
					if (entry[i] == 'O') solutions_boolean[i] = true;
				}
			}
		});

		solutions = [];
        comments = [];
        for (i = 0; i < solutions_boolean.length; i++) {
            if (solutions_boolean[i]) {
                solutions.push(data[0][i]);
                comments.push(data[1][i]);
            }
        }
        solutions = unglueFumen(solutions);

        if (document.getElementById('mirror').checked) solutions = mirrorFumen(solutions);

		if (data[1][0] == 'comments') {
			if (document.getElementById('mirror').checked) {
				mirrored_comments = [];
				comments.forEach((comment) => {
					pieces = [...comment.matchAll(/[TLJSZIO]_tetramino/g)]; // yay regex
					pieces.forEach((piece) => {
						piece_name = piece[0];
						mirrored = reverseMappingLetters[piece_name[0]] + '_tetramino';
						comment = comment.replace(piece_name, mirrored);
					});
					mirrored_comments.push(comment);
                });
                fumenrender(solutions, container, mirrored_comments);
            }
            else fumenrender(solutions, container, comments);
		} else fumenrender(solutions, container);

		if (solutions.length == 0) console.log('No valid solutions for this queue.');

        if (!found) {
            console.log('Unsupported queue.');
            fumenrender([], container);
        }
    }
    
    render_mino_font();

	event.preventDefault(); // No need to `return false;`.
});

function render_mino_font() {
	const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
	while (treeWalker.nextNode()) {
		const node = treeWalker.currentNode;
		if (node.nodeType === document.TEXT_NODE) {
			a = node.textContent.match(/[TLJSZIO]_tetramino/g);
			if (a != null) {
                a.forEach((tetramino) => {
                    index = node.textContent.search(tetramino);
                    if (index >= 0) {
                        let range = document.createRange();

                        range.setStart(node, index);
                        range.setEnd(node, index + 11); // "X_tetramino" always 11 characters long
                        range.deleteContents();
                        e = document.createElement('span');
                        e.innerHTML = tetramino[0];
                        if (tetramino == 'L_tetramino') e.className = 'l_mino';
                        if (tetramino == 'J_tetramino') e.className = 'j_mino';
                        if (tetramino == 'S_tetramino') e.className = 's_mino';
                        if (tetramino == 'Z_tetramino') e.className = 'z_mino';
                        if (tetramino == 'I_tetramino') e.className = 'i_mino';
                        if (tetramino == 'O_tetramino') e.className = 'o_mino';
                        if (tetramino == 'T_tetramino') e.className = 't_mino';
                        range.insertNode(e);
                    }
				});
			}
		}
	}
}

function mirror_mino_text() {
    const l_collection = [...document.getElementsByClassName("l_mino")];
    const j_collection = [...document.getElementsByClassName("j_mino")];
    const s_collection = [...document.getElementsByClassName("s_mino")];
    const z_collection = [...document.getElementsByClassName("z_mino")];
    for (let i = 0; i < l_collection.length; i++) {
        l_collection[i].innerHTML = 'J';
        l_collection[i].className = "j_mino";
    }
    for (let i = 0; i < j_collection.length; i++) {
        j_collection[i].innerHTML = 'L';
        j_collection[i].className = "l_mino";
    }
    for (let i = 0; i < s_collection.length; i++) {
        s_collection[i].innerHTML = 'Z';
        s_collection[i].className = "z_mino";
    }
    for (let i = 0; i < z_collection.length; i++) {
        z_collection[i].innerHTML = 'S';
        z_collection[i].className = "S_mino";
    }
}

render_mino_font();
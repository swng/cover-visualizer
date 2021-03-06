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

	expected_length = data[1][0].length;

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

		if (!found) console.log('Unsupported queue.');
	} else if (queue.length < expected_length) {
		found = false;

		solutions_set = new Set();

		data.forEach((entry) => {
			if (entry[0].startsWith(queue)) {
				found = true;
				for (i = 0; i < entry.length; i++) {
					if (entry[i] == 'O') solutions_set.add(data[0][i]);
				}
			}
		});

		solutions = unglueFumen(solutions_set);

        if (document.getElementById('mirror').checked) solutions = mirrorFumen(solutions);

		fumenrender(solutions, container);

		if (solutions.length == 0) console.log('No valid solutions for this queue.');

		if (!found) console.log('Unsupported queue.');
	}

	event.preventDefault(); // No need to `return false;`.
});

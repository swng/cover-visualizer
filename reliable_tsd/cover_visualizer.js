const { decoder, encoder } = require('tetris-fumen');

data = [[], [], []];
setup = ['v115@vhAAgH', 'v115@vhAAgH', 'v115@vhAAgH'];
files = [
	['reliable bag 1 cover.csv'], // bag 1
	['reliable bag 2 cover.csv'], // bag 2
	[
		'reliable bag 3 STSD path cover.csv',
		'reliable bag 3 fallback path cover.csv',
    ], // bag 3
    [
		'reliable bag 4 STSD path cover.csv',
		'reliable bag 4 fallback path cover.csv',
    ], // bag 4
    [
		'reliable bag 5 STSD PC path cover.csv',
        'reliable bag 5 STSD mech path a cover.csv',
        'reliable bag 5 STSD mech path b cover.csv',
    ], // bag 5
    ['reliable bag 6 mech cover.csv'], // bag 6
];

// populate dropdowns for each bag with files
for (i = 0; i < 6; i++) {
	dropdown = document.getElementById(`bag ${i + 1} files`);
	for (filename of files[i]) {
		dropdown.append(new Option(filename));
	}
}

function loadIncludedFile(bag_num) {
	if (bag_num != 1 && bag_num != 2 && bag_num != 3 && bag_num != 4 && bag_num != 5 && bag_num != 6) return;

	filename = document.getElementById(`bag ${bag_num} files`).value; // .replace(/ /g, '%20') ??
	const url = window.location.href.replace('index.html', '').replace('/reliable_tsd', '') + 'cover_csvs/' + filename;
	console.log(url);
	fetch(url)
		.then((r) => r.text())
		.then((t) => {
			data[bag_num - 1] = $.csv.toArrays(t);
			console.log(data[bag_num - 1][0]);
			if (document.getElementById('mirror').checked) {
				queue = data[bag_num - 1][2][0];
				mirrored_queue = '';
				for (char of queue) {
					mirrored_queue += reverseMappingLetters[char];
				}
				console.log('Sample queue: ' + mirrored_queue);
			} else console.log('Sample queue: ' + data[bag_num - 1][2][0]);

			container = document.getElementById(`setup ${bag_num} preview`);

			fumen = data[bag_num - 1][0][1];
			pages = decoder.decode(fumen);
			pages[0].operation = undefined;
			setup[bag_num - 1] = encoder.encode([pages[0]]);

			if (document.getElementById('mirror').checked) {
				fumenrender(mirrorFumen([setup[bag_num - 1]]), container);
			} else fumenrender([setup[bag_num - 1]], container);
		});
}

document.getElementById('mirror').addEventListener('change', (e) => {
	if (e.target.checked) {
		console.log('mirrored orientation');
		for (bag_num = 1; bag_num < 4; bag_num++) {
			container = document.getElementById(`setup ${bag_num} preview`);
			fumenrender(mirrorFumen([setup[bag_num - 1]]), container);
		}
	} else {
		console.log('standard orientation');
		for (bag_num = 1; bag_num < 4; bag_num++) {
			container = document.getElementById(`setup ${bag_num} preview`);
			fumenrender([setup[bag_num - 1]], container);
		}
	}
});

document.addEventListener('keyup', (event) => {
	if (event.key == 'm') {
		document.getElementById('mirror').checked ^= true;

		if (document.getElementById('mirror').checked) {
			console.log('mirrored orientation');
			for (bag_num = 1; bag_num < 4; bag_num++) {
				container = document.getElementById(`setup ${bag_num} preview`);
				fumenrender(mirrorFumen([setup[bag_num - 1]]), container);
			}
		} else {
			console.log('standard orientation');
			for (bag_num = 1; bag_num < 4; bag_num++) {
				container = document.getElementById(`setup ${bag_num} preview`);
				fumenrender([setup[bag_num - 1]], container);
			}
		}
	}
});

function search(bag_num) {
	container = document.getElementById(`container ${bag_num}`);
	queue = document.getElementById(`bag ${bag_num} queue`).value;

	queue = queue.toUpperCase();

	if (queue == 'ALL') {
		solutions = data[bag_num - 1][0].slice(1);
		solutions = unglueFumen(solutions);

		if (data[bag_num - 1][1][0] == 'comments') {
			comments = data[bag_num - 1][1].slice(1);
			fumenrender(solutions, container, comments);
		} else fumenrender(solutions, container);

		return;
	}

	queue = queue.replace(/[^LJIOSZT]/g, ''); // only allow characters that are tetraminoes in the queue

	console.log(`Searching with queue '${queue}'`);
	document.getElementById(`bag ${bag_num} queue`).value = queue;

	// if (bag_num == 2) {
	// 	// allowing user to input just bag 2 without the saved L/J in hold from bag 1
	// 	if (queue[0] != 'L' && !document.getElementById('mirror').checked) queue = 'L' + queue;
	// 	if (queue[0] != 'J' && document.getElementById('mirror').checked) queue = 'J' + queue;
	// }

	if (document.getElementById('mirror').checked) {
		mirrored_queue = '';
		for (char of queue) {
			mirrored_queue += reverseMappingLetters[char];
		}
		queue = mirrored_queue;
	}

	expected_length = data[bag_num - 1][1][0].length;

	if (queue.length > expected_length) queue = queue.substring(0, expected_length);

	if (queue.length == expected_length) {
		found = false;

		data[bag_num - 1].forEach((entry) => {
			// to do: replace this linear search with a binary search
			if (entry[0] == queue) {
				found = true;
				solutions = [];
				comments = [];
				for (i = 0; i < entry.length; i++) {
					if (entry[i] == 'O') {
						solutions.push(data[bag_num - 1][0][i]);
						comments.push(data[bag_num - 1][1][i]);
					}
				}

				solutions = unglueFumen(solutions);

				if (document.getElementById('mirror').checked) solutions = mirrorFumen(solutions);

				if (data[bag_num - 1][1][0] == 'comments') {
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
				return;
			}
		});

		if (!found) console.log('Unsupported queue.');
	} else if (queue.length < expected_length) {
		found = false;

		solutions_set = new Set();
		comments_set = new Set();

		data[bag_num - 1].forEach((entry) => {
			if (entry[0].startsWith(queue)) {
				found = true;
				for (i = 0; i < entry.length; i++) {
					if (entry[i] == 'O') {
						solutions_set.add(data[bag_num - 1][0][i]);
						comments_set.add(data[bag_num - 1][1][i]);
					}
				}
			}
		});

		solutions = unglueFumen(solutions_set);

		if (document.getElementById('mirror').checked) solutions = mirrorFumen(solutions);

		if (data[bag_num - 1][1][0] == 'comments') {
			if (document.getElementById('mirror').checked) {
				mirrored_comments = [];
				comments_set.forEach((comment) => {
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
            else fumenrender(solutions, container, Array.from(comments_set));
		} else fumenrender(solutions, container);

		if (solutions.length == 0) console.log('No valid solutions for this queue.');

		if (!found) console.log('Unsupported queue.');
	}
}

document.getElementById('bag 1 queue').addEventListener('keyup', (event) => {
	if (event.key !== 'Enter') return; // Use `.key` instead.
	search(1);
	event.preventDefault(); // No need to `return false;`.
});

document.getElementById('bag 2 queue').addEventListener('keyup', (event) => {
	if (event.key !== 'Enter') return; // Use `.key` instead.
	search(2);
	event.preventDefault(); // No need to `return false;`.
});

document.getElementById('bag 3 queue').addEventListener('keyup', (event) => {
	if (event.key !== 'Enter') return; // Use `.key` instead.
	search(3);
	event.preventDefault(); // No need to `return false;`.
});

document.getElementById('bag 4 queue').addEventListener('keyup', (event) => {
	if (event.key !== 'Enter') return; // Use `.key` instead.
	search(4);
	event.preventDefault(); // No need to `return false;`.
});

document.getElementById('bag 5 queue').addEventListener('keyup', (event) => {
	if (event.key !== 'Enter') return; // Use `.key` instead.
	search(5);
	event.preventDefault(); // No need to `return false;`.
});

document.getElementById('bag 6 queue').addEventListener('keyup', (event) => {
	if (event.key !== 'Enter') return; // Use `.key` instead.
	search(6);
	event.preventDefault(); // No need to `return false;`.
});


loadIncludedFile(1); loadIncludedFile(2); loadIncludedFile(6); // tends to take 1-2 seconds to load
setTimeout(() => {
    search(1); search(6);
}, '2000');

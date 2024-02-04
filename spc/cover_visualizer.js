const { decoder, encoder } = require('tetris-fumen');

data = [[], []];
data_nohold = [undefined, undefined];
setup = ['v115@vhAAgH', 'v115@vhAAgH'];
files = [
	['T.csv', 'I.csv', 'J.csv', 'L.csv', 'S.csv', 'Z.csv'], // setup
];
SPC_files = {
    T: ['T-s-01.csv','T-s-01M.csv','T-s-02.csv','T-s-02M.csv','T-s-03.csv','T-s-03M.csv','T-s-04.csv','T-s-04M.csv','T-s-05.csv','T-s-05M.csv','T-s-06.csv','T-s-06M.csv','T-s-07.csv','T-s-07M.csv','T-s-08.csv','T-s-08M.csv','T-s-09.csv','T-s-09M.csv','T-s-10.csv','T-s-10M.csv','T-s-11.csv','T-s-11M.csv','T-s-12.csv','T-s-12M.csv','T-s-13.csv','T-s-13M.csv','T-s-14.csv','T-s-14M.csv','T-s-15.csv','T-s-15M.csv','T-s-15.csv','T-s-15M.csv','T-s-16.csv','T-s-16M.csv','T-s-17.csv','T-s-17M.csv','T-s-18.csv','T-s-18M.csv','T-s-19.csv','T-s-19M.csv','T-s-20.csv','T-s-20M.csv','T-s-20.csv','T-s-20M.csv','T-s-21.csv','T-s-21M.csv','T-s-22.csv','T-s-22M.csv','T-s-23.csv','T-s-23M.csv','T-s-23.csv','T-s-23M.csv','T-s-23M.csv','T-s-23.csv','T-s-24.csv','T-s-24M.csv','T-s-25.csv','T-s-25M.csv','T-s-25.csv','T-s-25M.csv','T-s-26.csv','T-s-26M.csv','T-s-27.csv','T-s-27M.csv','T-s-28.csv','T-s-28M.csv','T-s-29.csv','T-s-29M.csv','T-s-30.csv','T-s-30M.csv','T-s-31.csv','T-s-31M.csv','T-s-32.csv','T-s-32M.csv','T-s-33.csv','T-s-33M.csv','T-s-34.csv','T-s-34M.csv','T-s-35.csv','T-s-35M.csv','T-s-36.csv','T-s-36.csv','T-s-36M.csv','T-s-36M.csv','T-s-37.csv','T-s-37M.csv','T-s-38.csv','T-s-38M.csv','T-s-39.csv','T-s-39M.csv','T-s-40.csv','T-s-40M.csv','T-s-41.csv','T-s-41M.csv','T-s-42.csv','T-s-42M.csv','T-s-43.csv','T-s-43M.csv','T-s-44.csv','T-s-44M.csv','T-s-45.csv','T-s-45M.csv','T-s-46.csv','T-s-46M.csv'
	],
	I: ['I-s-01.csv', 'I-s-01M.csv', 'I-s-02.csv', 'I-s-02M.csv', 'I-s-03.csv', 'I-s-03M.csv', 'I-s-04.csv', 'I-s-04M.csv', 'I-s-05.csv', 'I-s-05M.csv', 'I-s-06.csv', 'I-s-06M.csv', 'I-s-07.csv', 'I-s-07M.csv', 'I-s-08.csv', 'I-s-08M.csv', 'I-s-09.csv', 'I-s-09M.csv', 'I-s-10.csv', 'I-s-10M.csv', 'I-s-11.csv', 'I-s-11M.csv', 'I-s-12.csv', 'I-s-12M.csv', 'I-s-13.csv', 'I-s-13M.csv', 'I-s-14.csv', 'I-s-14M.csv', 'I-s-15.csv', 'I-s-15M.csv', 'I-s-16.csv', 'I-s-16M.csv', 'I-s-17.csv', 'I-s-17M.csv', 'I-s-18.csv', 'I-s-18M.csv', 'I-s-19.csv', 'I-s-19M.csv', 'I-s-20.csv', 'I-s-20M.csv', 'I-s-21.csv', 'I-s-21M.csv', 'I-s-22.csv', 'I-s-22M.csv', 'I-s-23.csv', 'I-s-23M.csv', 'I-s-24.csv', 'I-s-24M.csv', 'I-s-25.csv', 'I-s-25M.csv', 'I-s-26.csv', 'I-s-26M.csv', 'I-s-27.csv', 'I-s-27M.csv', 'I-s-28.csv', 'I-s-28M.csv', 'I-s-29.csv', 'I-s-29M.csv', 'I-s-30.csv', 'I-s-30M.csv', 'I-s-31.csv', 'I-s-31M.csv', 'I-s-32.csv', 'I-s-32M.csv', 'I-s-33.csv', 'I-s-33M.csv', 'I-s-34.csv', 'I-s-34M.csv', 'I-s-35.csv', 'I-s-35M.csv', 'I-s-36.csv', 'I-s-36M.csv', 'I-s-37.csv', 'I-s-37M.csv', 'I-s-38.csv', 'I-s-38M.csv', 'I-s-39.csv', 'I-s-39M.csv', 'I-s-40.csv', 'I-s-40M.csv', 'I-s-41.csv', 'I-s-41M.csv', 'I-s-42.csv', 'I-s-42M.csv', 'I-s-43.csv', 'I-s-43M.csv', 'I-s-44.csv', 'I-s-44M.csv', 'I-s-45.csv', 'I-s-45M.csv', 'I-s-46.csv', 'I-s-46M.csv', 'I-s-47.csv', 'I-s-47M.csv', 'I-s-48.csv', 'I-s-48M.csv', 'I-s-49.csv', 'I-s-49M.csv', 'I-s-50.csv', 'I-s-50M.csv', 'I-s-51.csv', 'I-s-51M.csv', 'I-s-52.csv', 'I-s-52M.csv', 'I-s-53.csv', 'I-s-53M.csv', 'I-s-54.csv', 'I-s-54M.csv', 'I-s-55.csv', 'I-s-55M.csv', 'I-s-56.csv', 'I-s-56M.csv', 'I-s-57.csv', 'I-s-57M.csv', 'I-s-58.csv', 'I-s-58M.csv', 'I-s-59.csv', 'I-s-59M.csv', 'I-s-60.csv', 'I-s-60M.csv', 'I-s-61.csv', 'I-s-61M.csv', 'I-s-62.csv', 'I-s-62M.csv', 'I-s-63.csv', 'I-s-63M.csv', 'I-s-64.csv', 'I-s-64M.csv', 'I-s-65.csv', 'I-s-65M.csv'],
	J: ['J-s-01.csv', 'J-s-01M.csv', 'J-s-02.csv', 'J-s-02M.csv', 'J-s-03.csv', 'J-s-04.csv', 'J-s-04M.csv', 'J-s-05.csv', 'J-s-06.csv', 'J-s-06M.csv', 'J-s-07.csv', 'J-s-08.csv', 'J-s-09.csv', 'J-s-10.csv', 'J-s-10M.csv', 'J-s-11.csv', 'J-s-12.csv', 'J-s-12M.csv', 'J-s-13.csv', 'J-s-14.csv', 'J-s-15.csv', 'J-s-16.csv', 'J-s-17.csv', 'J-s-17M.csv', 'J-s-18.csv', 'J-s-19.csv', 'J-s-20.csv', 'J-s-21.csv', 'J-s-22.csv', 'J-s-23.csv', 'J-s-24.csv', 'J-s-24M.csv', 'J-s-25.csv', 'J-s-26.csv', 'J-s-27.csv', 'J-s-28.csv', 'J-s-29.csv', 'J-s-29M.csv', 'J-s-30.csv', 'J-s-31.csv', 'J-s-32.csv', 'J-s-32M.csv', 'J-s-33.csv', 'J-s-34.csv', 'J-s-35.csv', 'J-s-36.csv', 'J-s-37.csv', 'J-s-38.csv', 'J-s-39.csv', 'J-s-40.csv', 'J-s-41.csv', 'J-s-42.csv', 'J-s-43.csv', 'J-s-44.csv', 'J-s-45.csv', 'J-s-46.csv', 'J-s-47.csv', 'J-s-48.csv', 'J-s-49.csv', 'J-s-50.csv', 'J-s-50M.csv'],
	L: ['L-s-01.csv', 'L-s-01M.csv', 'L-s-02.csv', 'L-s-02M.csv', 'L-s-03.csv', 'L-s-04.csv', 'L-s-04M.csv', 'L-s-05.csv', 'L-s-06.csv', 'L-s-06M.csv', 'L-s-07.csv', 'L-s-08.csv', 'L-s-09.csv', 'L-s-10.csv', 'L-s-10M.csv', 'L-s-11.csv', 'L-s-12.csv', 'L-s-12M.csv', 'L-s-13.csv', 'L-s-14.csv', 'L-s-15.csv', 'L-s-16.csv', 'L-s-17.csv', 'L-s-17M.csv', 'L-s-18.csv', 'L-s-19.csv', 'L-s-20.csv', 'L-s-21.csv', 'L-s-22.csv', 'L-s-23.csv', 'L-s-24.csv', 'L-s-24M.csv', 'L-s-25.csv', 'L-s-26.csv', 'L-s-27.csv', 'L-s-28.csv', 'L-s-29.csv', 'L-s-29M.csv', 'L-s-30.csv', 'L-s-31.csv', 'L-s-32.csv', 'L-s-32M.csv', 'L-s-33.csv', 'L-s-34.csv', 'L-s-35.csv', 'L-s-36.csv', 'L-s-37.csv', 'L-s-38.csv', 'L-s-39.csv', 'L-s-40.csv', 'L-s-41.csv', 'L-s-42.csv', 'L-s-43.csv', 'L-s-44.csv', 'L-s-45.csv', 'L-s-46.csv', 'L-s-47.csv', 'L-s-48.csv', 'L-s-49.csv', 'L-s-50.csv', 'L-s-50M.csv'],
	S: ['S-s-01.csv', 'S-s-02.csv', 'S-s-03.csv', 'S-s-04.csv', 'S-s-05.csv', 'S-s-06.csv', 'S-s-07.csv', 'S-s-08.csv', 'S-s-09.csv', 'S-s-10.csv', 'S-s-11.csv', 'S-s-12.csv', 'S-s-13.csv', 'S-s-14.csv', 'S-s-14M.csv', 'S-s-15.csv', 'S-s-16.csv', 'S-s-17.csv', 'S-s-18.csv', 'S-s-19.csv', 'S-s-20.csv', 'S-s-21.csv', 'S-s-22.csv', 'S-s-23.csv', 'S-s-24.csv', 'S-s-25.csv', 'S-s-26.csv', 'S-s-27.csv', 'S-s-28.csv', 'S-s-29.csv', 'S-s-30.csv', 'S-s-31.csv', 'S-s-32.csv', 'S-s-33.csv', 'S-s-34.csv', 'S-s-35.csv', 'S-s-36.csv', 'S-s-37.csv', 'S-s-38.csv', 'S-s-39.csv', 'S-s-40.csv', 'S-s-41.csv', 'S-s-42.csv', 'S-s-43.csv', 'S-s-44.csv', 'S-s-45.csv', 'S-s-45M.csv', 'S-s-46.csv', 'S-s-47.csv', 'S-s-48.csv', 'S-s-49.csv', 'S-s-50.csv', 'S-s-51.csv', 'S-s-52.csv', 'S-s-53.csv', 'S-s-54.csv', 'S-s-55.csv', 'S-s-56.csv', 'S-s-57.csv', 'S-s-58.csv', 'S-s-59.csv', 'S-s-59M.csv', 'S-s-60.csv', 'S-s-61.csv', 'S-s-62.csv', 'S-s-63.csv', 'S-s-64.csv', 'S-s-65.csv', 'S-s-66.csv', 'S-s-67.csv', 'S-s-68.csv', 'S-s-69.csv', 'S-s-70.csv', 'S-s-71.csv', 'S-s-72.csv', 'S-s-72M.csv', 'S-s-73.csv', 'S-s-74.csv', 'S-s-75.csv', 'S-s-76.csv', 'S-s-77.csv', 'S-s-78.csv', 'S-s-79.csv', 'S-s-80.csv', 'S-s-81.csv', 'S-s-82.csv', 'S-s-83.csv', 'S-s-84.csv'],
	Z: ['Z-s-01.csv', 'Z-s-02.csv', 'Z-s-03.csv', 'Z-s-04.csv', 'Z-s-05.csv', 'Z-s-06.csv', 'Z-s-07.csv', 'Z-s-08.csv', 'Z-s-09.csv', 'Z-s-10.csv', 'Z-s-11.csv', 'Z-s-12.csv', 'Z-s-13.csv', 'Z-s-14.csv', 'Z-s-14M.csv', 'Z-s-15.csv', 'Z-s-16.csv', 'Z-s-17.csv', 'Z-s-18.csv', 'Z-s-19.csv', 'Z-s-20.csv', 'Z-s-21.csv', 'Z-s-22.csv', 'Z-s-23.csv', 'Z-s-24.csv', 'Z-s-25.csv', 'Z-s-26.csv', 'Z-s-27.csv', 'Z-s-28.csv', 'Z-s-29.csv', 'Z-s-30.csv', 'Z-s-31.csv', 'Z-s-32.csv', 'Z-s-33.csv', 'Z-s-34.csv', 'Z-s-35.csv', 'Z-s-36.csv', 'Z-s-37.csv', 'Z-s-38.csv', 'Z-s-39.csv', 'Z-s-40.csv', 'Z-s-41.csv', 'Z-s-42.csv', 'Z-s-43.csv', 'Z-s-44.csv', 'Z-s-45.csv', 'Z-s-45M.csv', 'Z-s-46.csv', 'Z-s-47.csv', 'Z-s-48.csv', 'Z-s-49.csv', 'Z-s-50.csv', 'Z-s-51.csv', 'Z-s-52.csv', 'Z-s-53.csv', 'Z-s-54.csv', 'Z-s-55.csv', 'Z-s-56.csv', 'Z-s-57.csv', 'Z-s-58.csv', 'Z-s-59.csv', 'Z-s-59M.csv', 'Z-s-60.csv', 'Z-s-61.csv', 'Z-s-62.csv', 'Z-s-63.csv', 'Z-s-64.csv', 'Z-s-65.csv', 'Z-s-66.csv', 'Z-s-67.csv', 'Z-s-68.csv', 'Z-s-69.csv', 'Z-s-70.csv', 'Z-s-71.csv', 'Z-s-72.csv', 'Z-s-72M.csv', 'Z-s-73.csv', 'Z-s-74.csv', 'Z-s-75.csv', 'Z-s-76.csv', 'Z-s-77.csv', 'Z-s-78.csv', 'Z-s-79.csv', 'Z-s-80.csv', 'Z-s-81.csv', 'Z-s-82.csv', 'Z-s-83.csv', 'Z-s-84.csv'],
}

// populate dropdowns for each bag with files
for (i = 0; i < 1; i++) {
	dropdown = document.getElementById(`bag ${i + 1} files`);
	for (filename of files[i]) {
		dropdown.append(new Option(filename));
	}
}
// dropdown = document.getElementById(`bag 2 files`);
// for (filename of SPC_files["O"]) {
//     dropdown.append(new Option(filename));
// }

async function loadIncludedFile(bag_num) {
	if (bag_num != 1 && bag_num != 2) return;

	filename = document.getElementById(`bag ${bag_num} files`).value; // .replace(/ /g, '%20') ??
	const url = '../cover_csvs/spc/' + filename;
	console.log(url);
	await fetch(url)
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

			let container = document.getElementById(`setup ${bag_num} preview`);

			fumen = data[bag_num - 1][0][1];
			pages = decoder.decode(fumen);
			pages[0].operation = undefined;
			setup[bag_num - 1] = encoder.encode([pages[0]]);

			if (document.getElementById('mirror').checked) {
				fumenrender(mirrorFumen([setup[bag_num - 1]]), container);
			} else fumenrender([setup[bag_num - 1]], container);
        });
    
    if (bag_num == 1) {
        let temp = document.getElementById("hold_piece");
        let temp2 = (document.getElementById(`bag 1 files`).value)[0];
        temp.textContent = temp2;
        temp.className = temp2 + "_mino";

        dropdown = document.getElementById(`bag 2 files`);
        dropdown.options.length = 0;
        for (filename of SPC_files[temp2]) {
            dropdown.append(new Option(filename));
        }

    }
    
    if (bag_num == 2) {
        fetch(url.slice(0, -4) + "_nohold.csv") // may throw error if nohold cover data doesn't exist
            .then((r) => {
                if (!r.ok) throw Error("nohold data doesn't exist for this setup");
                else return r.text();
            })
            .then((t) => {
                data_nohold[bag_num - 1] = {};
                let temp = $.csv.toArrays(t); // convert array to dictionary for faster access
                for (let line of temp) {
                    data_nohold[bag_num - 1][line[0]] = line;
                }
            })
            .catch((e) => {
                data_nohold[bag_num - 1] = undefined;
            })
        }
}

document.getElementById('mirror').addEventListener('change', (e) => {
    mirror_mino_text();
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
        mirror_mino_text();
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

async function search(bag_num) {
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
    
    if (bag_num == 1 && queue.length > 7) {
        let held_piece = queue[0];
        if (queue.slice(1).includes(held_piece)) { // the user inputted the dupe piece
            queue = queue.slice(1);
            document.getElementById('bag 1 files').value = held_piece + ".csv";
            await loadIncludedFile(1);
        }
    }

	console.log(`Searching with queue '${queue}'`);
	document.getElementById(`bag ${bag_num} queue`).value = queue;

	if (document.getElementById('mirror').checked) {
		mirrored_queue = '';
		for (char of queue) {
			mirrored_queue += reverseMappingLetters[char];
		}
		queue = mirrored_queue;
	}

	expected_length = data[bag_num - 1][3][0].length;

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
                        if (data_nohold[bag_num - 1] != undefined) { // find max scores
                            let pages = decoder.decode(data[bag_num - 1][0][i]);
                            let max_score_obj;
                            let hold_reorderings = hold_reorders(queue);
                            for (queue_2 of hold_reorderings) {
                                if (!(queue_2 in data_nohold[bag_num - 1])) throw queue_2 + " not in nohold cover data"; // nohold cover data not fully generated?
                                valid = (queue_2 in data_nohold[bag_num - 1]) && data_nohold[bag_num - 1][queue_2][i] == 'O';
                                if (valid) {
                                    let score_obj = get_score(queue_2, pages, true, 1, 400);
                                    if (max_score_obj !== pick_better_score(score_obj, max_score_obj)) {
                                        max_score_obj = score_obj;
                                        max_queue = queue;
                                        max_sol_index = j;
                                    }
                                }
        
                                
                            }
                            let insert_index = 0;
                            for (j = 0; j < comments.length; j++) {
                                if (max_score_obj !== pick_better_score(max_score_obj, comments[j])) insert_index = j+1;
                            }
                            comments.splice(insert_index, 0, max_score_obj);
                            solutions.splice(insert_index, 0, solutions.pop());

                        }
						else comments.push(data[bag_num - 1][1][i]);
					}
                }
                if (data_nohold[bag_num - 1] != undefined) { // render comments as strings
                    comments = comments.map(comment => score_object_string(comment));
                }

				solutions = unglueFumen(solutions);

				if (document.getElementById('mirror').checked) solutions = mirrorFumen(solutions);

				if (data[bag_num - 1][1][0] == 'comments') {
					if (document.getElementById('mirror').checked) {
						mirrored_comments = [];
						comments.forEach((comment) => {
							let pieces = [...comment.matchAll(/[TLJSZIO]_tetramino/g)]; // yay regex
							pieces.forEach((piece) => {
								piece_name = piece[0];
								mirrored = reverseMappingLetters[piece_name[0]] + '_tetramino';
								comment = comment.replace(piece_name, mirrored);
							});
							mirrored_comments.push(comment);
						});
						fumenrender(solutions, container, mirrored_comments);
					} else fumenrender(solutions, container, comments);
                } else if (data_nohold[bag_num - 1] != undefined) fumenrender(solutions, container, comments);
                else fumenrender(solutions, container);

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

		solutions_boolean = Array(data[bag_num - 1][0].length).fill(false);

		data[bag_num - 1].forEach((entry) => {
			if (entry[0].startsWith(queue)) {
				found = true;
				for (i = 0; i < entry.length; i++) {
					if (entry[i] == 'O') {
						solutions_boolean[i] = true;
					}
				}
			}
		});

		solutions = [];
		comments = [];
		for (i = 0; i < solutions_boolean.length; i++) {
			if (solutions_boolean[i]) {
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
					let pieces = [...comment.matchAll(/[TLJSZIO]_tetramino/g)]; // yay regex
					pieces.forEach((piece) => {
						piece_name = piece[0];
						mirrored = reverseMappingLetters[piece_name[0]] + '_tetramino';
						comment = comment.replace(piece_name, mirrored);
					});
					mirrored_comments.push(comment);
				});
				fumenrender(solutions, container, mirrored_comments);
			} else fumenrender(solutions, container, comments);
		} else fumenrender(solutions, container);

		if (solutions.length == 0) console.log('No valid solutions for this queue.');

		if (!found) {
			console.log('Unsupported queue.');
			fumenrender([], container);
		}
	}

    if (bag_num == 1) {
        for (figure of container.children) {
            let setup_name = figure.lastChild.lastChild.textContent.split('/')[0]; // bruh
            held_piece = setup_name[0];
            if (held_piece in SPC_files && SPC_files[held_piece].includes(setup_name + ".csv")) {
                figure.onclick = async function () {
                    var url = new URL(window.location.href);
                    url.searchParams.set("held_piece", held_piece);
                    url.searchParams.set("setup", setup_name);
                    window.history.replaceState(null, '', url);

                    document.getElementById('bag 2 files').value = setup_name + ".csv";
                    await loadIncludedFile(2);
                    search(2);
                };
            }
        }
    }

	render_mino_font();
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


// loadIncludedFile(1); // tends to take 1-2 seconds to load
// setTimeout(() => {
// 	search(1);
// }, '2000');

render_mino_font();

async function loadQuery() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    held_piece = urlSearchParams.get("held_piece");
    if ("LJSZIOT".includes(held_piece)) {
        document.getElementById('bag 1 files').value = held_piece + ".csv";
        await loadIncludedFile(1);
    }

    setup_name = urlSearchParams.get("setup");
    if (held_piece in SPC_files && SPC_files[held_piece].includes(setup_name + ".csv")) {
        document.getElementById('bag 2 files').value = setup_name + ".csv";
        await loadIncludedFile(2);
        search(2);
    }
}

loadQuery();
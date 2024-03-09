const { decoder, encoder } = require('tetris-fumen');

data = [[], []];
data_nohold = [undefined, undefined];
setup = ['v115@vhAAgH', 'v115@vhAAgH'];
files = [
	['O.csv', 'I.csv', 'S.csv', 'Z.csv', 'T.csv'], // setup
];
DPC_files = {
    O:
    ['O-01.csv','O-01M.csv','O-02.csv','O-02M.csv','O-03.csv','O-03M.csv','O-04.csv','O-04M.csv','O-05.csv','O-05M.csv','O-06.csv','O-06M.csv','O-07.csv','O-07M.csv','O-08.csv','O-08M.csv','O-09.csv','O-09M.csv','O-10.csv','O-10M.csv','O-11.csv','O-11M.csv','O-12.csv','O-12M.csv','O-13.csv','O-13M.csv','O-14.csv','O-14M.csv','O-15.csv','O-15M.csv','O-16.csv','O-16M.csv','O-17.csv','O-17M.csv','O-18.csv','O-18M.csv','O-19.csv','O-19M.csv','O-20.csv','O-20M.csv','O-21.csv','O-21M.csv','O-22.csv','O-22M.csv','O-23.csv','O-23M.csv','O-24.csv','O-24M.csv','O-25.csv','O-25M.csv'],
	I:
	['I-01.csv','I-01M.csv','I-02.csv','I-02M.csv','I-03.csv','I-03M.csv','I-04.csv','I-04M.csv','I-05.csv','I-05M.csv','I-06.csv','I-06M.csv','I-07.csv','I-07M.csv','I-08.csv','I-08M.csv','I-09.csv','I-09M.csv','I-10.csv','I-10M.csv','I-11.csv','I-11M.csv','I-12.csv','I-12M.csv','I-13.csv','I-13M.csv','I-14.csv','I-14M.csv','I-15.csv','I-15M.csv'],
	S:
	['S-01.csv','S-02.csv','S-03.csv','S-03M.csv','S-04.csv','S-05.csv','S-05M.csv','S-06.csv','S-07.csv','S-07M.csv','S-08.csv','S-09.csv','S-10.csv','S-11.csv','S-12.csv','S-13.csv','S-14.csv','S-15.csv','S-15M.csv','S-16.csv','S-17.csv','S-18.csv','S-19.csv','S-20.csv','S-21.csv','S-22.csv','S-23.csv','S-24.csv','S-25.csv','S-26.csv','S-27.csv','S-27M.csv','S-28.csv','S-29.csv','S-30.csv','S-30M.csv','S-31.csv','S-32.csv','S-33.csv','S-34.csv','S-35.csv','S-36.csv','S-37.csv','S-37M.csv','S-38.csv','S-39.csv','S-40.csv','S-41.csv','S-42.csv','S-43.csv','S-44.csv','S-45.csv','S-46.csv','S-47.csv','S-48.csv','S-49.csv','S-50.csv'],
	Z:
	['Z-01.csv','Z-02.csv','Z-03.csv','Z-03M.csv','Z-04.csv','Z-05.csv','Z-05M.csv','Z-06.csv','Z-07.csv','Z-07M.csv','Z-08.csv','Z-09.csv','Z-10.csv','Z-11.csv','Z-12.csv','Z-13.csv','Z-14.csv','Z-15.csv','Z-15M.csv','Z-16.csv','Z-17.csv','Z-18.csv','Z-19.csv','Z-20.csv','Z-21.csv','Z-22.csv','Z-23.csv','Z-24.csv','Z-25.csv','Z-26.csv','Z-27.csv','Z-27M.csv','Z-28.csv','Z-29.csv','Z-30.csv','Z-30M.csv','Z-31.csv','Z-32.csv','Z-33.csv','Z-34.csv','Z-35.csv','Z-36.csv','Z-37.csv','Z-37M.csv','Z-38.csv','Z-39.csv','Z-40.csv','Z-41.csv','Z-42.csv','Z-43.csv','Z-44.csv','Z-45.csv','Z-46.csv','Z-47.csv','Z-48.csv','Z-49.csv','Z-50.csv'],
	T:
	['T-01.csv','T-01M.csv','T-02.csv','T-02M.csv','T-03.csv','T-03M.csv','T-04.csv','T-04M.csv','T-05.csv','T-05M.csv','T-06.csv','T-06M.csv','T-07.csv','T-07M.csv','T-08.csv','T-08M.csv','T-09.csv','T-09M.csv','T-10.csv','T-10M.csv','T-11.csv','T-11M.csv','T-12.csv','T-12M.csv','T-13.csv','T-13M.csv','T-14.csv','T-14M.csv','T-15.csv','T-15M.csv','T-16.csv','T-16M.csv','T-17.csv','T-17M.csv','T-18.csv','T-18M.csv','T-19.csv','T-19M.csv','T-20.csv','T-20M.csv','T-21.csv','T-21M.csv','T-22.csv','T-22M.csv','T-23.csv','T-23M.csv','T-24.csv','T-24M.csv','T-25.csv','T-25M.csv','T-26.csv','T-26M.csv','T-27.csv','T-27M.csv','T-28.csv','T-28M.csv','T-29.csv','T-29M.csv','T-30.csv','T-30M.csv','T-31.csv','T-31M.csv','T-32.csv','T-32M.csv','T-33.csv','T-33M.csv','T-34.csv','T-34M.csv','T-35.csv','T-35M.csv','T-36.csv','T-36M.csv','T-37.csv','T-37M.csv','T-38.csv','T-38M.csv','T-39.csv','T-39M.csv','T-40.csv','T-40M.csv','T-41.csv','T-41M.csv','T-42.csv','T-42M.csv','T-43.csv','T-43M.csv','T-44.csv','T-44M.csv','T-45.csv','T-45M.csv','T-46.csv','T-46M.csv','T-47.csv','T-47M.csv','T-48.csv','T-48M.csv','T-49.csv','T-49M.csv','T-50.csv','T-50M.csv','T-51.csv','T-51M.csv','T-52.csv','T-52M.csv','T-53.csv','T-53M.csv','T-54.csv','T-54M.csv','T-55.csv','T-55M.csv','T-56.csv','T-56M.csv','T-57.csv','T-57M.csv','T-58.csv','T-58M.csv','T-59.csv','T-59M.csv','T-60.csv','T-60M.csv','T-61.csv','T-61M.csv','T-62.csv','T-62M.csv','T-63.csv','T-63M.csv','T-64.csv','T-64M.csv','T-65.csv']
}

// populate dropdowns for each bag with files
for (i = 0; i < 1; i++) {
	dropdown = document.getElementById(`bag ${i + 1} files`);
	for (filename of files[i]) {
		dropdown.append(new Option(filename));
	}
}
// dropdown = document.getElementById(`bag 2 files`);
// for (filename of DPC_files["O"]) {
//     dropdown.append(new Option(filename));
// }

async function loadIncludedFile(bag_num) {
	if (bag_num != 1 && bag_num != 2) return;

	filename = document.getElementById(`bag ${bag_num} files`).value; // .replace(/ /g, '%20') ??
	let url = '../cover_csvs/dpc_3/' + filename;
	if (filename.includes('-s-')) url = url.replace("dpc_2", "spc");
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
        for (filename of DPC_files[temp2]) {
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
            if (held_piece in DPC_files && DPC_files[held_piece].includes(setup_name + ".csv")) {
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
    if (held_piece in DPC_files && DPC_files[held_piece].includes(setup_name + ".csv")) {
        document.getElementById('bag 2 files').value = setup_name + ".csv";
        await loadIncludedFile(2);
        search(2);
    }
}

loadQuery();
const { decoder, encoder } = require('tetris-fumen');

data = [[], []];
data_nohold = [undefined, undefined];
setup = ['v115@vhAAgH', 'v115@vhAAgH'];
files = [
	['iljo_2nd_qb_cover.csv'], // setup
    ['sandbox cover.csv', 'cave_left cover.csv', 'cave_right cover.csv'] // sols
];

setups_data = {};

// populate dropdowns for each bag with files
for (i = 0; i < 2; i++) {
	dropdown = document.getElementById(`bag ${i + 1} files`);
	for (filename of files[i]) {
		dropdown.append(new Option(filename));
	}
}

async function loadIncludedFile(bag_num) {
	if (bag_num != 1 && bag_num != 2) return;

	filename = document.getElementById(`bag ${bag_num} files`).value; // .replace(/ /g, '%20') ??
	const url = '../cover_csvs/' + filename;
	console.log(url);
	await fetch(url)
		.then((r) => r.text())
		.then((t) => {
			data[bag_num - 1] = $.csv.toArrays(t);
			console.log(data[bag_num - 1][0]);
            console.log('Sample queue: ' + data[bag_num - 1][2][0]);

			let container = document.getElementById(`setup ${bag_num} preview`);

			fumen = data[bag_num - 1][0][1];
			pages = decoder.decode(fumen);
			pages[0].operation = undefined;
			setup[bag_num - 1] = encoder.encode([pages[0]]);

			fumenrender([setup[bag_num - 1]], container);
        });
    
    if (bag_num == 2) {
        fetch(url.slice(0, -4) + " nohold.csv") // may throw error if nohold cover data doesn't exist
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

// document.getElementById('mirror').addEventListener('change', (e) => {
//     mirror_mino_text();
// 	if (e.target.checked) {
// 		console.log('mirrored orientation');
// 		for (bag_num = 1; bag_num < 4; bag_num++) {
// 			container = document.getElementById(`setup ${bag_num} preview`);
// 			fumenrender(mirrorFumen([setup[bag_num - 1]]), container);
// 		}
// 	} else {
// 		console.log('standard orientation');
// 		for (bag_num = 1; bag_num < 4; bag_num++) {
// 			container = document.getElementById(`setup ${bag_num} preview`);
// 			fumenrender([setup[bag_num - 1]], container);
// 		}
// 	}
// });

// document.addEventListener('keyup', (event) => {
//     if (event.key == 'm') {
//         mirror_mino_text();
// 		document.getElementById('mirror').checked ^= true;

// 		if (document.getElementById('mirror').checked) {
// 			console.log('mirrored orientation');
// 			for (bag_num = 1; bag_num < 4; bag_num++) {
// 				container = document.getElementById(`setup ${bag_num} preview`);
// 				fumenrender(mirrorFumen([setup[bag_num - 1]]), container);
// 			}
// 		} else {
// 			console.log('standard orientation');
// 			for (bag_num = 1; bag_num < 4; bag_num++) {
// 				container = document.getElementById(`setup ${bag_num} preview`);
// 				fumenrender([setup[bag_num - 1]], container);
// 			}
// 		}
// 	}
// });

async function search(bag_num) {
	container = document.getElementById(`container ${bag_num}`);
	queue = document.getElementById(`bag ${bag_num} queue`).value;

	queue = queue.toUpperCase();

    found = false;

    queue = queue.replace(/[^LJIOSZT]/g, ''); // only allow characters that are tetraminoes in the queue

	if (queue == 'ALL' || queue == '') {
		solutions = data[bag_num - 1][0].slice(1);
		solutions = unglueFumen(solutions);

		if (data[bag_num - 1][1][0] == 'comments') {
			comments = data[bag_num - 1][1].slice(1);
			fumenrender(solutions, container, comments);
		} else fumenrender(solutions, container);

        found = true;

		// return;
	}

    else if (bag_num == 1 && queue.length < 7 ) { // pls give whole queue
        fumenrender([], container);
        console.log("pls give whole queue")
        // return; 
    }



	console.log(`Searching with queue '${queue}'`);
	document.getElementById(`bag ${bag_num} queue`).value = queue;

	// if (document.getElementById('mirror').checked) {
	// 	mirrored_queue = '';
	// 	for (char of queue) {
	// 		mirrored_queue += reverseMappingLetters[char];
	// 	}
	// 	queue = mirrored_queue;
	// }

	// expected_length = data[bag_num - 1][2][0].length;

	// if (queue.length > expected_length) queue = queue.substring(0, expected_length);

    if (bag_num == 1 && queue.length >= 7) {
        data[0].forEach((entry) => {
            if (queue.startsWith(entry[0])) {
                found = true;
                solutions = [];
                comments = [];
                for (i = 0; i < entry.length; i++) {
                    if (entry[i] == 'O') {
                        // solutions.push(data[bag_num - 1][0][i]);
                        // the SETUP is buildable
                        // will the setup be maximally solvable for any possible upcoming queue?
                        let setup_name = data[0][1][i];
                        let setup = setups_data[setup_name];
                        // get determine possible upcoming queues
                        let leftover_queue = queue;
                        let pages = decoder.decode(data[0][0][i]);
                        for (let page of pages) { // leftover queue is the pieces not used in the setup
                            leftover_queue = leftover_queue.replace(page.operation.type,"");
                        }
                        let upcoming_pieces = "LJSZIOT";
                        for (piece of leftover_queue) { // upcoming pieces is a fresh bag minus the leftover queue pieces
                            upcoming_pieces = upcoming_pieces.replace(piece, "");
                        }
                        if (setup_name == "sandbox" && !leftover_queue.substring(1).includes('I')) upcoming_pieces += "I"; // special case, sandbox keeps the old I in hold
                        
                        let upcoming_queues = generate_all_permutations(upcoming_pieces).map(q => leftover_queue + q.join(''));

                        // now run through the setup with all possible upcoming queues and see solve %

                        let successes = 0;

                        setup.forEach((entry2) => {
                            if (upcoming_queues.includes(entry2[0])) {
                                if (entry2.includes("O")) successes++; // this queue has a solution for this solution
                            }
                        })

                        if (successes > 0) {
                            solutions.push(data[0][0][i]);
                            comments.push(data[0][1][i] + " - " + successes/upcoming_queues.length * 100 + "%");
                        }



                    }
                }

                solutions = unglueFumen(solutions);
                fumenrender(solutions, container, comments);
            }
        });
    }

    if (!found) {
        console.log('Unsupported queue.');
        fumenrender([], container);
    }

    if (bag_num == 1) {
        for (figure of container.children) {
            let setup_name = figure.lastChild.lastChild.textContent.split(' ')[0]; // bruh
            if (files[1].includes(setup_name + " cover.csv")) {

                figure.onclick = async function () {
                //     var url = new URL(window.location.href);
                //     url.searchParams.set("held_piece", held_piece);
                //     url.searchParams.set("setup", setup_name);
                //     window.history.replaceState(null, '', url);

                    document.getElementById('bag 2 files').value = setup_name + " cover.csv";
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

function generate_all_permutations(l)
{
	let n = l.length;
	if (n === 0) {return [[]];}
	let cut = generate_all_permutations(l.slice(1));
	return cut
		.map(p => {
			let inserts = [];
			for (let i = 0; i < n; i++)
			{
				inserts[i] = p.slice();
				inserts[i].splice(i, 0, l[0]);
			}
			return inserts;
		})
		.flat(1);
}


// loadIncludedFile(1); // tends to take 1-2 seconds to load
// setTimeout(() => {
// 	search(1);
// }, '2000');

render_mino_font();

// async function loadQuery() {
//     const urlSearchParams = new URLSearchParams(window.location.search);
//     held_piece = urlSearchParams.get("held_piece");
//     if ("LJSZIOT".includes(held_piece)) {
//         document.getElementById('bag 1 files').value = held_piece + ".csv";
//         await loadIncludedFile(1);
//     }

//     setup_name = urlSearchParams.get("setup");
//     if (held_piece in DPC_files && DPC_files[held_piece].includes(setup_name + ".csv")) {
//         document.getElementById('bag 2 files').value = setup_name + ".csv";
//         await loadIncludedFile(2);
//         search(2);
//     }
// }

// loadQuery();

async function preLoad() {
    await loadIncludedFile(1);
    await search(1);

    for (let i = 0; i < 3; i++) {
        let filename = files[1][i];
        let url = '../cover_csvs/' + filename;
        setup_name = filename.split(' ')[0];
        await fetch(url)
		.then((r) => r.text())
		.then((t) => {
			setups_data[setup_name] = $.csv.toArrays(t);
        });
    }
}

preLoad();
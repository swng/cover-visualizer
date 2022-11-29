// v1.6

function toPage(in_field, i) {
	// for debugging purposes
	let field = in_field.copy();
	flags = {
		rise: false,
		mirror: false,
		colorize: true,
		comment: '',
		lock: true,
		piece: undefined,
	};
	page = {
		comment: '',
		field,
		flags: flags,
		index: i,
	};
	return page;
}

function occupiedCorner(field, corner) {
	// field.at with extra check for out of bounds
	if (corner[1] < 0 || corner[0] < 0 || corner[0] > 9) return true;
	return field.at(corner[0], corner[1]) != '_';
}

function clearedOffset(rowsCleared, yIndex) {
	// given previously cleared rows, what is the "global" y index of the piece?
	for (let row of rowsCleared) {
		if (yIndex >= row) yIndex++;
	}
	return yIndex;
}

function inverse_clearedOffset(rowsCleared, yIndex) {
	// given previously cleared rows and the global y index, what is the "local" y index?
	offset = 0;
	for (let row of rowsCleared) {
		if (yIndex > row) offset++;
	}
	return offset;
}

function hold_reorders(queue) {
	if (queue.length <= 1) return new Set(queue); // base case

	let result = new Set();

	let a = hold_reorders(queue.substring(1)); // use first piece, work on the 2nd-rest
	for (let part of a.values()) {
		result.add(queue[0] + part);
	}
	let b = hold_reorders(queue[0] + queue.substring(2)); // use second piece, work on 1st + 3rd-rest
	for (let part of b.values()) {
		result.add(queue[1] + part);
	}
	return result;
}

function get_cumulative_rows_cleared(solution_pages) {
    let rowsCleared = [];
    let testing_field = solution_pages[0].field.copy(); // a copy of it so we don't disturb the original field
    let cumulative_rowsCleared = [[]];
    for (let page of solution_pages) {
        testing_field.fill(page.operation);
        let positions = page.operation.positions();

        // check for line clears
        let y_positions = new Set();
        for (position of positions) {
            y_positions.add(position.y);
        }
        let temp_rowsCleared = new Set();
        for (let y of y_positions) {
            let line_cleared = true;
            for (let x = 0; x < 10; x++) {
                if (testing_field.at(x, y) == '_') line_cleared = false;
            }
            if (line_cleared) temp_rowsCleared.add(clearedOffset(rowsCleared, y));
        }
        for (let row of temp_rowsCleared) rowsCleared.push(row);
        testing_field.clearLine();
        rowsCleared.sort();
        cumulative_rowsCleared.push(rowsCleared.slice());
    }

    return cumulative_rowsCleared;
}

function spin_cw(operation) {
	old_rotation = operation.rotation;
	switch (old_rotation) {
		case 'spawn':
			operation.rotation = 'right';
			break;
		case 'right':
			operation.rotation = 'reverse';
			break;
		case 'reverse':
			operation.rotation = 'left';
			break;
		case 'left':
			operation.rotation = 'spawn';
			break;
	}
	return operation;
}

function spin_ccw(operation) {
	old_rotation = operation.rotation;
	switch (old_rotation) {
		case 'spawn':
			operation.rotation = 'left';
			break;
		case 'left':
			operation.rotation = 'reverse';
			break;
		case 'reverse':
			operation.rotation = 'right';
			break;
		case 'right':
			operation.rotation = 'spawn';
			break;
	}
	return operation;
}

function spin_180(operation) {
    old_rotation = operation.rotation;
    switch (old_rotation) {
        case 'spawn':
			operation.rotation = 'reverse';
			break;
		case 'left':
			operation.rotation = 'right';
			break;
		case 'reverse':
			operation.rotation = 'spawn';
			break;
		case 'right':
			operation.rotation = 'left';
			break;
    }
    return operation;
}

function get_cw_kicks(operation, initial_rotation) {
    result = [
        operation.copy(), operation.copy(), operation.copy(), operation.copy(), operation.copy()
    ] // incredible
    switch (initial_rotation) {
        case 'spawn':  // 0->R
            result[1].x -= 1;
            result[2].x -= 1; result[2].y += 1;
                              result[3].y -= 2;
            result[4].x -= 1; result[4].y -= 2;
            break;
        case 'right':  // R->2  
            result[1].x += 1;
            result[2].x += 1; result[2].y -= 1;
                              result[3].y += 2;
            result[4].x += 1; result[4].y += 2;
            break;
        case 'reverse':  // 2->L
            result[1].x += 1;
            result[2].x += 1; result[2].y += 1;
                              result[3].y -= 2;
            result[4].x += 1; result[4].y -= 2;
            break;
        case 'left':  // L->0
            result[1].x -= 1;
            result[2].x -= 1; result[2].y -= 1;
                              result[3].y += 2;
            result[4].x -= 1; result[4].y += 2;
            break;
    }
    return result;
}

function get_ccw_kicks(operation, initial_rotation) {
    result = [
        operation.copy(), operation.copy(), operation.copy(), operation.copy(), operation.copy()
    ] // incredible
    switch (initial_rotation) {
        case 'spawn':  // 0->L
            result[1].x += 1;
            result[2].x += 1; result[2].y += 1;
                              result[3].y -= 2;
            result[4].x += 1; result[4].y -= 2;
            break;
        case 'left':  // L->2  
            result[1].x -= 1;
            result[2].x -= 1; result[2].y -= 1;
                              result[3].y += 2;
            result[4].x -= 1; result[4].y += 2;
            break;
        case 'reverse':  // 2->R
            result[1].x -= 1;
            result[2].x -= 1; result[2].y += 1;
                              result[3].y -= 2;
            result[4].x -= 1; result[4].y -= 2;
            break;
        case 'right':  // R->0
            result[1].x += 1;
            result[2].x += 1; result[2].y -= 1;
                              result[3].y += 2;
            result[4].x += 1; result[4].y += 2;
            break;
    }
    return result;
}

function get_180_kicks(operation, initial_rotation) {
    result = [
        operation.copy(), operation.copy(), operation.copy(), operation.copy(), operation.copy(), operation.copy()
    ] // incredible
    switch (initial_rotation) { // using SRS+ kickset here
        case 'spawn':  // 0->2
                              result[1].y += 1;
            result[2].x += 1; result[2].y += 1;
            result[3].x -= 1; result[3].y += 1;
            result[4].x += 1;
            result[5].x -= 1;
            break;
        case 'left':  // L->R  
            result[1].x -= 1;
            result[2].x -= 1; result[2].y += 2;
            result[3].x -= 1; result[3].y += 1;
                              result[4].y += 2;
                              result[5].y += 1;
            break;
        case 'reverse':  // 2->0
                              result[1].y -= 1;
            result[2].x -= 1; result[2].y -= 1;
            result[3].x += 1; result[3].y -= 1;
            result[4].x -= 1;
            result[5].x += 1;
            break;
        case 'right':  // R->L
            result[1].x += 1;
            result[2].x += 1; result[2].y += 2;
            result[3].x += 1; result[3].y += 1;
                              result[4].y += 2;
                              result[5].y += 1;
            break;
    }
    return result;
}

function unobstructed(field, rotation) {
    positions = rotation.positions();
    for (position of positions) {
        if (position.y < 0 || position.x < 0 || position.x > 9) return false;
        if (field.at(position.x, position.y) != "_") return false;
    }
    return true;
}

function t_spin_checker(op, field) { // returns -1 if not t spin; otherwise, returns the kick index (0-4) of the last spin used
	// console.log(page.field.str());
	// console.log("operation:", page.operation);
	// console.log(page.field.canLock(page.operation));

	if (op.type != 'T') return -1;

    cw = spin_cw(op.copy());
    ccw = spin_ccw(op.copy());
    r180 = spin_180(op.copy());

    if (unobstructed(field, cw)) return 0;
    if (unobstructed(field, ccw)) return 0;
    if (unobstructed(field, r180)) return 0;

    cw_kicks = get_cw_kicks(cw, op.rotation);
    ccw_kicks = get_ccw_kicks(ccw, op.rotation);
    r180_kicks = get_180_kicks(r180, op.rotation);

    for (kick of cw_kicks) {
        if (unobstructed(field, kick)) { // try and reverse it
            let temp = spin_ccw(kick.copy());
            let temp_kicks = get_ccw_kicks(temp, kick.rotation);
            for (i = 1; i < 5; i++) {
                temp_kick = temp_kicks[i];
                if (unobstructed(field, temp_kick)) {
                    // console.log(i, kick, temp_kick);
                    if (temp_kick.x == op.x && temp_kick.y == op.y) return i;
                    return -1; // only first working kick
                    
                }
            }
            return -1; // only first working kick
        }
    }
    for (kick of ccw_kicks) {
        if (unobstructed(field, kick)) { // try and reverse it
            let temp = spin_cw(kick.copy());
            let temp_kicks = get_cw_kicks(temp, kick.rotation);
            for (i = 1; i < 5; i++) {
                temp_kick = temp_kicks[i];
                if (unobstructed(field, temp_kick)) {
                    // console.log(i, kick, temp_kick);
                    if (temp_kick.x == op.x && temp_kick.y == op.y) return i;
                    return -1; // only first working kick
                }
            }
            return -1; // only first working kick
        }
    }

    for (kick of r180_kicks) {
        if (unobstructed(field, kick)) { // try and reverse it
            let temp = spin_180(kick.copy());
            let temp_kicks = get_180_kicks(temp, kick.rotation);
            for (i = 1; i < 6; i++) {
                temp_kick = temp_kicks[i];
                if (unobstructed(field, temp_kick)) {
                    // console.log(i, kick, temp_kick);
                    if (temp_kick.x == op.x && temp_kick.y == op.y) return i;
                    return -1; // only first working kick
                }
            }
            return -1; // only first working kick
        }
    }

    return -1;
}

function get_score(
	queue,
	solution_pages,
	base_b2b = true,
	base_combo = 1,
    b2b_end_bonus = 0,
    cumulative_rowsCleared = undefined,
	base_field = undefined,
	base_viz = undefined,
	base_rowsCleared = undefined
) {
	// compute line clear orders in the source solution pages
    if (cumulative_rowsCleared == undefined) cumulative_rowsCleared = get_cumulative_rows_cleared(solution_pages);

	if (base_field == undefined) base_field = solution_pages[0].field.copy();

	if (base_viz == undefined) {
		var base_viz = []; // vizualizer fumen for debugging purposes
		base_viz.push(toPage(base_field, 0));
	}

	if (base_rowsCleared == undefined) base_rowsCleared = [];

	// let score = 0;
	let results = [];

	let piece = queue[0];
	for (let page of solution_pages) {
		let op = page.operation.copy();
		// assuming the queue matches the pieces in the solution and there's exactly one of each piece, no error handling here :sunglasses:
		if (piece == op.type) {
			global_y = clearedOffset(cumulative_rowsCleared[page.index], op.y);
			op.y = global_y - inverse_clearedOffset(base_rowsCleared, global_y);

            if (base_field.canLock(op)) {
                let field = base_field.copy();
				let score = 0;
				let b2b = base_b2b;
                let combo = base_combo;
                let viz = [...base_viz]; // this might need to be a deep copy not sure
                let rowsCleared = [...base_rowsCleared]; // shallow copy should work here because numbers are primitive
				field.put(op);

				viz.push(toPage(field, viz.length));

				let positions = op.positions();

				// check for line clears
				let y_positions = new Set();
				for (position of positions) {
					y_positions.add(position.y);
				}
				temp_rowsCleared = new Set();
				for (let y of y_positions) {
					let line_cleared = true;
					for (let x = 0; x < 10; x++) {
						if (field.at(x, y) == '_') line_cleared = false;
					}
					if (line_cleared) temp_rowsCleared.add(clearedOffset(rowsCleared, y));
				}
				for (let row of temp_rowsCleared) rowsCleared.push(row);
				rowsCleared.sort();
				let lines_cleared = temp_rowsCleared.size;

				// console.log(lines_cleared);
				let tspin = false;
				let mini = true;
				if (op.type == 'T') {
					let four_corners = [
						[op.x - 1, op.y + 1], // northwest
						[op.x + 1, op.y + 1], // northeast
						[op.x + 1, op.y - 1], // southeast
						[op.x - 1, op.y - 1], // southwest
					];
					let num_corners = 0;
					for (let corner of four_corners) {
						if (occupiedCorner(field, corner)) num_corners++;
					}
                    if (num_corners >= 3) {
                        kick_index = t_spin_checker(op, base_field);
                        // if (kick_index == -1) { // debugging purposes only - there are legitimate non tspins!
                        //     console.log(field.str());
                        //     console.log(encoder.encode(viz))
                        //     throw "non tspin detected";
                        // }
                        if (kick_index != -1) {
                            tspin = true;
                            if (kick_index == 4) mini = false; // cringe SRS exception for upgrading fins
                            else {
                                let two_corners;
                                switch (op.rotation) {
                                    case 'spawn':
                                        two_corners = [four_corners[0], four_corners[1]];
                                        break;
                                    case 'right':
                                        two_corners = [four_corners[1], four_corners[2]];
                                        break;
                                    case 'reverse':
                                        two_corners = [four_corners[2], four_corners[3]];
                                        break;
                                    case 'left':
                                        two_corners = [four_corners[3], four_corners[0]];
                                        break;
                                }
                                let num_corners = 0;
                                for (let corner of two_corners) {
                                    if (occupiedCorner(field, corner)) num_corners++;
                                }
                                if (num_corners == 2) mini = false;
                            }
                        }
					}
				}

				if (tspin) {
					if (mini) {
						switch (lines_cleared) {
							case 0:
								// console.log('t spin mini 0:', 100);
								score += 100;
								break;
							case 1:
								if (b2b) {
									// console.log('b2b t spin mini single:', 300);
									score += 300;
								} else {
									// console.log('t spin mini single:', 200);
									score += 200;
								}
								break;
							case 2:
								if (b2b) {
									// console.log('b2b t spin mini double:', 600); // ultra counts these as normal tsds tho... change to 1800?
									score += 600;
								} else {
									// console.log('t spin mini double:', 400); // ultra counts these as normal tsds tho... change to 1200?
									score += 400;
								}
								break;
							default:
								throw 'bruh something went wrong';
						}
					} else {
						switch (lines_cleared) {
							case 0:
								// console.log('t spin 0:', 400);
								score += 400;
								break;
							case 1:
								if (b2b) {
									// console.log('b2b t spin single:', 1200);
									score += 1200;
								} else {
									// console.log('t spin single:', 800);
									score += 800;
								}
								break;
							case 2:
								if (b2b) {
									// console.log('b2b t spin double:', 1800);
									score += 1800;
								} else {
									// console.log('t spin double:', 1200);
									score += 1200;
								}
								break;
							case 3:
								if (b2b) {
									// console.log('b2b t spin triple:', 2400);
									score += 2400;
								} else {
									// console.log('t spin triple:', 1600);
									score += 1600;
								}
								break;
							default:
								throw 'bruh something went wrong';
						}
					}
					if (lines_cleared > 0) b2b = true;
				} else {
					switch (lines_cleared) {
						case 0:
							// break the combo
							break;
						case 1:
							// console.log('single:', 100);
							score += 100;
							break;
						case 2:
							// console.log('double:', 300);
							score += 300;
							break;
						case 3:
							// console.log('triple:', 500);
							score += 500;
							break;
						case 4:
							if (b2b) {
								// console.log('b2b quad:', 1200);
								score += 1200;
							} else {
								// console.log('quad:', 800);
								score += 800;
							}
							b2b = true;
							break;
						default:
							throw 'bruh something went wrong';
					}
				}

				if (!tspin && lines_cleared > 0 && lines_cleared < 4) b2b = false;

				if (lines_cleared == 0) combo = 0;
				else {
					if (combo > 0) {
						// console.log('combo', combo, ':', 50 * combo);
						score += 50 * combo;
					}
					combo++;
				}

				field.clearLine();

				// check if board is cleared
				let pc = true;
				for (let x = 0; x < 10; x++) {
					if (field.at(x, 0) != '_') pc = false; // just gonna check the bottom row
				}
				if (pc) {
					// console.log('PC:', 3000);
					// score += 3000;
					if (b2b) score += b2b_end_bonus;
					// return score;
				}

				if (queue.length <= 1 && !pc) score = -3000; // last piece but no PC, this path was a failure

				if (queue.length <= 1 || pc) results.push(score);  // end of queue is base case for recursive function
				else
					results.push( // otherwise, recursively call score function to get max score on the rest of the queue
						score +
							get_score(
								queue.substring(1),
								solution_pages,
								b2b,
								combo,
                                b2b_end_bonus,
                                cumulative_rowsCleared,
								field,
								viz,
								rowsCleared
							)
					);

				// console.log(encoder.encode(viz));
			} else {
				// throwing an error for debugging purposes, but may want to remove this if working on non *p7 solution queues with dupes
				// console.log(queue, encoder.encode(solution_pages));
				// console.log(encoder.encode(base_viz));
				// console.log(base_field.str(), op, global_y, rowsCleared);
				throw "solution path fail; does solution queue have dupes?";
				// return 0; // piece could not lock, solution and queue were incompatible
			}
		}
    }
    
    if (results.length == 0) { // no piece placement applied to this piece, this path is a failure
        // return -3000; // may want to just return -30000 if working with non *p7 solution queues with dupes
        // console.log(queue, encoder.encode(base_viz));
        // console.log(base_field.str())
        throw "solution path fail; does solution queues have dupes?";
    }
    return Math.max(...results);
}

// let memoize = {};

// function loadCSV(filename) {
// 	var fs = require('fs');
// 	var csv = fs.readFileSync(filename, 'utf8');
// 	var lines = csv.split(/\s+/); // this is regex for any whitespace /r /n /t /f /v
// 	var data = {};
// 	for (let line of lines) {
// 		let temp = line.split(',');
// 		data[temp[0]] = temp.slice(1);
// 	}
// 	return data;
// }

// let data = loadCSV('output/cover.csv');
// let data_nohold = loadCSV('output/cover_nohold.csv');

// let solutions = [];
// let solutions_cumulative_rows_cleared = [];

// for (let index = 0; index < data['sequence'].length; index++) {
// 	// load the objects of all the decoded fumens
//     solutions.push(decoder.decode(data['sequence'][index]));
//     solutions_cumulative_rows_cleared.push(get_cumulative_rows_cleared(solutions[index]));
// }

// let all_scores = [];

// for (let queue in data) {
// 	if (queue != 'sequence' && queue != '') {
// 		// console.log(queue);

// 		let hold_reorderings = hold_reorders(queue);

// 		let max_score = -3000;
// 		let max_queue = '';
// 		let max_sol_index = 0;
// 		for (let j = 0; j < data[queue].length; j++) {
// 			if (data[queue][j] == 'O') {
//                 let pages = solutions[j];
//                 let cumulative_rowsCleared = solutions_cumulative_rows_cleared[j];
// 				for (queue_2 of hold_reorderings) {
// 					// search this queue + hold in the nohold cover data
//                     if (!(queue_2 in data_nohold)) throw queue_2 + " not in nohold cover data"; // nohold cover data not fully generated?
// 					valid = (queue_2 in data_nohold) && data_nohold[queue_2][j] == 'O';
// 					if (valid) {
// 						let property = queue_2 + j;
// 						if (property in memoize) {
// 							// we've already computed the score for [this queue + this solution]!
// 							let temp = memoize[property];
// 							if (temp > max_score) {
// 								max_score = temp;
// 								max_queue = queue_2;
// 								max_sol_index = j;
// 							}
// 						} else {
// 							// compute it
// 							// queue, solution pages, initial b2b, initial combo, b2b end bonus
// 							let temp = get_score(queue_2, pages, true, 1, 0, cumulative_rowsCleared);
// 							memoize[property] = temp;
// 							if (temp > max_score) {
// 								max_score = temp;
// 								max_queue = queue_2;
// 								max_sol_index = j;
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 		if (max_score == -3000) {
// 			// change this if you know you're working with non 100% setups with fail queues
// 			// console.log(queue, data[queue]);
// 			throw 'PC fail queue ' + queue;
// 		}
// 		console.log(max_score, max_queue, data["sequence"][max_sol_index]);
// 		all_scores.push(max_score);
// 	}
// }
// console.log(all_scores.length);
// console.log(all_scores.reduce((a, b) => a + b) / all_scores.length);
// // console.log(Object.keys(memoize).length);

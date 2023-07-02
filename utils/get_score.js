// v1.9

const GAMES = { JSTRIS: {}, TETRIO: {}, GUIDELINE: {} };
const GAME = GAMES.TETRIO;

let score_table_normal    = [   0,  100,  300,  500,  800];
let score_table_spin      = [ 400,  800, 1200, 1600];
let score_table_spin_mini = [ 100,  200,  400];
let score_table_pc        = [ NaN,  800, 1200, 1800,  NaN]; // only used for guideline

// function toPage(in_field, i) {
// 	// for debugging purposes
// 	let field = in_field.copy();
// 	let flags = {
// 		rise: false,
// 		mirror: false,
// 		colorize: true,
// 		comment: '',
// 		lock: true,
// 		piece: undefined,
// 	};
// 	let page = {
// 		comment: '',
// 		field,
// 		flags: flags,
// 		index: i,
// 	};
// 	return page;
// }

function score_object_string(score_object) {
    let result = score_object.score.toString();
    for (extra of [...score_object.extra].reverse()) {
        // {"lines_cleared":2,"tspin":true,"mini":false,"b2b":true}
        // result += JSON.stringify(extra);
        let temp = " - ";
        if (extra.b2b) temp += "B2B "
        if (extra.tspin) {
            temp += "TS";
            if (extra.mini) temp += "M";
            temp += "0SDT"[extra.lines_cleared];
        }
        if (extra.lines_cleared == 4) temp += "quad";

        result += temp;

    }

    return result;
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
	let offset = 0;
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
	let old_rotation = operation.rotation;
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
	let old_rotation = operation.rotation;
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
	let old_rotation = operation.rotation;
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
	let result = Array(5).fill().map(_ => operation.copy());
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
	let result = Array(5).fill().map(_ => operation.copy());
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
	let result;
	switch (GAME) {
		case GAMES.TETRIO:
			result = Array(6).fill().map(_ => operation.copy());
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
		case GAMES.JSTRIS:
			result = Array(2).fill().map(_ => operation.copy());
			switch (initial_rotation) { // using SRS+ kickset here
				case 'spawn':  // 0->2
					result[1].y += 1;
					break;
				case 'left':  // L->R
					result[1].x -= 1;
					break;
				case 'reverse':  // 2->0
					result[1].y -= 1;
					break;
				case 'right':  // R->L
					result[1].x += 1;
					break;
			}
			return result;
		case GAMES.GUIDELINE: // guideline has no 180; this should not be reachable
			throw 'guideline has no 180';
	}
}

// function unobstructed(field, rotation) {
// 	let positions = rotation.positions();
// 	for (let position of positions) {
// 		if (position.y < 0 || position.x < 0 || position.x > 9) return false;
// 		if (field.at(position.x, position.y) != "_") return false;
// 	}
// 	return true;
// }

function t_spin_checker(op, field) { // returns -1 if not t spin; otherwise, returns the kick index (0-4) of the last spin used
	// console.log(page.field.str());
	// console.log("operation:", page.operation);
	// console.log(page.field.canLock(page.operation));

	if (op.type != 'T') return -1;

	let cw = spin_cw(op.copy());
	let ccw = spin_ccw(op.copy());

	if (field.canFill(cw)) return 0;
	//if (field.canFill(ccw)) return 0;
	//if (field.canFill(r180)) return 0;
	// if any kickless rotation is unobstructed, the other two will also be

	let cw_kicks = get_cw_kicks(cw, op.rotation);
	let ccw_kicks = get_ccw_kicks(ccw, op.rotation);

	for (let kick of cw_kicks) {
		if (field.canFill(kick)) { // try and reverse it
			let temp = spin_ccw(kick.copy());
			let temp_kicks = get_ccw_kicks(temp, kick.rotation);
			for (let i = 1; i < 5; i++) {
				temp_kick = temp_kicks[i];
				if (field.canFill(temp_kick)) {
					// console.log(i, kick, temp_kick);
					if (temp_kick.x == op.x && temp_kick.y == op.y) return i;
					return -1; // only first working kick

				}
			}
			return -1; // only first working kick
		}
	}
	for (let kick of ccw_kicks) {
		if (field.canFill(kick)) { // try and reverse it
			let temp = spin_cw(kick.copy());
			let temp_kicks = get_cw_kicks(temp, kick.rotation);
			for (let i = 1; i < 5; i++) {
				temp_kick = temp_kicks[i];
				if (field.canFill(temp_kick)) {
					// console.log(i, kick, temp_kick);
					if (temp_kick.x == op.x && temp_kick.y == op.y) return i;
					return -1; // only first working kick
				}
			}
			return -1; // only first working kick
		}
	}

	// XXX probably wrong on e.g. v115@zgB8HeA8IeA8AeI8BeH8CeF8JetJJ and the mirror

	if (GAME === GAMES.TETRIO) {
		// not possible to get 180 t-spins on Jstris or guideline
		let r180 = spin_180(op.copy());
		let r180_kicks = get_180_kicks(r180, op.rotation);

		for (let kick of r180_kicks) {
			if (field.canFill(kick)) { // try and reverse it
				let temp = spin_180(kick.copy());
				let temp_kicks = get_180_kicks(temp, kick.rotation);
				for (let i = 1; i < temp_kicks.length; i++) {
					temp_kick = temp_kicks[i];
					if (field.canFill(temp_kick)) {
						// console.log(i, kick, temp_kick);
						if (temp_kick.x == op.x && temp_kick.y == op.y) return i;
						return -1; // only first working kick
					}
				}
				return -1; // only first working kick
			}
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
	base_rowsCleared = undefined,
) {
	// compute line clear orders in the source solution pages
	if (cumulative_rowsCleared === undefined) cumulative_rowsCleared = get_cumulative_rows_cleared(solution_pages);

	if (base_field === undefined) base_field = solution_pages[0].field.copy();

	if (base_viz === undefined) {
		var base_viz = []; // vizualizer fumen for debugging purposes
		base_viz.push({field: base_field});
	}

	if (base_rowsCleared === undefined) base_rowsCleared = [];

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

				viz.push({ operation: op });

				let positions = op.positions();

				// check for line clears
				let y_positions = new Set();
				for (let position of positions) {
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
							if (kick_index == 4 && GAME !== GAMES.JSTRIS) mini = false; // cringe SRS exception for upgrading fins
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
				if (tspin && GAME === GAMES.JSTRIS && lines_cleared >= 2) {mini = false;}

				let activate_b2b = (tspin && lines_cleared > 0) || lines_cleared >= 4;
				let multiplier = (b2b && activate_b2b) ? 1.5 : 1;
				if (tspin) {
					if (mini) {
						score += score_table_spin_mini[lines_cleared] * multiplier;
					} else {
						score += score_table_spin[lines_cleared] * multiplier;
					}
				} else {
					score += score_table_normal[lines_cleared] * multiplier;
				}

				let noteworthy = (tspin && (!mini || (lines_cleared > 0 && b2b))) || lines_cleared >= 4;
				let score_event = {lines_cleared, tspin, mini, b2b: !!lines_cleared && b2b};
				/*
				any full t-spin:         yes
				any mini t-spin w/o b2b: no
				any mini t-spin w/ b2b:  yes (mini nulls not included here)
				quad:                    yes
				*/

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
					switch (GAME) {
						case GAMES.TETRIO:
							score += 3500;
							break;
						case GAMES.JSTRIS:
							score += 3000;
							break;
						case GAMES.GUIDELINE:
							if (lines_cleared <= 3) {score += score_table_pc[lines_cleared];}
							else if (lines_cleared === 4) {score += b2b ? 3200 : 2000;}
							break;
					}
					// return score;
				}

				if (activate_b2b) {b2b = true;}
				else if (lines_cleared > 0) {b2b = false;}

				if (queue.length <= 1 || pc) {
					if (b2b) {score += b2b_end_bonus;}
					results.push({score: score, extra: noteworthy ? [score_event] : [], pcs: +pc, pc_end: pc, b2b_end: b2b, solution: encoder.encode(viz)});
					// end of queue is base case for recursive function
				} else {
					let score_obj = get_score(
							queue.substring(1),
							solution_pages,
							b2b,
							combo,
							b2b_end_bonus,
							cumulative_rowsCleared,
							field,
							viz,
							rowsCleared
						);
					// otherwise, recursively call score function to get max score on the rest of the queue
					score_obj.score += score;
					if (noteworthy) {score_obj.extra.push(score_event);}
					score_obj.pcs += pc;
					results.push(score_obj);
				}

				// console.log(encoder.encode(viz));
			} else {
				// throwing an error for debugging purposes, but may want to remove this if working on non *p7 solution queues with dupes
				// console.log(queue, encoder.encode(solution_pages));
				// console.log(encoder.encode(viz));
				// console.log(field.str(), op, global_y, rowsCleared);
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
	return results.reduce((so0, so1) => pick_better_score(so0, so1));
}

function pick_better_score(so0, so1) {
	if (!so0) {return so1;}
	if (!so1) {return so0;}
	if (so1.score > so0.score) {return so1;}
	if (so0.score > so1.score) {return so0;}
	if (so0.pc_end && !so1.pc_end) {return so0;}
	if (so1.pc_end && !so0.pc_end) {return so1;}
	if (so0.b2b_end && !so1.b2b_end) {return so0;}
	if (so1.b2b_end && !so0.b2b_end) {return so1;}
	if (so0.extra.filter(event => event.tspin).length < so1.extra.filter(event => event.tspin).length) {return so0;}
	return so1;
}


function loadCSV(filename) {
	let csv = fs.readFileSync(filename, 'utf8');
	let lines = csv.split(/\s+/); // this is regex for any whitespace /r /n /t /f /v
	let data = {};
	for (let line of lines) {
		let temp = line.split(',');
		data[temp[0]] = temp.slice(1);
	}
	return data;
}

function loadPathCSV(filename) {
	let csv = fs.readFileSync(filename, 'utf8');
	let rows = csv.trim().split(/\s+/).slice(1).map(s => s.split(','));
	let queues_set = new Set;
	let solutions_map = new Map;
	for (let row of rows) {
		let queue = row[0];
		queues_set.add(queue);
		if (row[4] === '') {continue;}
		let solutions = row[4].split(';');
		for (let solution of solutions) {
			if (!solutions_map.has(solution)) {
				solutions_map.set(solution, new Set([queue]));
			} else {
				solutions_map.get(solution).add(queue);
			}
		}
	}
	let solutions_list = [...solutions_map.keys()];
	let data = {sequence: solutions_list};
	for (let queue of queues_set) {
		data[queue] = solutions_list.map(solution => solutions_map.get(solution).has(queue) ? 'O' : 'X');
	}
	return data;
}
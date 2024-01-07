const { decoder, encoder } = require('tetris-fumen');

data = [[], []];
data_nohold = [undefined, undefined];
setup = ['v115@vhAAgH', 'v115@vhAAgH'];
files = [
	['O.csv', 'S.csv', 'Z.csv', 'I.csv', 'T.csv', 'L.csv', 'L-combined.csv', 'J.csv'], // setup
];
DPC_files = {
    O:
    ['O-001.csv', 'O-002.csv', 'O-003.csv', 'O-004.csv', 'O-005.csv', 'O-006.csv', 'O-007.csv', 'O-008.csv', 'O-009.csv', 'O-010.csv', 'O-011.csv', 'O-012.csv', 'O-013.csv', 'O-014.csv', 'O-015.csv', 'O-016.csv', 'O-017.csv', 'O-018.csv', 'O-019.csv', 'O-020.csv', 'O-021.csv', 'O-022.csv', 'O-023.csv', 'O-024.csv', 'O-025.csv', 'O-026.csv', 'O-027.csv', 'O-028.csv', 'O-029.csv', 'O-030.csv', 'O-031.csv', 'O-032.csv', 'O-033.csv', 'O-034.csv', 'O-035.csv', 'O-036.csv', 'O-037.csv', 'O-038.csv', 'O-039.csv', 'O-040.csv', 'O-041.csv', 'O-042.csv', 'O-043.csv', 'O-044.csv', 'O-045.csv', 'O-046.csv', 'O-047.csv', 'O-048.csv', 'O-049.csv', 'O-050.csv', 'O-051.csv', 'O-052.csv', 'O-053.csv', 'O-054.csv', 'O-055.csv', 'O-056.csv', 'O-057.csv', 'O-058.csv', 'O-059.csv', 'O-060.csv', 'O-061.csv', 'O-062.csv', 'O-063.csv', 'O-064.csv', 'O-065.csv', 'O-066.csv', 'O-067.csv', 'O-068.csv', 'O-069.csv', 'O-070.csv', 'O-071.csv', 'O-072.csv', 'O-073.csv', 'O-074.csv', 'O-075.csv', 'O-076.csv', 'O-077.csv', 'O-078.csv', 'O-079.csv', 'O-080.csv', 'O-081.csv', 'O-082.csv', 'O-083.csv', 'O-084.csv', 'O-085.csv', 'O-086.csv', 'O-087.csv', 'O-088.csv', 'O-089.csv', 'O-090.csv', 'O-091.csv', 'O-092.csv', 'O-093.csv', 'O-094.csv', 'O-095.csv', 'O-096.csv', 'O-097.csv', 'O-098.csv', 'O-099.csv', 'O-100.csv', 'O-101.csv', 'O-102.csv', 'O-103.csv', 'O-104.csv', 'O-105.csv', 'O-106.csv', 'O-107.csv', 'O-108.csv', 'O-109.csv', 'O-110.csv', 'O-111.csv', 'O-112.csv', 'O-113.csv', 'O-114.csv', 'O-115.csv', 'O-116.csv', 'O-117.csv', 'O-118.csv', 'O-119.csv', 'O-120.csv', 'O-121.csv', 'O-122.csv', 'O-123.csv', 'O-124.csv', 'O-125.csv', 'O-126.csv', 'O-127.csv', 'O-128.csv', 'O-129.csv', 'O-130.csv', 'O-131.csv', 'O-132.csv', 'O-133.csv', 'O-134.csv', 'O-135.csv', 'O-136.csv', 'O-137.csv', 'O-138.csv', 'O-139.csv', 'O-140.csv'],
    S: ['S-001.csv', 'S-002.csv', 'S-003.csv', 'S-004.csv', 'S-005.csv', 'S-006.csv', 'S-007.csv', 'S-008.csv', 'S-009.csv', 'S-010.csv', 'S-011.csv', 'S-012.csv', 'S-013.csv', 'S-014.csv', 'S-015.csv', 'S-016.csv', 'S-017.csv', 'S-018.csv', 'S-019.csv', 'S-020.csv', 'S-021.csv', 'S-022.csv', 'S-023.csv', 'S-024.csv', 'S-025.csv', 'S-026.csv', 'S-027.csv', 'S-028.csv', 'S-029.csv', 'S-030.csv', 'S-031.csv', 'S-032.csv', 'S-033.csv', 'S-034.csv', 'S-035.csv', 'S-036.csv', 'S-037.csv', 'S-038.csv', 'S-039.csv', 'S-040.csv', 'S-041.csv', 'S-042.csv', 'S-043.csv', 'S-044.csv', 'S-045.csv', 'S-046.csv', 'S-047.csv', 'S-048.csv', 'S-049.csv', 'S-050.csv', 'S-051.csv', 'S-052.csv', 'S-053.csv', 'S-054.csv', 'S-055.csv', 'S-056.csv', 'S-057.csv', 'S-058.csv', 'S-059.csv', 'S-060.csv', 'S-061.csv', 'S-062.csv', 'S-063.csv', 'S-064.csv', 'S-065.csv', 'S-066.csv', 'S-067.csv', 'S-068.csv', 'S-069.csv', 'S-070.csv', 'S-071.csv', 'S-072.csv', 'S-073.csv', 'S-074.csv', 'S-075.csv', 'S-076.csv', 'S-077.csv', 'S-078.csv', 'S-079.csv', 'S-080.csv', 'S-081.csv', 'S-082.csv', 'S-083.csv', 'S-084.csv', 'S-085.csv', 'S-086.csv', 'S-087.csv', 'S-088.csv', 'S-089.csv', 'S-090.csv', 'S-091.csv', 'S-092.csv', 'S-093.csv', 'S-094.csv', 'S-095.csv', 'S-096.csv', 'S-097.csv', 'S-098.csv', 'S-099.csv', 'S-100.csv', 'S-101.csv', 'S-102.csv', 'S-103.csv', 'S-104.csv', 'S-105.csv', 'S-106.csv', 'S-107.csv', 'S-108.csv', 'S-109.csv', 'S-110.csv', 'S-111.csv', 'S-112.csv', 'S-113.csv', 'S-114.csv', 'S-115.csv', 'S-116.csv', 'S-117.csv', 'S-118.csv', 'S-119.csv', 'S-120.csv', 'S-121.csv', 'S-122.csv', 'S-123.csv', 'S-124.csv', 'S-125.csv', 'S-126.csv', 'S-127.csv', 'S-128.csv', 'S-129.csv', 'S-130.csv', 'S-131.csv', 'S-132.csv', 'S-133.csv', 'S-134.csv', 'S-135.csv', 'S-136.csv', 'S-137.csv', 'S-138.csv', 'S-139.csv', 'S-140.csv', 'S-141.csv', 'S-142.csv', 'S-143.csv', 'S-144.csv', 'S-145.csv', 'S-146.csv', 'S-147.csv', 'S-148.csv', 'S-149.csv', 'S-150.csv', 'S-151.csv', 'S-152.csv', 'S-153.csv', 'S-154.csv', 'S-155.csv', 'S-156.csv', 'S-157.csv', 'S-158.csv', 'S-159.csv', 'S-160.csv', 'S-161.csv', 'S-162.csv', 'S-163.csv', 'S-164.csv', 'S-165.csv', 'S-166.csv', 'S-167.csv', 'S-168.csv', 'S-169.csv', 'S-170.csv'],
    Z: ['Z-001.csv', 'Z-002.csv', 'Z-003.csv', 'Z-004.csv', 'Z-005.csv', 'Z-006.csv', 'Z-007.csv', 'Z-008.csv', 'Z-009.csv', 'Z-010.csv', 'Z-011.csv', 'Z-012.csv', 'Z-013.csv', 'Z-014.csv', 'Z-015.csv', 'Z-016.csv', 'Z-017.csv', 'Z-018.csv', 'Z-019.csv', 'Z-020.csv', 'Z-021.csv', 'Z-022.csv', 'Z-023.csv', 'Z-024.csv', 'Z-025.csv', 'Z-026.csv', 'Z-027.csv', 'Z-028.csv', 'Z-029.csv', 'Z-030.csv', 'Z-031.csv', 'Z-032.csv', 'Z-033.csv', 'Z-034.csv', 'Z-035.csv', 'Z-036.csv', 'Z-037.csv', 'Z-038.csv', 'Z-039.csv', 'Z-040.csv', 'Z-041.csv', 'Z-042.csv', 'Z-043.csv', 'Z-044.csv', 'Z-045.csv', 'Z-046.csv', 'Z-047.csv', 'Z-048.csv', 'Z-049.csv', 'Z-050.csv', 'Z-051.csv', 'Z-052.csv', 'Z-053.csv', 'Z-054.csv', 'Z-055.csv', 'Z-056.csv', 'Z-057.csv', 'Z-058.csv', 'Z-059.csv', 'Z-060.csv', 'Z-061.csv', 'Z-062.csv', 'Z-063.csv', 'Z-064.csv', 'Z-065.csv', 'Z-066.csv', 'Z-067.csv', 'Z-068.csv', 'Z-069.csv', 'Z-070.csv', 'Z-071.csv', 'Z-072.csv', 'Z-073.csv', 'Z-074.csv', 'Z-075.csv', 'Z-076.csv', 'Z-077.csv', 'Z-078.csv', 'Z-079.csv', 'Z-080.csv', 'Z-081.csv', 'Z-082.csv', 'Z-083.csv', 'Z-084.csv', 'Z-085.csv', 'Z-086.csv', 'Z-087.csv', 'Z-088.csv', 'Z-089.csv', 'Z-090.csv', 'Z-091.csv', 'Z-092.csv', 'Z-093.csv', 'Z-094.csv', 'Z-095.csv', 'Z-096.csv', 'Z-097.csv', 'Z-098.csv', 'Z-099.csv', 'Z-100.csv', 'Z-101.csv', 'Z-102.csv', 'Z-103.csv', 'Z-104.csv', 'Z-105.csv', 'Z-106.csv', 'Z-107.csv', 'Z-108.csv', 'Z-109.csv', 'Z-110.csv', 'Z-111.csv', 'Z-112.csv', 'Z-113.csv', 'Z-114.csv', 'Z-115.csv', 'Z-116.csv', 'Z-117.csv', 'Z-118.csv', 'Z-119.csv', 'Z-120.csv', 'Z-121.csv', 'Z-122.csv', 'Z-123.csv', 'Z-124.csv', 'Z-125.csv', 'Z-126.csv', 'Z-127.csv', 'Z-128.csv', 'Z-129.csv', 'Z-130.csv', 'Z-131.csv', 'Z-132.csv', 'Z-133.csv', 'Z-134.csv', 'Z-135.csv', 'Z-136.csv', 'Z-137.csv', 'Z-138.csv', 'Z-139.csv', 'Z-140.csv', 'Z-141.csv', 'Z-142.csv', 'Z-143.csv', 'Z-144.csv', 'Z-145.csv', 'Z-146.csv', 'Z-147.csv', 'Z-148.csv', 'Z-149.csv', 'Z-150.csv', 'Z-151.csv', 'Z-152.csv', 'Z-153.csv', 'Z-154.csv', 'Z-155.csv', 'Z-156.csv', 'Z-157.csv', 'Z-158.csv', 'Z-159.csv', 'Z-160.csv', 'Z-161.csv', 'Z-162.csv', 'Z-163.csv', 'Z-164.csv', 'Z-165.csv', 'Z-166.csv', 'Z-167.csv', 'Z-168.csv', 'Z-169.csv', 'Z-170.csv'],
    I: ['I-001.csv', 'I-002.csv', 'I-003.csv', 'I-004.csv', 'I-005.csv', 'I-006.csv', 'I-007.csv', 'I-008.csv', 'I-009.csv', 'I-010.csv', 'I-011.csv', 'I-012.csv', 'I-013.csv', 'I-014.csv', 'I-015.csv', 'I-016.csv', 'I-017.csv', 'I-018.csv', 'I-019.csv', 'I-020.csv', 'I-021.csv', 'I-022.csv', 'I-023.csv', 'I-024.csv', 'I-025.csv', 'I-026.csv', 'I-027.csv', 'I-028.csv', 'I-029.csv', 'I-030.csv', 'I-031.csv', 'I-032.csv', 'I-033.csv', 'I-034.csv', 'I-035.csv', 'I-036.csv', 'I-037.csv', 'I-038.csv', 'I-039.csv', 'I-040.csv', 'I-041.csv', 'I-042.csv', 'I-043.csv', 'I-044.csv', 'I-045.csv', 'I-046.csv', 'I-047.csv', 'I-048.csv', 'I-049.csv', 'I-050.csv', 'I-051.csv', 'I-052.csv', 'I-053.csv', 'I-054.csv', 'I-055.csv', 'I-056.csv', 'I-057.csv', 'I-058.csv', 'I-059.csv', 'I-060.csv', 'I-061.csv', 'I-062.csv', 'I-063.csv', 'I-064.csv', 'I-065.csv', 'I-066.csv', 'I-067.csv', 'I-068.csv', 'I-069.csv', 'I-070.csv', 'I-071.csv', 'I-072.csv', 'I-073.csv', 'I-074.csv', 'I-075.csv', 'I-076.csv', 'I-077.csv', 'I-078.csv', 'I-079.csv', 'I-080.csv', 'I-081.csv', 'I-082.csv', 'I-083.csv', 'I-084.csv', 'I-085.csv', 'I-086.csv', 'I-087.csv', 'I-088.csv', 'I-089.csv', 'I-090.csv', 'I-091.csv', 'I-092.csv', 'I-093.csv', 'I-094.csv', 'I-095.csv', 'I-096.csv', 'I-097.csv', 'I-098.csv', 'I-099.csv', 'I-100.csv', 'I-101.csv', 'I-102.csv', 'I-103.csv', 'I-104.csv', 'I-105.csv', 'I-106.csv', 'I-107.csv', 'I-108.csv', 'I-109.csv', 'I-110.csv', 'I-111.csv', 'I-112.csv', 'I-113.csv', 'I-114.csv', 'I-115.csv', 'I-116.csv', 'I-117.csv', 'I-118.csv', 'I-119.csv', 'I-120.csv', 'I-121.csv', 'I-122.csv', 'I-123.csv', 'I-124.csv', 'I-125.csv', 'I-126.csv', 'I-127.csv', 'I-128.csv', 'I-129.csv', 'I-130.csv', 'I-131.csv', 'I-132.csv', 'I-133.csv', 'I-134.csv', 'I-135.csv', 'I-136.csv', 'I-137.csv', 'I-138.csv', 'I-139.csv', 'I-140.csv', 'I-141.csv', 'I-142.csv', 'I-143.csv', 'I-144.csv', 'I-145.csv', 'I-146.csv', 'I-147.csv', 'I-148.csv', 'I-149.csv', 'I-150.csv', 'I-151.csv', 'I-152.csv', 'I-153.csv', 'I-154.csv', 'I-155.csv', 'I-156.csv', 'I-157.csv', 'I-158.csv', 'I-159.csv', 'I-160.csv', 'I-161.csv', 'I-162.csv', 'I-163.csv', 'I-164.csv', 'I-165.csv', 'I-166.csv', 'I-167.csv', 'I-168.csv', 'I-169.csv', 'I-170.csv', 'I-171.csv', 'I-172.csv', 'I-173.csv', 'I-174.csv', 'I-175.csv', 'I-176.csv', 'I-177.csv', 'I-178.csv', 'I-179.csv', 'I-180.csv', 'I-181.csv', 'I-182.csv', 'I-183.csv', 'I-184.csv', 'I-185.csv', 'I-186.csv', 'I-187.csv', 'I-188.csv', 'I-189.csv', 'I-190.csv', 'I-191.csv', 'I-192.csv', 'I-193.csv', 'I-194.csv', 'I-195.csv', 'I-196.csv', 'I-197.csv', 'I-198.csv', 'I-199.csv', 'I-200.csv', 'I-201.csv', 'I-202.csv', 'I-203.csv', 'I-204.csv', 'I-205.csv', 'I-206.csv', 'I-207.csv', 'I-208.csv', 'I-209.csv', 'I-210.csv', 'I-211.csv', 'I-212.csv', 'I-213.csv', 'I-214.csv', 'I-215.csv', 'I-216.csv'],
    J: ['J-001.csv', 'J-002.csv', 'J-003.csv', 'J-004.csv', 'J-005.csv', 'J-006.csv', 'J-007.csv', 'J-008.csv', 'J-009.csv', 'J-010.csv', 'J-011.csv', 'J-012.csv', 'J-013.csv', 'J-014.csv', 'J-015.csv', 'J-016.csv', 'J-017.csv', 'J-018.csv', 'J-019.csv', 'J-020.csv', 'J-021.csv', 'J-022.csv', 'J-023.csv', 'J-024.csv', 'J-025.csv', 'J-026.csv', 'J-027.csv', 'J-028.csv', 'J-029.csv', 'J-030.csv', 'J-031.csv', 'J-032.csv', 'J-033.csv', 'J-034.csv', 'J-035.csv', 'J-036.csv', 'J-037.csv', 'J-038.csv', 'J-039.csv', 'J-040.csv', 'J-041.csv', 'J-042.csv', 'J-043.csv', 'J-044.csv', 'J-045.csv', 'J-046.csv', 'J-047.csv', 'J-048.csv', 'J-049.csv', 'J-050.csv', 'J-051.csv', 'J-052.csv', 'J-053.csv', 'J-054.csv', 'J-055.csv', 'J-056.csv', 'J-057.csv', 'J-058.csv', 'J-059.csv', 'J-060.csv', 'J-061.csv', 'J-062.csv', 'J-063.csv', 'J-064.csv', 'J-065.csv', 'J-066.csv', 'J-067.csv', 'J-068.csv', 'J-069.csv', 'J-070.csv', 'J-071.csv', 'J-072.csv', 'J-073.csv', 'J-074.csv', 'J-075.csv', 'J-076.csv', 'J-077.csv', 'J-078.csv', 'J-079.csv', 'J-080.csv', 'J-081.csv', 'J-082.csv', 'J-083.csv', 'J-084.csv', 'J-085.csv', 'J-086.csv'],
    L: ['L-001.csv', 'L-002.csv', 'L-003.csv', 'L-004.csv', 'L-005.csv', 'L-006.csv', 'L-007.csv', 'L-008.csv', 'L-009.csv', 'L-010.csv', 'L-011.csv', 'L-012.csv', 'L-013.csv', 'L-014.csv', 'L-015.csv', 'L-016.csv', 'L-017.csv', 'L-018.csv', 'L-019.csv', 'L-020.csv', 'L-021.csv', 'L-022.csv', 'L-023.csv', 'L-024.csv', 'L-025.csv', 'L-026.csv', 'L-027.csv', 'L-028.csv', 'L-029.csv', 'L-030.csv', 'L-031.csv', 'L-032.csv', 'L-033.csv', 'L-034.csv', 'L-035.csv', 'L-036.csv', 'L-037.csv', 'L-038.csv', 'L-039.csv', 'L-040.csv', 'L-041.csv', 'L-042.csv', 'L-043.csv', 'L-044.csv', 'L-045.csv', 'L-046.csv', 'L-047.csv', 'L-048.csv', 'L-049.csv', 'L-050.csv', 'L-051.csv', 'L-052.csv', 'L-053.csv', 'L-054.csv', 'L-055.csv', 'L-056.csv', 'L-057.csv', 'L-058.csv', 'L-059.csv', 'L-060.csv', 'L-061.csv', 'L-062.csv', 'L-063.csv', 'L-064.csv', 'L-065.csv', 'L-066.csv', 'L-067.csv', 'L-068.csv', 'L-069.csv', 'L-070.csv', 'L-071.csv', 'L-072.csv', 'L-073.csv', 'L-074.csv', 'L-075.csv', 'L-076.csv', 'L-077.csv', 'L-078.csv', 'L-079.csv', 'L-080.csv', 'L-081.csv', 'L-082.csv', 'L-083.csv', 'L-084.csv', 'L-085.csv', 'L-086.csv', 'L-s-01.csv', 'L-s-01M.csv', 'L-s-03.csv', 'L-s-04.csv', 'L-s-04M.csv', 'L-s-05.csv', 'L-s-07.csv', 'L-s-07M.csv', 'L-s-09.csv', 'L-s-11.csv', 'L-s-13.csv', 'L-s-15.csv', 'L-s-17.csv', 'L-s-18.csv', 'L-s-19.csv', 'L-s-21.csv', 'L-s-23.csv', 'L-s-24.csv', 'L-s-26.csv', 'L-s-28.csv', 'L-s-29.csv', 'L-s-31.csv', 'L-s-36.csv', 'L-s-44.csv', 'L-s-46.csv'],
    T: ['T-001.csv', 'T-002.csv', 'T-003.csv', 'T-004.csv', 'T-005.csv', 'T-006.csv', 'T-007.csv', 'T-008.csv', 'T-009.csv', 'T-010.csv', 'T-011.csv', 'T-012.csv', 'T-013.csv', 'T-014.csv', 'T-015.csv', 'T-016.csv', 'T-017.csv', 'T-018.csv', 'T-019.csv', 'T-020.csv', 'T-021.csv', 'T-022.csv', 'T-023.csv', 'T-024.csv', 'T-025.csv', 'T-026.csv', 'T-027.csv', 'T-028.csv', 'T-029.csv', 'T-030.csv', 'T-031.csv', 'T-032.csv', 'T-033.csv', 'T-034.csv', 'T-035.csv', 'T-036.csv', 'T-037.csv', 'T-038.csv', 'T-039.csv', 'T-040.csv', 'T-041.csv', 'T-042.csv', 'T-043.csv', 'T-044.csv', 'T-045.csv', 'T-046.csv', 'T-047.csv', 'T-048.csv', 'T-049.csv', 'T-050.csv', 'T-051.csv', 'T-052.csv', 'T-053.csv', 'T-054.csv', 'T-055.csv', 'T-056.csv', 'T-057.csv', 'T-058.csv', 'T-059.csv', 'T-060.csv', 'T-061.csv', 'T-062.csv', 'T-063.csv', 'T-064.csv', 'T-065.csv', 'T-066.csv', 'T-067.csv', 'T-068.csv', 'T-069.csv', 'T-070.csv', 'T-071.csv', 'T-072.csv', 'T-073.csv', 'T-074.csv', 'T-075.csv', 'T-076.csv', 'T-077.csv', 'T-078.csv', 'T-079.csv', 'T-080.csv', 'T-081.csv', 'T-082.csv', 'T-083.csv', 'T-084.csv', 'T-085.csv', 'T-086.csv', 'T-087.csv', 'T-088.csv', 'T-089.csv', 'T-090.csv', 'T-091.csv', 'T-092.csv', 'T-093.csv', 'T-094.csv', 'T-095.csv', 'T-096.csv', 'T-097.csv', 'T-098.csv', 'T-099.csv', 'T-100.csv', 'T-101.csv', 'T-102.csv', 'T-103.csv', 'T-104.csv', 'T-105.csv', 'T-106.csv', 'T-107.csv', 'T-108.csv', 'T-109.csv', 'T-110.csv', 'T-111.csv', 'T-112.csv', 'T-113.csv', 'T-114.csv', 'T-115.csv', 'T-116.csv', 'T-117.csv', 'T-118.csv', 'T-119.csv', 'T-120.csv', 'T-121.csv', 'T-122.csv', 'T-123.csv', 'T-124.csv', 'T-125.csv', 'T-126.csv', 'T-127.csv', 'T-128.csv', 'T-129.csv', 'T-130.csv', 'T-131.csv', 'T-132.csv', 'T-133.csv', 'T-134.csv']
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
	let url = '../cover_csvs/dpc_2/' + filename;
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
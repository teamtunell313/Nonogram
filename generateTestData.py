# Prepare constants
import json
import time

start_time = time.time()
row_length = 5
max_pattern = pow(2, row_length)

# Generate all possible actuals
hints = []
actuals = []
for actual in range(0, max_pattern):
    actuals.append(actual)    

# Generate hint strings
hints = {}
for actual in actuals:
    total_sequence = ''
    this_sequence = 0
    actual_string = format(actual, f'0{row_length}b')
    for i in range(0, row_length + 1):
        if actual & pow(2, i):
            this_sequence += 1
        else: 
            if this_sequence > 0:
                separator = '_' if len(total_sequence) > 0 else ''
                total_sequence = str(this_sequence) + separator + total_sequence
                this_sequence = 0
    total_sequence = ' ' if len(total_sequence) == 0 else total_sequence
    try:
        hints[total_sequence].append(actual)
    except:
        hints.setdefault(total_sequence, [actual])
# print(hints)    

# Generate problems
new_order = {}
for hint in hints:
    # print(f'hint: {hint}')
    new_actuals = []
    for actual in hints[hint]:
        # print(f'  actual: {actual}')
        # print('  actual: ', format(actual, f'0{row_length}b'))
        puzzle_set = []
        solution_set = []
        for reveal_mask in range(0, max_pattern-1):
            puzzle_string = ''
            for i in range(0, row_length):
                character = '_'
                if reveal_mask & pow(2, i):
                    character = '1' if actual & pow(2, i) else 'x'
                puzzle_string = character + puzzle_string
            puzzle_set.append(puzzle_string)
# Query User for solutions
            # solutn_string = input(f"hint:{hint} Solve {puzzle_string}:")
            solutn_string = '?'*row_length
            solution_set.append(solutn_string)
            # solution_set.append('?'*row_length)
            
        # print(f'    puzzle: {puzzle_set}')
        # print(f'    solutn: {solution_set}')
        try:
            new_actuals.append({'actual': actual, 'puzzles':puzzle_set, 'solutions': solution_set})
        except:
            new_actuals.setdefault([{'actual': actual, 'puzzles':puzzle_set, 'solutions': solution_set}])
    new_order[hint] = new_actuals
    # print("  ", new_actuals)
# print(new_order)

# Convert solutions to binary numbers

# Save in .json
json_object = json.dumps(new_order, indent = 4)
with open(f"testSet{row_length}.json", "w") as outfile:
    outfile.write(json_object)

print(f'finished {row_length} in {round(time.time()-start_time, 2)} seconds.')
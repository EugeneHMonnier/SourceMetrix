import subprocess, csv, glob, pandas, os

directory_list_filename = './directory_list.csv'
combined_csv_filename = 'combined.csv'

def metrixpp(filename):
    with open(filename, 'r') as f:
        reader = csv.reader(f)
        paths = {rows[0]:rows[1] for rows in reader}
        for path in paths.items():
            module = path[0]
            dir_path = path[1]
            bash_command = ('make multi SRCPATH=' + dir_path + ' MODULE_BASE=' + module)

            print(bash_command)
            process = subprocess.Popen(bash_command.split(), stdout=subprocess.PIPE)
            output, error = process.communicate()

def combine_csv(filename):
    os.chdir('./data')
    all_csv = [i for i in glob.glob('*.{}'.format('csv'))]
    combined_csv = pandas.concat([pandas.read_csv(f) for f in all_csv])
    combined_csv.to_csv(filename, index=False, encoding='utf-8-sig')


metrixpp(directory_list_filename)
combine_csv(combined_csv_filename)
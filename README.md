# Metrix2HTML  {#mainpage}
This is the aim to create a nicer looking frontend for the output of the tool [Metrix++](https://metrixplusplus.github.io/).

By running Metrix++ one can get a multitude of code metrics for a given C source code. Metrix by itself features a Textual User Interface to give output by iuse of the 'view' command. The basic idea was to turn this textua output into somewhat more visually appealing by making use of [chart.js](https://www.chartjs.org/).

The output of Metrix++ 'view' and 'export' commands is used to create statically (no runtime on a webserver) a set of html files. In current version this is controlled by a makefile (cf. planning section on future approach). 

The visual appearance (web page look) can be controlled by CSS styling plus settings in a file called 'diagram_style.js'. Both files are located in subfolder 'style' (if not configured otherwise in makefile).

## REQUIREMENTS
- Linux/WSL
- Python 2
- [MetrixPlusPlus Repository modified by EugeneHMonnier](https://github.com/EugeneHMonnier/metrixplusplus)

## HOW TO USE
Download/clone all files of this repository into a directory of your choice (referred to as /installation directory/). Also download/clone the repository of MetrixPlusPlus from EugeneHMonnier, containing modifications needed to use Maintainability Index extension with SourceMetrix, to your local machine. This version of SourceMetrix will not work with original version of MetrixPlusPlus. 

In the installation directory there's a makefile, which can be edited as a text file. You may have to adjust some path settings, i. e. paths where python and Metrix++ are installed to or the root folder of the sourcecode you want to analyse ('SRCPATH'). See the [section below](#makefile-values-to-modify) for which makefile values to modify.

After doing these configuration it is as simple as running 'make all' in the folder where the makefile is located. This shall generated a set of html files in the subfolder 'html' (by default) of your /installation directory/. Opening this in a browser with 'javascript enabled' shall give you full access on your code analysis features.

## MAKEFILE VALUES TO MODIFY
These are the variables that you will likely need to modify:
- `METRIXPP` (Absolute path to location of Metrix++)
- `MYEXT` (Absolute path to location of extensions for Metrix++)
- `SRCPATH` (Relative path from SourceMeterix to the directory to analyse)
- `MODULEBASE` (Folder in directory to analyse with Metrix++)
- `EXCLUDE` (List {space separtated} of files and folders contained in `MODULEBASE` to exclude from analysis)
  - _Important note: only works with folder/file names, not paths. If `MODULEBASE` contains multiple folders/files with the same name all folders/files with that name will be excluded. All sub-folders of an excluded folder will be excluded._ 

You may also need to modify the following if location is not default for your setup:
- `PYTHON` (Absolute path to location of python2)

## HOW IT WORKS
The central makefile runs Metrix++ in the background and creates an index.html and other html and javascript (*.js) files. The file 'index.html' serves as the starting point for the WUI (Web User Interface). It incorporates chart.js, the CSS file style.css and diagram_style.js. Where the CSS file can be used pretty forward to adopt visual appearance of the various html elements (cf. section on style.css for details), the diagram_style.js file gives reference to which analysis criteria are viewable and how according diagrams are styled.

## WHAT YOU GET
Central file is the makefile in the /installation directory/. By editing the makefile you can adjust most of the other file locations. By default directory layout is as follows:
<pre>
    /installation directory/
      +--makefile
      +--data
      |   +-- #generated .csv and .js files get here
      +--html
      |   +--index.html [generated]
      |   +-- #other generated html files
      +--javascript
      |    +--filelist.js
      +--style
          +--diagram_style.js
          +--style.css
</pre>

### STYLE.CSS
Use this CSS file to adapt styling of the analysis output (cf. section on diagram_style.js for additional settings). Besides settings for standard html elements (e. g. H1, P, etc.) the following settings are defined. 

#### .main
This defines the overall layout of index.html. The schematic layout is as depicted below:
<pre>
    +-.main-------------------------------------+
    |+-.navigation-----------------------------+|
    || MODULE_BASE                             ||
    ||  critera1 criteria2 ...                 ||
    |+-----------------------------------------+|
    |+-.filelist_wrapper-+ +-.wrapper----------+|
    || filelist  [sort]  | |    Distribution   ||
    || <filelist entry1> | |    [ diagram ]    ||
    || <filelist entry2> | +-------------------+|
    ||       ...         | +-.details_wrapper--+|
    || <filelist entryN> | | highlighted code  ||
    |+-------------------+ +-------------------+|
    +-------------------------------------------+
</pre>

#### .tooltip:hover span[role=tooltip]
This setting defines the actual visual appearance of the tooltip in the filelist. You may adjust settings like 'background', 'font-family', 'color' etc. Please do not try to adjust other styles referring to 'tooltip' until you surely know what you're doing, especially leave '.tooltip span[role=tooltip]' simply set to 'display: none'.

### INDEX.HTML
This file will be generated by running the central makefile - so do not edit. It conists of the following:
In the header it incorporates chart.js, the CSS file style.css and diagram_style.js. It defines the function 'switch_criteria(criteria)' which gets triggered when user selects a navigation element (see below). The result is not only switching the overview diagram, but also populating the filelist with new data.
It holds the navigation part consisting of the headline reading the module's name (cf. makefile settings) and a link for each criteria.
It splits up the WUI by /iframes/, one for the overview area and another one for the details area. The indexfile itself builds up the filelist by including 'filelist.js'.

### MAKEFILE
The makefile consists of a configuration part, defintion of some generic and some specific targets. The generic targets are standard targets like 'all' (which is first defined target and therefore default), 'clean' and other helpful targets like 'check' to check for prerequisits like installed and runnable Metrix++, or 'directories' to check for and create defined directories.

#### makefile settings
By editing the makefile in a text editor you may alter the following settings:
- METRIXPP        path pointing to Metrix++.py
- PYTHON          path pointing to Python interpreter
- CHARTMINJS      URL where to get chart.min.js from
- SRCPATH         path from where to start analysis of sourceceode
- MODULE_BASE     sourcecode is assumed to belong to a module (or application)
- REPORTDIR       directory to store generated html files to 
- DATADIR         directory to store intermediate files generated from data collected by Metrix++
- STYLEDIR        html styling and diagram styling settings get here
- INSTALLDIR      path where highlight.js is installed to
- HIGHLIGHT_CSS   stylesheet to use by highlight.js for sourcecode highlighting
- SCRIPTDIR       directory containing filelist.js and other non-generated javascript code
- CRITERIA_LIST   list of space separated code metrics arguments to passs to 'collect' function of Metrix++ 
- DIAGRAM_STYLE   name of javascript filename defining the diagrams colors and datasource
- CANVAS_WIDTH    width of each diagram created for the overview
- CANVAS_HEIGHT   height of each diagram created for the overview

# RELEASE LOG

## v.0.2.0 2020-06-18
- replaced the use of functions defined in makefile by use of Python scripts

## 2020-06-04
- sourccode view shows up with line numbers
- generation of the 'detailed data file' is done in python, no longer in the makefile

### PLANNING:
- in csv file the entries of region == global and type == file both refer to the complete file resulting in a duplicated sourcecode output; idea: subsume both to one entry or even ommit output of complete sourcecode and put info into a header section
- add output of the PC-Lint XLS-sheet to the cvs file; problematic = PC-Lint findings consist of different categories (Red, MISRA, Error, Warn, Info, Note, Sum) and it may happen taht Sum != Red != MISRA - how to visualize this?
- show historic data as fading color bars
- prepend filelist entries with a '+', such that in filelist a file can show detailed information, example
     + /./src/script/canalyse.py
       canalyse.py[305:328] function: generateHTMLfiles
  even such an entrie's background could be tinted according to the criteria value
- add other sources of metrics, like e. g. doxygen warning ouput
- add a freetext column 'tags' to put tags to files like e.g. '#autogenerated'

## 2020-05-25

### TODO:
- the csv export may have empty entries; currently values of a specific criteria are added for each line 
  of csv starting with the same filename, sum function may result in a 'NaN' for empty entries
- filelist header reads 'lines of code per file' regardless which criteria is selected
- generating the metrix.db file and refernce to it shall be moved to DATADIR

### PLANNING:
- the overview statistics are not based on the csv-export, but simply trying to beautify the ascii art 
  output of the 'view' command - and this is achieved by some curious 'head', 'tail' and 'sed' magic. As all data is present in the csv export one coudl easily generate the statistics data based on the exported csv
- split up GUI (webpage) into three parts with increasing granularity: overview statistics (upper part 
  right column), file list (left column) and detailed view (lower part right column). A click on an entry of filelist shall show up details (highlighted sourcecode snippets) in detailed view
- add anchor points to each entry of filelist, such that a click on the overview could highliht/jump to 
  the relevant file
- if no file is selected in filelist show top 10 of selected criteria i detailed view
- add defintion of limits for each criteria (red/green or red/yellow/green) and colorize diagram 
- add linenumbers to the display of sourcecode (e.g. https://www.guntherkrauss.de/computer/web/quelltext.html)
- add metrics of other sources e. g. log output of doxygen, cppcheck, etc.

### BUGS:
- error: value of 'index' in diagram_styles.js makes assumption that the order of the 'export' command 
  equals the order of the commands passed for the 'collect' run - this isn't true; idea: use python to create a map instead of a 2d-array in $(MODULE_BASE).js

function DiagramStyle(criteria, criteriaLabel, backgroundColor, borderColor, index)
{
    this.criteria = criteria;
    this.criteriaLabel = criteriaLabel;
    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
    this.index = index;
}

const DiagramStyles = new Map;

DiagramStyles.set('miext.maintainability.MIwoc',
    new DiagramStyle('miext.maintainability.MIwoc', 'MI w/o comments ', 'lightblue', 'blue', 11)
);

DiagramStyles.set('miext.halstead.H_Volume',
    new DiagramStyle('miext.halstead.H_Volume', 'halstead volume', 'lightblue', 'blue', 6)
);

DiagramStyles.set('std.code.complexity.cyclomatic',
    new DiagramStyle('std.code.complexity.cyclomatic', 'cyclomatic complexity', 'lightblue', 'blue', 12)
);

DiagramStyles.set('std.code.lines.comments',
    new DiagramStyle('std.code.lines.comments', 'lines of comment per file', 'lightblue', 'blue', 13)
);

DiagramStyles.set('std.code.lines.total',
    new DiagramStyle('std.code.lines.total', 'total lines per file', 'lightblue', 'blue', 14)
);

const del = require('del');
del.sync(['lib/**/dist']);
del.sync(['lib/**/*.log']);
del.sync(['lib/**/CHANGELOG.json', 'lib/**/CHANGELOG.md']);

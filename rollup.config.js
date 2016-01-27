var path = require('path');

var rollupCommonJS = require('rollup-plugin-commonjs');
var rollupNpm = require('rollup-plugin-npm');
var rollupTypescript = require('rollup-plugin-typescript');
var rollupUtils = require('rollup-pluginutils');



module.exports = {
    entry: 'src/hello.ts',
    plugins: [
        {
            // resolving 'angular2/*'
            // ignore everything that doesn't start with 'angular2/'
            // resolve the rest within the angular directory
            resolveId: function (id , importer ) {
                if ( !id.startsWith( 'angular2' )) return null;
                return path.join( 'node_modules/angular2/ts', id.slice( 'angular2'.length ) ) + '.ts';
            }
        },
        {
          // resolving 'rxjs/*' => this should be probably handed by npm plugin instead
          resolveId: function(id) {
              if ( !id.startsWith( 'rxjs' )) return null;
              return path.join( 'node_modules/rxjs', id.slice( 'rxjs'.length ) ) + '.js';
          }
        },
        {
            // adding default extension
            // why is it needed at all? => relative imports in angular2 and rxjs
            resolveId: function (id, importer) {
                //console.warn('Custom Id resolver', id, importer);
                if (path.extname(id) || id === 'typescript-helpers') return null; //already has an extension or not relative path

                var pathToReturn = importer ? path.join(path.dirname(importer), id) : id;
                pathToReturn = rollupUtils.addExtension(pathToReturn, importer.indexOf('rxjs') !== -1 ? '.js' : '.ts');

                return pathToReturn;
            }
        },
        rollupCommonJS({
        }),
        rollupTypescript({
            emitDecoratorMetadata: true,
            experimentalDecorators: true
        })
    ]
};
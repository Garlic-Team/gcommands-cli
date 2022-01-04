import NodeResolve from '@esbuild-plugins/node-resolve';
import { fileURLToPath } from 'url';
import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFiles = () => {
    let filesArray = [];

    const getFilesFromFolder = (path) => {
        const files = fs.readdirSync(path, { withFileTypes: true });
    
        for (const file of files) {
            if (file.isDirectory()) getFilesFromFolder(`${path}${file.name}/`)
            else {
                filesArray.push(`${path}${file.name}`)
            }
        }
    }
    
    getFilesFromFolder('./src/');
    
    return filesArray;
}

esbuild.build({
    entryPoints: getFiles(),
    bundle: true,
    format: 'esm',
    platform: 'node',
    minify: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    nodePaths: [],
    outdir: path.join(__dirname, '..', 'dist'),
    outExtension: { '.js': '.mjs' },
    plugins: [
        NodeResolve.default({
            extensions: ['.ts', '.js'],
            onResolved: (resolved) => {
                if (resolved.includes('node_modules')) {
                    return {
                        external: true,
                    }
                }
                return resolved
            },
        }),
    ]
})
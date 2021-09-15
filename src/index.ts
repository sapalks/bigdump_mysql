import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as fs from 'fs';
import * as eol from 'eol';
const log = require('single-line-log').stdout;

const dumpPath = './dump.sql';
const minChank = 30;
const minSize = minChank * 1024;

createConnection().then(async connection => {
    let dump = await readfile(dumpPath);
    const total = dump.length;
    while (true) {
        const { query, particalDump } = putQuery(dump);
        dump = particalDump;

        await connection.query(query);
        log(`progress: ${(100 - (dump.length / total) * 100).toFixed(4)}%`);
        if (!dump) {
            return;
        }
    }
});

const defaultStartQuery = [
    'DROP TABLE IF EXISTS',
    'CREATE TABLE',
    'INSERT INTO',
];
function putQuery(dumpSql: string): { query: string; particalDump: string } {
    const newQueryIndex = Math.min(
        ...defaultStartQuery.map(o => dumpSql.indexOf(o, minSize)),
    );
    if (newQueryIndex === -1) {
        return { query: dumpSql, particalDump: '' };
    }
    const query = dumpSql.slice(0, newQueryIndex);
    const particalDump = dumpSql.slice(newQueryIndex);
    if (queryNotEmpty(query)) {
        return { query, particalDump };
    }
    return putQuery(particalDump);
}

function queryNotEmpty(query: string): boolean {
    return !!query.replace(/\n/gim, '').replace(/ /gim, '').length;
}

async function readfile(filename: string): Promise<string> {
    const filePromise = new Promise<string>((resolve, _) => {
        let output = '';

        const readStream = fs.createReadStream(filename);

        readStream.on('data', chunk => {
            output += eol.auto(chunk.toString('utf8'));
        });

        readStream.on('end', () => {
            resolve(output);
        });
    });
    return filePromise;
}

import fs from 'fs';
import { spawn } from 'child_process';

export function load_all () {
    const path_b = 'C:\\Users\\devas\\.cache\\kagglehub\\datasets\\arashnic\\book-recommendation-dataset\\versions\\3\\Books.csv';
    const row_data = fs.readFileSync(path_b, 'utf-8').split('\n').slice(0, 51);
    const keys = row_data.shift().split(',');
    const books = row_data.map(row => {
        const value = row.split(',');
        return keys.reduce((obj, key, idx) => {
            obj[key.trim()] = value[idx];
            return obj;
        }, {});
    })
    return books;
}

export function recommend (title) {
    return new Promise((resolve, reject) => {
        const py_process = spawn('python', ['./prediction/predict.py', title]);

        let data = '';
        py_process.stdout.on('data', (chunk) => {
            data += chunk.toString();
        });

        py_process.stderr.on('data', (err) => {
            console.log(err.toString());
            reject(err.toString());
        });

        py_process.on('close', () => {
            try {
                resolve(JSON.parse(data));
            } catch (err) {
                console.error(err);
            }
        });
    });

}

load_all()
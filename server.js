/*
 * server.js — ParkWare Development Server
 * 
 * A simple static file server using only Node.js built-in modules.
 * No Express, no dependencies — just http, fs, and path.
 * 
 * All it does is serve files from this directory. When you visit
 * the root URL ("/"), it serves index.html. For anything else,
 * it tries to find the file and serve it with the right Content-Type.
 * 
 * Usage:
 *   node server.js
 *   then open http://localhost:3000 in your browser
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOST = '0.0.0.0';

// Map file extensions to their MIME types so the browser
// knows how to handle each file we send back
const mimeTypes = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css',
    '.json': 'application/json',
    '.png':  'image/png',
    '.jpg':  'image/jpg',
    '.gif':  'image/gif',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // If someone visits "/", serve index.html
    // Otherwise, try to serve whatever file they asked for
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // Look up the MIME type based on the file extension
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Try to read the file from disk and send it back
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server error: ' + error.code + '\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log(`\nParkWare server running at http://localhost:${PORT}\nPress Ctrl+C to stop.\n`);
});

// Handle the case where the port is already in use
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Try closing other servers or change the PORT variable.`);
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});

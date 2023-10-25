import {JSDOM} from 'jsdom';
import {describe, it} from 'mocha';

// jsdom
const jsdom = new JSDOM(`<body>
<div id="app"></div>
</body>`, {
    url: "https://example.org/",
    referrer: "https://example.com/",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000,
});
global.window = jsdom.window;
global.document = jsdom.window.document;

// mocha
global.describe = describe;
global.it = it;

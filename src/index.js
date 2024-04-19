import _ from 'lodash';
import printMe from './print.js';
import './style.css';
import Icon from './icon.png';
import { test } from './test';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    // Add the image to our existing div.
    const myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

async function getTableID() {
    try {
        return await test()
    } catch {
        return '1HzZGWqbRB7-eK95sRaUTEyZglqEV11uIID6mEa6Ps4A'
    }
}

async function main() {
    document.body.appendChild(component());
    const tableID = await getTableID();
    console.log(tableID);
}

main();

ReactDOM.render(<App />, document.getElementById('root'));

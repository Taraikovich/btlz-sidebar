import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import { test } from './test';

function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    // Add the image to our existing div.
    const myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);

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
}

main();

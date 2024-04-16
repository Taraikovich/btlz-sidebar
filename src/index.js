import _ from 'lodash';
import { test } from './test'

function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    test();
    return element;
}

document.body.appendChild(component());
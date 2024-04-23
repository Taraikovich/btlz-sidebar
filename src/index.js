import _ from 'lodash';
import React from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import './style.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Home from './components/Home';

ReactDOM.render(
    <BrowserRouter>
        <Home />
    </BrowserRouter>,
    document.getElementById('app')
);
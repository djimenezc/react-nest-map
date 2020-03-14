import React from 'react';
import {render} from '@testing-library/react';
import Toolbar from './Toolbar';
import {BrowserRouter as Router} from "react-router-dom";

test('Toolbar', () => {

    const wrapper = render(
        <Router>
            <Toolbar/>
        </Router>);

    expect(wrapper).toMatchSnapshot();
});

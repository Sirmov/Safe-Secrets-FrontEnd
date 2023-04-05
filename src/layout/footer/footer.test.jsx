import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import Footer from './footer';

describe('Footer layout component tests.', () => {
    test('Footer component should render a footer element.', () => {
        const result = render(<Footer />);

        expect(result.container.querySelector('footer'), 'No footer element visible.').toBeVisible();
    });

    test('Footer component should render copyright text.', () => {
        render(<Footer />);

        expect(screen.queryByText('Copyright', { exact: false }), 'Missing copyright text.').toBeVisible();
    });

    test('Footer component should render 4 links.', () => {
        const result = render(<Footer />);

        expect(result.container.querySelectorAll('a'), 'Incorrect number of links.').has.length(4);
    });
});

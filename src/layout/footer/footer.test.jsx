import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import Footer from './footer';

describe('Footer layout component tests.', () => {
    test('Footer component should render a footer element.', () => {
        // Arrange
        const result = render(<Footer />);

        // Assert
        expect(result.container.querySelector('footer'), 'No footer element visible.').toBeVisible();
    });

    test('Footer component should render copyright text.', () => {
        // Arrange
        render(<Footer />);

        // Assert
        expect(screen.getByText('Copyright', { exact: false }), 'Missing copyright text.').toBeVisible();
    });

    test('Footer component should render 4 links.', () => {
        // Arrange
        render(<Footer />);

        // Assert
        expect(screen.getAllByRole('link'), 'Incorrect number of links.').to.have.length(4);
    });
});

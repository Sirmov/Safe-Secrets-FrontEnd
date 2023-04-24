import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import PageHeader from './pageHeader';

describe('Page header layout component tests.', () => {
    test('Page header component should render a page header container element.', () => {
        // Arrange
        const result = render(<PageHeader title="" subtitle="" />);

        // Assert
        expect(
            result.container.querySelector('div.page-header'),
            'No page header container element visible.'
        ).toBeVisible();
    });

    test('Page header component should render correct page title.', () => {
        // Arrange
        const title = 'Page title';
        render(<PageHeader title={title} subtitle="" />);

        // Assert
        expect(
            screen.getByRole('heading', { name: title }),
            'The page title is not visible or is not correct.'
        ).toBeVisible();
    });

    test('Page header component should render correct page subtitle.', () => {
        // Arrange
        const subtitle = 'Page subtitle';
        render(<PageHeader title="" subtitle={subtitle} />);

        // Assert
        expect(screen.getByText(subtitle), 'The page subtitle is not visible or is not correct.').toBeVisible();
    });

    test('Page header component should render children.', () => {
        // Arrange
        const text = 'I should be rendered.';
        render(
            <PageHeader title="" subtitle="">
                <p>{text}</p>
            </PageHeader>
        );

        // Assert
        expect(screen.getByText(text), 'The children are not visible.').toBeVisible();
    });
});

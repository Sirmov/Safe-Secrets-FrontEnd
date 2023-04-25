import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import PageBody from './pageBody';

describe('Page body layout component tests.', () => {
    test('Page body component should render a page body container.', () => {
        // Arrange
        const result = render(
            <PageBody>
                <></>
            </PageBody>
        );

        // Assert
        expect(result.container.querySelector('div.page-body'), 'No page body container visible.').toBeVisible();
    });

    test('Page body component should render children.', () => {
        // Arrange
        const text = 'I should be rendered.';
        render(
            <PageBody>
                <p>{text}</p>
            </PageBody>
        );

        // Assert
        expect(screen.getByText(text), 'The children are not visible.').toBeVisible();
    });
});

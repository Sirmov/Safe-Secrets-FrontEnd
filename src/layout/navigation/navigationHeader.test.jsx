import React from 'react';

import usersServiceMock from '@/tests/mocks/usersServiceMock';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';

import { AuthContext } from '@contexts/authContext';
import ThemeContext from '@contexts/themeContext';

import NavigationHeader from './navigationHeader';

beforeAll(() => {
    vi.mock('@services/usersService.js', () => usersServiceMock);
});

afterAll(() => {
    vi.unmock('@services/usersService.js');
});

function NavigationHeaderMock({ user, setAuth = vi.fn() }) {
    const auth = user ? { ...user, accessToken: true } : {};

    return (
        <BrowserRouter>
            <ThemeContext.Provider value={{ theme: { mode: 'light' }, setTheme: vi.fn() }}>
                <AuthContext.Provider value={{ auth, setAuth }}>
                    <NavigationHeader />
                </AuthContext.Provider>
            </ThemeContext.Provider>
        </BrowserRouter>
    );
}

describe('Navigation header layout component tests.', () => {
    test('Navigation header should render user greeting if he is authenticated.', () => {
        // Arrange
        const username = 'Peter';
        render(<NavigationHeaderMock user={{ username }} />);

        // Assert
        expect(screen.getByText(`Hello ${username}`)).toBeVisible();
    });

    test('Navigation header should return to home page on logout.', async () => {
        // Arrange
        render(<NavigationHeaderMock user={true} />);
        window.pathname = '/incorrect/pathname';

        // Act
        const logoutButton = screen.getByRole('button', { name: 'Logout' });
        await act(async () => fireEvent.click(logoutButton));

        // Assert
        expect(window.location.pathname, 'Url pathname is not correct.').toBe('/');
    });

    test('Navigation header should set auth to empty object on logout.', async () => {
        // Arrange
        const props = { user: true, setAuth: vi.fn() };
        const spy = vi.spyOn(props, 'setAuth');
        render(<NavigationHeaderMock {...props} />);

        // Act
        const logoutButton = screen.getByRole('button', { name: 'Logout' });
        await act(async () => fireEvent.click(logoutButton));

        // Assert
        expect(spy, 'Set auth function has not been called with {}.').toHaveBeenCalledWith({});
    });

    test.each([{ link: 'home' }, { link: 'posts' }, { link: 'secrets' }])(
        'Navigation header should mark $link as active.',
        async ({ link }) => {
            // Arrange
            render(<NavigationHeaderMock user={true} />);
            window.pathname = '/this/pathname/does/not/exist';

            // Act
            const linkElement = screen.getByRole('link', { name: new RegExp(link, 'i') });
            await act(async () => fireEvent.click(linkElement));

            // Assert
            expect(linkElement.className, 'Link element does not contain active class.').to.contain('nav-link-active');
        }
    );
});

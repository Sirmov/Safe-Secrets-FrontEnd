import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Mock, afterAll, beforeAll, describe, expect, test, vi } from 'vitest';

import usersServiceMock from '@/tests/mocks/usersServiceMock';

import { AuthContext } from '@contexts/authContext';
import ThemeContext from '@contexts/themeContext';

import { ThemeModes } from '@models/enums/themeModes';

import NavigationHeader from './navigationHeader';

const user = userEvent.setup();

beforeAll(() => {
    vi.mock('@services/usersService.ts', () => usersServiceMock);
});

afterAll(() => {
    vi.unmock('@services/usersService.ts');
});

interface NavigationHeaderMockProps {
    user: { username: string } | boolean;
    setAuth?: Mock<any, any>;
}

function NavigationHeaderMock({ user, setAuth = vi.fn() }: NavigationHeaderMockProps) {
    let auth = null;

    if (typeof user === 'boolean' && user === true) {
        auth = {
            _id: 'user-id',
            username: 'user-username',
            email: 'user-email',
            accessToken: 'user-accessToken',
        };
    } else {
        user = user as { username: string };
        auth = {
            _id: 'user-id',
            username: user.username,
            email: 'user-email',
            accessToken: 'user-accessToken',
        };
    }

    return (
        <BrowserRouter>
            <ThemeContext.Provider value={{ theme: { mode: ThemeModes.Light }, setTheme: vi.fn() }}>
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
        window.location.pathname = '/incorrect/pathname';

        // Act
        const logoutButton = screen.getByRole('button', { name: 'Logout' });
        await user.click(logoutButton);

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
        await user.click(logoutButton);

        // Assert
        expect(spy, 'Set auth function has not been called with null.').toHaveBeenCalledWith(null);
    });

    test.each([{ link: 'home' }, { link: 'posts' }, { link: 'secrets' }])(
        'Navigation header should mark $link as active.',
        async ({ link }) => {
            // Arrange
            render(<NavigationHeaderMock user={true} />);
            window.location.pathname = '/this/pathname/does/not/exist';

            // Act
            const linkElement = screen.getByRole('link', { name: new RegExp(link, 'i') });

            await user.click(linkElement);

            // Assert
            expect(linkElement.className, 'Link element does not contain active class.').to.contain('nav-link-active');
        }
    );
});

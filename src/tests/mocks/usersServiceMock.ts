import { vi } from 'vitest';

const logout = vi.fn(() => {
    return {
        data: '',
        status: 204,
        statusText: 'No Content',
        headers: {},
        request: {},
        isOk: true,
    };
});

export default { logout };

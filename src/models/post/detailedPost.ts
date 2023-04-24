import { User } from '@models/user/user';

import { Post } from './post';

export interface DetailedPost extends Post {
    author: User;
}


/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CommentInput {
    text: string;
}

export class CreateCatInput {
    name: string;
    age: number;
}

export class PostInput {
    title: string;
    description: string;
}

export class Cat {
    id: number;
    name: string;
    age: number;
}

export class Comment {
    _id: string;
    text: string;
}

export abstract class IMutation {
    abstract createCat(createCatInput?: CreateCatInput): Cat | Promise<Cat>;

    abstract commentPost(id: string, input?: CommentInput): Comment | Promise<Comment>;

    abstract createPost(input?: PostInput): Post | Promise<Post>;

    abstract deletePost(_id: string): Post | Promise<Post>;
}

export class Post {
    _id: string;
    title: string;
    description: string;
    comments: Comment[];
}

export abstract class IQuery {
    abstract getCats(): Cat[] | Promise<Cat[]>;

    abstract cat(id: string): Cat | Promise<Cat>;

    abstract posts(): Post[] | Promise<Post[]>;
}

export abstract class ISubscription {
    abstract catCreated(): Cat | Promise<Cat>;
}

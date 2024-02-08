import Thumbnail1 from "./Assets/Thumbnail1.jpg";
import Thumbnail2 from "./Assets/Thumbnail2.jpg";
import Thumbnail3 from "./Assets/blog2.jpg";

import avater1 from "./Assets/avatar1.jpg";
import avater2 from "./Assets/avatar2.jpg";
import avater3 from "./Assets/avatar3.jpg";

export const DUMMY_POSTS = [
    {
      id: '1',
      thumbnail: Thumbnail1,
      category: 'Education',
      title: 'This is Title of the vary first Post of this blog.',
      desc: 'This is the very first description of this blog.This is the very first description of this blog.This is the very first description of this blog.This is the very first description of this blog.This is the very first description of this blog.',
      authorID: 2
    },
    {
      id: '2',
      thumbnail: Thumbnail2,
      category: 'Technology',
      title: 'This is Title of the vary Second Post of this blog.',
      desc: 'This is the very Second description of this blog.This is the very Second description of this blog.This is the very Second description of this blog.This is the very Second description of this blog.This is the very Second description of this blog.',
      authorID: 1
    },
    {
      id: '2',
      thumbnail: Thumbnail3,
      category: 'Business',
      title: 'This is Title of the Business Post of this blog.',
      desc: 'This is the very Second description of this blog.This is the very Second description of this blog.This is the very Second description of this blog.This is the very Second description of this blog.This is the very Second description of this blog.',
      authorID: 4
    },
  ]

export const DUMMY_Authors = [
    {
      id: '1',
      avater: avater1,
      name: 'Anik KRK',
      email: 'anik@gmail.com',
      comment: 'comment1',
      posts: 2
    },
    {
      id: '2',
      avater: avater2,
      name: 'Alex Senha',
      email: 'alex@gmail.com',
      comment: 'comment2',
      posts: 3
    },
    {
      id: '3',
      avater: avater3,
      name: 'Jane Yum',
      email: 'jane@gmail.com',
      comment: 'comment3',
      posts: 3
    },
  ]
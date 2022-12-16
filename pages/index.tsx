import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

type Author = {
  id: string;
  name: string;
  password: string;
};

type Collection = {
  id: string;
  name: string;
};
type Book = {
  id: string;
  title: string;
  content: string;
  collectionId: string;
  authorId: string;
};
export default function Home() {
  const [book, setBook] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [formState, setFormState] = useState({
    title: '',
    content: '',
    authorId: '',
    collectionId: '',
  });
  const [formCollection, setFormCollection] = useState({
    name: '',
  });
  const [formAuthor, setFormAuthor] = useState({
    name: '',
    password: '',
  });
  useEffect(() => {
    axios
      .get<Author[]>('http://localhost:5050/api/v1/authors')
      .then((res) => setAuthors(res.data));
    axios
      .get<Collection[]>('http://localhost:5050/api/v1/collections')
      .then((res) => setCollections(res.data));
    axios
      .get<Book[]>('http://localhost:5050/api/v1/books')
      .then((res) => setBook(res.data));
  }, []);

  const handleSubmit = () => {
    axios.post('http://localhost:5050/api/v1/books', {
      title: formState.title,
      content: formState.content,
      authorId: formState.authorId,
      collectionId: formState.collectionId,
    });
  };

  const handleSubmit2 = () => {
    axios.post('http://localhost:5050/api/v1/collections', {
      name: formCollection.name,
    });
  };
  const handleSubmit3 = () => {
    axios.post('http://localhost:5050/api/v1/authors', {
      name: formAuthor.name,
      password: formAuthor.password,
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    setFormCollection((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChange3 = (e: ChangeEvent<HTMLInputElement>) => {
    setFormAuthor((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Tonys Bookshop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to my bookshop!</h1>
        <div className="flex flex-row justify-around align-middle">
          <div
            className="flex flex-col w-60 mt-2 py-2 align-middle 
         h-30 border-2 border-slate-400 text-center"
          >
            <label>Title</label>
            <input
              onChange={handleChange}
              name="title"
              value={formState.title}
              type="text"
              className="border-slate-400 border-2 mx-auto my-2 w-3/4 h-full"
            />
            <label>Content</label>
            <input
              name="content"
              onChange={handleChange}
              value={formState.content}
              type="text"
              className="border-slate-400 border-2 mx-auto my-2 w-3/4 h-full"
            />

            <select onChange={handleChange} name="authorId" className="mb-3">
              <option className="text-center">Select an author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>

            <select
              onChange={handleChange}
              name="collectionId"
              className="mb-3"
            >
              <option className="text-center">Select a collection</option>
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleSubmit}
              type="submit"
              className="mx-auto my-2 w-3/4 h-full bg-blue-400 b-2 border-black"
            >
              Create book!
            </button>
          </div>

          <div
            className="flex flex-col w-60 mt-2 py-2 align-middle items- 
         h-30 border-2 border-slate-400 text-center"
          >
            <label>Name</label>
            <input
              onChange={handleChange2}
              value={formCollection.name}
              name="name"
              type="text"
              className="border-slate-400 border-2 mx-auto my-2 w-3/4 h-1/8"
            />

            <button
              onClick={handleSubmit2}
              type="submit"
              className="mx-auto my-2 w-3/4 h-1/8 bg-blue-400 b-2 border-black"
            >
              Create Collection!
            </button>
          </div>
          <div
            className="flex flex-col w-60 mt-2 py-2 align-middle items- 
         h-30 border-2 border-slate-400 text-center"
          >
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange3}
              value={formAuthor.name}
              className="border-slate-400 border-2 mx-auto my-2 w-3/4 h-1/8"
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange3}
              value={formAuthor.password}
              className="border-slate-400 border-2 mx-auto my-2 w-3/4 h-1/8"
            />
            <button
              type="submit"
              onClick={handleSubmit3}
              className="mx-auto my-2 w-3/4 h-1/8 bg-blue-400 b-2 border-black"
            >
              Create Author
            </button>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

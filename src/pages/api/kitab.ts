import { ENV } from 'env';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiUrl =
      `${process.env.HADIS_API_URL}/api/books?apiKey=$2y$10$MRBllWnaZ6k8COfwpuuTeF5seLmO9SZKYWoiHcaYc7HOtyKqIpW`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 200 && data.books && Array.isArray(data.books)) {
      const books: Book[] = data.books.map((b: any) => ({
        bookName: b.bookName || 'No book name',
        writerName: b.writerName || 'No writer name',
        aboutWriter: b.aboutWriter || 'No information',
        writerDeath: b.writerDeath || 'Unknown death date',
        bookSlug: b.bookSlug || 'Unknown slug',
        hadithsCount: b.hadiths_count || '0',
        chaptersCount: b.chapters_count || '0',
      }));
      res.status(200).json(books);
    } else {
      console.error("Unexpected data format:", data);
      res.status(500).json({ error: "Unexpected data format" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

type Book = {
  bookName: string;
  writerName: string;
  aboutWriter: string;
  writerDeath: string;
  bookSlug: string;
  hadithsCount: string;
  chaptersCount: string;
}

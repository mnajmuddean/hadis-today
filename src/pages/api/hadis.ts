import { NextApiRequest, NextApiResponse } from 'next';

export type Hadis = {
  hadithTitle: string;
  hadithNarrator: string;
  hadithArabic: string;
  hadithEnglish: string;
  hadithStatus: string;
  hadithBookName: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const min = 1;
const max = 1625;

// Generate a random integer between min and max (inclusive)
const randomPage = Math.floor(Math.random() * (max - min + 1)) + min;

    const apiUrl =
      `${process.env.HADIS_API_URL}/api/hadiths?apiKey=$2y$10$MRBllWnaZ6k8COfwpuuTeF5seLmO9SZKYWoiHcaYc7HOtyKqIpW&page=${randomPage}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    // Map the response to the Hadis type
    const hadiths: Hadis[] = data.hadiths.data.map((hadith: any) => ({
      hadithTitle: hadith.headingEnglish || '', // Use an empty string if the headingEnglish is null or undefined
      hadithNarrator: hadith.englishNarrator || '', // Use an empty string if the englishNarrator is null or undefined
      hadithArabic: hadith.hadithArabic || '', // Use an empty string if the hadithArabic is null or undefined
      hadithEnglish: hadith.hadithEnglish || '', // Use an empty string if the hadithEnglish is null or undefined
      hadithStatus: hadith.status || '', // Use an empty string if the status is null or undefined
      hadithBookName: hadith.book.bookName || '' // Use an empty string if the bookName is null or undefined
    }));
    res.status(200).json(hadiths);
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

import { Genre } from "./Genre";

export interface Game {
  id: number;
  title: string;
  thumbnailUrl: string;
  shortshort_description?: string;
  genre: Genre;
}

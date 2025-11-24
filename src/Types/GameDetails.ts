import { Genre } from "./Genre";

export interface GameDetails {
  id: number;
  title: string;
   thumbnailUrl: string;
  status: string;
  short_description?: string;
  genre: Genre;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  game_url: string;
}


export interface Game {
  id: string;
  title: string;
  thumbnail?: string;
  iframeUrl:string;
  url:string;
  shortDescription?: string;
  genre: string ;
  isFeatured:boolean;
  isFavourite:boolean;
}

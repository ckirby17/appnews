import { FavoriteList } from './favorite-list';
export interface FavoriteHeader {
  count: number,
  next: string,
  previous: string,
  listFavorites: FavoriteList[]
}

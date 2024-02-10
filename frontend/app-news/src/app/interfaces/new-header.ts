import { NewList } from "./new-list";

export interface NewHeader {
  count: number,
  next: string,
  previous: string,
  results: NewList[]
}

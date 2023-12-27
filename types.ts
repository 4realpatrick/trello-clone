import { List, Card } from "@prisma/client";

export type TListWithCards = List & { cards: Card[] };

export type TCardWithList = Card & { list: List };

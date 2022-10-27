export type TItem = {
    img: string,
    title: string,
    id: string,
    price: number,
    rate: number,
    wireless: boolean;
    number: number,
};

export type TNews = {
    id: number | null,
    title: string | null,
    link: string | null,
    score: number | null,
    by: string | null,
    time: number | null,
    counter: number | null,
    comments: Array<TItem> | null,
};
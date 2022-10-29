export type TComment = {
    id: number | null,
    by: string | null,
    time: number | null,
    text: string | null,
    parent: number | null,
    kids: Array<number> | null,
};

export type TNews = {
    id: number | null,
    title: string | null,
    url: string | null,
    score: number | null,
    by: string | null,
    time: number | null,
    counter: number | null,
    comments: Array<number> | null,
    kids: Array<number> | null
};
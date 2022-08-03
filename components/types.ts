export const SITE_NAME = '王郁的小站';

export enum Theme {
    light = 'light',
    dark = 'dark'
}

export interface Post {
    id: string,
    file: string,
    content: string,
    data: { [key: string]: any }
    excerpt?: string,
    contentHtml: string,
    excerptHtml: string
}

export interface Access{
    _id: string;
    daily: number;
    weekly: number;
    monthly: number;
    pre_daily: number;
    pre_weekly: number;
    pre_monthly: number;
}

export interface CategoryTagPath {
    params: {
        cid: string,
        name: string,
        count: number
    }
}

export enum MenuLinks {
    HOME = '/',
    LAB = '/lab.html',
    CLIPBOARD = '/clipboard.html',
    ADMIN = '/admin.html',
    MONGO = '/admin/mongo.html',
    ABOUT = '/about.html',
}


export enum KeyCode{
    Enter = 13,
}
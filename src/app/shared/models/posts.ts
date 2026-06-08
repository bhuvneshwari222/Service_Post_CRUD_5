export interface Ipost {
    postID: string;
    title: string;
    content: string;
    isCompleted: boolean;
}

export interface IpostResp<T>{
    msg: string;
    data: T
}
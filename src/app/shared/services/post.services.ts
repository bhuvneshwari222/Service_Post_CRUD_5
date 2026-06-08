import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { Ipost, IpostResp } from "../models/posts";


@Injectable({
    providedIn: 'root'
})
export class PostService {
    postData = [
        {
            postID: "P101",
            title: "Introduction to Angular",
            content: "Angular is a powerful framework used for building dynamic web applications.",
            isCompleted: true
        },
        {
            postID: "P102",
            title: "Understanding Components",
            content: "Components are the building blocks of an Angular application.",
            isCompleted: false
        },
        {
            postID: "P103",
            title: "Data Binding",
            content: "Data binding helps connect the component logic with the UI.",
            isCompleted: true
        },
        {
            postID: "P104",
            title: "Directives in Angular",
            content: "Directives are used to manipulate the DOM in Angular.",
            isCompleted: false
        },
        {
            postID: "P105",
            title: "Services and Dependency Injection",
            content: "Services help share data and logic across components.",
            isCompleted: true
        }
    ];

    editPostSub$ : Subject<Ipost> = new Subject<Ipost>();

    fetchPostArr():Observable<Ipost[]>{
        return of(this.postData);
    }

    addNewPost(newPost:Ipost):Observable<IpostResp<Ipost>>{
        this.postData.unshift(newPost);
        return of({
            msg: `The new post ${newPost.title} is added successfully!!!`,
            data: newPost
        })
    }

    removePost(removeID:string):Observable<IpostResp<string>>{
        let getIndex = this.postData.findIndex(p => p.postID === removeID);
        let removedPost = this.postData.splice(getIndex,1);
        return of({
            msg: `The post ${removedPost[0].title} is removed successfullt!!!`,
            data: removeID
        })
    }

    updatePost(updatedPost:Ipost):Observable<IpostResp<Ipost>>{
        let getIndex = this.postData.findIndex(p => p.postID === updatedPost.postID);
        this.postData[getIndex] = updatedPost;
        return of({
            msg: `The post ${updatedPost.title} is updated successfully!!!`,
            data: updatedPost
        })
    }

}
import {Injectable, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {Post} from "./model/post.model";
import {newArray} from "@angular/compiler/src/util";


@Injectable({providedIn: 'root'})
export class HttpService {

  todoArray : Array<Post> = new Array<Post>();



  constructor(private httpClient : HttpClient) {
  }

  addPost(name:string,desc:string){

    const post : Post = {
      name : name,
      desc : desc
    }

    return this.httpClient.post<any>('http://localhost:3000/savePost',post)
      .pipe(
        map(data=> {
          let objectTodo : Post = {
          name : data.name,
          id : data._id,
          desc : data.desc
          }
          return objectTodo
        }),
        catchError(err => {
          return throwError(err)
        })
      )

  }


  deletePost(id: string) {
    return this.httpClient.delete<any>('http://localhost:3000/deletePost/'+ id,)

  }

  editPost(postTodo : Post) {

    // right now patch aint working because of cors
    //return this.httpClient.patch<any>('http://localhost:3000/editPost/', postTodo)

   // so i will use post request only..
    return this.httpClient.post<any>('http://localhost:3000/editPost',postTodo)




  }

  getAll() {
    return this.httpClient.get<{ message : string,todos : any}>('http://localhost:3000/getAll')
      .pipe(
        map(
          data => {
            data.todos.map(x  => {
              let todoItem : Post = {
                name : x.name,
                desc : x.desc,
                id : x._id
              };

              this.todoArray.push(todoItem)
            })
            return this.todoArray
          }

        )
      )
  }


}

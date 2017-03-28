import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PostService {
  constructor(http : Http) {
    console.log('construyendo una instancia del servicio de post')
    this.postListeners = []
    this.http = http
    this._posts = []
    this.http.get("/noticias").toPromise()
      .then(response => this.addPosts(response.json()))
      .catch(err => console.log(err))
  }
  get posts() {
    return this._posts
  }
  create(post) {
    this.http.post("/noticias", JSON.stringify(post), { headers:{'Content-Type': 'application/json'}})
      .toPromise()
      .then(response => {
        this.addPost(post)
      })
      .catch(err => console.log(err))
  }
  observePost(listener){
    this.postListeners.push(listener);
  }
  addPost(post){
    this._posts = this._posts.slice()
    this._posts.push(post);
    this.notifyPost()
  }
  addPosts(posts){
    this._posts = this._posts.slice()
    this._posts.push(...posts);
    this.notifyPost()
  }
  notifyPost(){
    console.log('notificando')
    for (var index = 0, len = this.postListeners.length; index < len; index++) {
      this.postListeners[index]();
    }
  }
}

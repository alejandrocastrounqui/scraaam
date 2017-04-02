import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PostService {
  constructor(http : Http) {
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
  getPost(id) {
    return this.http.get(`/noticias/${id}`).toPromise()
            .then(response => response.json());
  }
  removePost(id){
    return this.http.delete(`/noticias/${id}`).toPromise();
  }
  create(post) {
    this.http.post("/noticias", JSON.stringify(post), { headers:{'Content-Type': 'application/json'}})
      .toPromise()
      .then(response => {
        post._id = response.json()
        post.__v = 0
        post.comments = []
        post.upvotes = 0
        this.addPost(post)
      })
      .catch(err => console.log(err))
  }
  addPost(post){
    this._posts.push(post);
    return this
  }
  addPosts(posts){
    this._posts.push(...posts);
    return this
  }
}

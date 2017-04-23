export class Observer{

  constructor() {
    this.handlers = []
  }

  subscribe(target, callback) {
    let handler = target.subscribe(callback)
    this.handlers.push(handler)
  }
  ngOnInit() {}
  ngOnDestroy() {
    this.handlers.forEach(handler => handler.unsubscribe())
  }

}

import { Injectable }  from '@angular/core';

@Injectable()
export class ServiceProvider{

  constructor() {
    this.services = {}
  }

  declare(modelName, service){
    if(this.services[modelName]){
      throw Error(`Cannot declare multiple service for ${modelName}`)
    }
    this.services[modelName] = service
  }

  forModelName(modelName){
    let service = this.services[modelName]
    if(!service){
      throw Error(`${modelName} service not found`)
    }
    return service
  }
}

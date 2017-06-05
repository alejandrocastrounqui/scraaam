export class Angular2Provider{

  constructor() {
    this.services = {}
  }

  declare(service){
    if(this.services[service.name]){
      throw Error(`Cannot declare multiple service for ${modelName}`)
    }
    service.provider = this
    this.services[service.modelName] = service
  }

  getModelService(modelName){
    let service = this.services[modelName]
    if(!service){
      throw Error(`${modelName} service not found`)
    }
    return service
  }
}

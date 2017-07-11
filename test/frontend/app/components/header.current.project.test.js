import chai      from "chai"
import sinon     from "sinon"
import sinonChai from "sinon-chai"

chai.should()
chai.use(sinonChai)
import { Component }           from "@angular/core"
import { Router }              from "@angular/router"
import { RouterTestingModule } from "@angular/router/testing"

import { By }                  from "@angular/platform-browser"
import { inject }              from '@angular/core/testing';
import { TestBed }             from "@angular/core/testing"
import { MockBackend }         from '@angular/http/testing'
import { HttpModule }          from '@angular/http/'
import { Http }                from '@angular/http/'

/*import { BaseRequestOptions } from '@angular/http/'
import { XHRBackend }         from '@angular/http/'*/

import { NgbModule }           from '@ng-bootstrap/ng-bootstrap'

import { HeaderView }       from "../../../../src/frontend/components/header/index"
import { ProjectService }   from "../../../../src/frontend/services/ProjectService"
import { MilestoneService } from "../../../../src/frontend/services/MilestoneService"
import { EpicService }      from "../../../../src/frontend/services/EpicService"

describe("HeaderView", () => {

  let fixture;

  let createAngularResponse = function (data) {
    return {
      toPromise() {
        return Promise.resolve({
          json() {
            return data
          }
        })
      }
    }
  }

  beforeEach(() => {
    let http = {
      get() {
      }
    }
    sinon.stub(http, "get")
    http.get.withArgs("/project/testingHeaderProjectId").returns(createAngularResponse({
      "_id": "testingHeaderProjectId",
      "name": "testingHeaderProjectName"
    }));
    http.get.withArgs("/project").returns(createAngularResponse([{
      "_id": "testingHeaderProjectId",
      "name": "testingHeaderProjectName"
    }, {
      "_id": "id2",
      "name": "projectTwo"
    }]));

    TestBed.configureTestingModule({
      declarations: [HeaderView],
      imports: [
        RouterTestingModule,
        NgbModule.forRoot()
      ],
      providers: [{
          provide: Http,
          useValue: http
        },
        ProjectService,
        MilestoneService,
        EpicService
      ]
    });
    fixture = TestBed.createComponent(HeaderView);
  })

  it("header should contain current proyect name", (done) => {

    TestBed.compileComponents()
    .then(
      inject([ProjectService],
      (projectService) => {
        fixture.detectChanges()
        projectService.currentId = "testingHeaderProjectId"
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const projectItem = fixture.debugElement.query(By.css(".projects-menu .current-project"))
          projectItem.nativeElement.textContent.should.be.equal('testingHeaderProjectName')
          done()
        });
      })
    )
  })

})

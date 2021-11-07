import { Component, OnInit } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { NgForm} from '@angular/forms'
import { AlertComponent } from '../alert/alert.component';

import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.service';
import { ViewChild } from '@angular/core';
import { PlaceholderDirective } from '../placeholder.directive';
import { OnDestroy } from '@angular/core/src/metadata';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective; 
  isLoginMode= true;
  isLoading= false;
  error: string = null;

  private closeSub : Subscription; 

  constructor(private authService: AuthService,
              private factoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }
  ngOnDestroy(){
    if (this.closeSub) {
      this.closeSub.unsubscribe()
    }
  }

  onSwitch(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form:NgForm){
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password; 
    let authObs: Observable<AuthResponseData>;
    
    this.isLoading = true; 
    if (this.isLoginMode){
    authObs = this.authService.login(email, password) }
      else{
    authObs = this.authService.signup(email, password) }
      
    authObs.subscribe(
        resData => { console.log(resData);
        this. isLoading= false;
        },    
        errorMessage => { 
          console.log(errorMessage); 
          this.error = errorMessage; 
          this.showErrorAlert(errorMessage)  
          this.isLoading= false;
        } 
    )     
      
      form.reset();
    }
    onHandleError(){
      this.error = null;
    }

    private showErrorAlert( message: string){
     const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

     const hostViewContainerRef = this.alertHost.viewContainerRef;
     hostViewContainerRef.clear();

     hostViewContainerRef.createComponent(alertCmpFactory)

     componentRef.instance.message = message;
     
     this.closeSub = componentRef.instance.close.subscribe(() => {
       this.closeSub.unsubscribe(); 
       hostViewContainerRef.clear()
     })

    }

  }

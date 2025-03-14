import { Component, OnInit } from '@angular/core';
import { UserApiService } from './services/user-api.service';
import { UserInterface } from './interfaces/interfaces.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'LogInApp';
  existingUsers: UserInterface[] = [];// Array to store fetched users

  //Create an object of our API to retrieve data form it
  constructor(private userApi: UserApiService){}
  
  ngOnInit(): void {
    this.userApi.getApiData().subscribe(
      (response) =>{
        //Assign results to our array
        this.existingUsers = response;
        console.log(this.existingUsers);
      },
      (error) =>{
        console.error('Api array not found',error);
      }
    );
  }
  
}

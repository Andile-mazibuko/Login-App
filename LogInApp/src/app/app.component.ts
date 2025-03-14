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
        //;
        window.alert(this.isUserAvail('JohnDoe').email);
      },
      (error) =>{
        console.error('Api array not found',error);
      }
    );
  }
  
  foundUser!: UserInterface;
  isUserAvail(name: string): UserInterface
  {  
    for(let user of this.existingUsers){
      
      if(user.userName == name){
        this.foundUser = user;
        break;
      }
      
    }

    return this.foundUser;
  }
  
}

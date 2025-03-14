import { Component, OnInit } from '@angular/core';
import { UserApiService } from './services/user-api.service';
import { UserInterface } from './interfaces/interfaces.interface';
import { FormGroup,FormBuilder,Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'LogInApp';
  // Array to store users fetched from the API  
  existingUsers: UserInterface[] = [];

  //Reactive form related variables
  //public because i have to access it on the html side
  public userForm: FormGroup;

  //Multiple constructors are not allowed
  constructor(private userApi: UserApiService,private fB: FormBuilder){
    //groups username and email
    this.userForm = this.fB.group({ 
      userName: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],

      //address group
      address: this.fB.group({
        city: [''],street: [''],//No validators for now(for testing purposes)
        
      }),

      //Array for cellphone numbers

      phoneNumbers: this.fB.array([
        this.fB.control(['',[Validators.required]])
      ])

    });
  }


  //Create an object of our API to retrieve data form it
 // constructor(){}
  
  ngOnInit(): void {
    this.userApi.getApiData().subscribe(
      (response) =>{
        //Assign results to our array
        this.existingUsers = response;
        console.log(this.existingUsers);
        //window.alert(this.isUserAvail('JohnDoe').email);
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

  get getPhoneNumbers(): FormArray
  {
    return this.userForm.get('phoneNumbers') as FormArray
  }

  addPhoneNumberCtrl(): void
  {
    //add to our dynamic method
    this.getPhoneNumbers.push(
      this.fB.control(['']) //Testing pursoes : No validators
    );
    
  }

  removePhoneNumberCtrl(index: number)
  {
    this.getPhoneNumbers.removeAt(index);
  }

  onFormSubmit()
  {
    console.log(this.userForm.value);
  }
}

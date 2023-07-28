import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  companyArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  name: string ='';
  address: string='';
  mobile: number = '' as any;
  currentCompanyID = '';


  constructor(private http: HttpClient) {
    this.getAllCompanyUsers();
  }
  ngOnInit(): void{
  }

  getAllCompanyUsers(){
    this.http.get("http://127.0.0.1:8000/api/companyUsers").subscribe((resultData:any)=>{
      this.isResultLoaded = true;
      console.log("result data",resultData);
      this.companyArray = resultData
    })
  }


  public error = '';
  public success = '';
  register(){
    this.error = '';
    this.success = '';
    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "mobile" : this.mobile,

    };
    this.http.post("http://127.0.0.1:8000/api/save",bodyData).subscribe((resultData:any)=>{
      this.isResultLoaded = true;
      alert("registered")
      console.log("result data1",resultData);
      this.getAllCompanyUsers();
      this.name='';
      this.address='';
      this.mobile= '' as any;
      this.success = "Registered successfully!";
      console.log("bbbbb",resultData)
    },
    (error) => {
      this.handleError(error);
    }
    )

  }

  private handleError(error: any) {
    this.error = error.error.message;
    console.error('Error occurred:', error);
  }



  setUpdate(data:any){
    this.name = data.name;
    this.address= data.address;
    this.mobile=data.mobile;
    this.currentCompanyID= data.id;
  }

  UpdateRecords(){
    this.error = '';
    this.success = '';
    let bodyData={
      "name" : this.name,
      "address" : this.address,
      "mobile" : this.mobile,
    }
    this.http.put("http://127.0.0.1:8000/api/update"+ "/" + this.currentCompanyID,bodyData).subscribe((resultData:any)=>{
      this.isResultLoaded = true;
      alert("Updated")
      console.log("result data",resultData);
      this.getAllCompanyUsers();
      this.name='';
      this.address='';
      this.mobile= 0;
      this.success = "Updated successfully!";
    },
    (error) => {
      this.handleError(error);
    }
    )


  }


  save(){
    console.log('curnt id',this.currentCompanyID)
    if (this.currentCompanyID === null || this.currentCompanyID === '' || this.currentCompanyID === undefined) {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }


  setDelete(data:any){
    let bodyData={
      "name" : this.name,
      "address" : this.address,
      "mobile" : this.mobile,
    }
    this.http.delete("http://127.0.0.1:8000/api/delete"+ "/" + data.id).subscribe((resultData:any)=>{

      alert("Deleted")
      console.log("result data",resultData);
      this.getAllCompanyUsers();
      this.name='';
      this.address='';
      this.mobile= 0;
    })
  }


}

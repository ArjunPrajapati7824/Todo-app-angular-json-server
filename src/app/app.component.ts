import { Component } from '@angular/core';
import {ServiceService} from './services/service.service'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';

  todoList:any[]=[];

  constructor(private api : ServiceService){
  this.getData()
  }

  inputClear=''//used for make empty field after data added
  

  postData(data:any){

    let val=Object.values(data)

    if(val[0]==''){//check user fill form then click on add button or not if form blank then it will return error
      Swal.fire({
        title:"Error",
        text:"Fill data",
        icon:'error'
      })    
    }else{
      this.api.postDataApi(data).subscribe((result)=>{
        Swal.fire({
          title:"Congrates",
          text:"Data Successfully Added",
          icon:'success'
        })
        this.inputClear=''
        this.getData()
      })
    
    }
      
   
  }

  getData(){//get all data from json server
    this.api.getDataApi().subscribe((result:any)=>{
      this.todoList=result
    })

  }

  deleteData(id :any){//delete data from particular id
    Swal.fire({//swal is an object of sweetalert 
      title:"Delete",
      text:"Are you sure ?",
      showCancelButton:true,
      confirmButtonAriaLabel:"Yes",
      cancelButtonAriaLabel:"No"
    }).then((result)=>{
      if(result.value){
        this.api.deleteDataApi(id).subscribe((result)=>{
          Swal.fire({
            icon:"success",
            title:"Delete",
            text:"Data successfully Deleted"
          })
          console.warn("data Deleted");
          this.getData()
        })
      }else
      {
        Swal.fire({
          icon:"success",
          text:"Your data safe"
        })

      }
    })
    

  }


  tmpData:any=''//for set data on form while user clicked on update button
  updateId:any=0
  updateIdcheck=false
  updategetData(id:any){
      this.api.updategetDataApi(id).subscribe((result)=>{
        console.log(result)

        console.log("click on update",result)
        this.tmpData=result
        this.updateId=id//store id for use in next function
        this.updateIdcheck=true//if value true then nd only thieb user can show the form while user clicked on edit button
      })
  }

  updateData(data:any){//update data of particular user
      this.api.updateDataApi(this.updateId,data).subscribe((result)=>{
        Swal.fire({
          title:"Congrates",
          text:"Data Successfully updated",
          icon:'success'
          
        })
    this.getData()

      })
  }

 
}

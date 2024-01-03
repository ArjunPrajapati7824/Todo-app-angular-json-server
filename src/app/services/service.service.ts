import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient) { }

  url=" http://localhost:3000/todo"

  getDataApi(){//Api for get all data froom json server
    return this.http.get(this.url)
  }

  postDataApi(data:any){//api for post data on server
    return this.http.post(this.url,data)
  }

  deleteDataApi(id:any){//api for deletee data from server
    const deleteId=`${this.url}/${id}`
    return this.http.delete(deleteId,id)
  }

  updategetDataApi(id:any){//api for get particular data using given id
    const updateId=`${this.url}/${id}`
    console.log(updateId)
    return this.http.get(updateId)
  }


  updateDataApi(id:any,data:any){//api for update data of particular id using put method
    const updateIdData=`${this.url}/${id}`
    return this.http.put(updateIdData,data)
  }

}

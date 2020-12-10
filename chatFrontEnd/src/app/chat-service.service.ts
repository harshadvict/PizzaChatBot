import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private http :HttpClient) { }

  communicate(question:any):any{
    console.log(question);
    return this.http.get("http://localhost:3000/chatbot//api/v1/"+question);
  }

  placeOrder(phoneNumber:any,name:any,pizzaName:any,address:any,orderId:any,crustName:any,topingName:any,cheeseName:any,totalAmount:any,img:any){
    console.log("in service function");
    const params={
      phoneNumber:phoneNumber,
      name:name,
      pizzaName:pizzaName,
      crustName:crustName,
      topingName:topingName,
      cheeseName:cheeseName,
      totalAmount:totalAmount,
      img:img,
      address:address,
      orderId:orderId,
      status:"will be delivered in 30 mins"
  }
    return this.http.post("http://localhost:3000/chatbot/api/v1/createOrder",params);
  }

  checkOrderStatus(OrderId:any){
    console.log("to check order status");
    return this.http.get("http://localhost:3000/chatbot/api/v1/orderStatus/"+OrderId);
  }

  cancelOrder(OrderId:any){
    console.log("to cancel order");
    return this.http.get("http://localhost:3000/chatbot/api/v1/cancelOrder/"+OrderId);
  }

  PizzaCardsList(Type:any){
    console.log("fetching all the pizza list");
    return this.http.get("http://localhost:3000/chatbot/api/v1/showPizzaInCard/"+Type);
  }

}

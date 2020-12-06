import { Component, OnInit } from '@angular/core';

import { ChatServiceService } from '../chat-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  //iam chengak
  question: any = "greeting";
  test: any;
  welcome: boolean = true;

  //pizza and user detail variable
  pizzaList: boolean = false;
  pizzaName: any;
  Name: any;
  phoneNumber: number;
  address: any;
  orderId: any;
  flag: number = 1;
  //----------end-------------------


  //check order status related variable
  CheckOrderStatusFlag: boolean = false;
  OrderStatusResponse: any;
  count: number = 0;
  //---------------end-------------------

  //variable for need help part
  need_help: boolean = false;
  //--------------------end-----------

  constructor(private chatService: ChatServiceService) { }

  ngOnInit(): void {
    this.chatCommunicate(this.question);

    window.setInterval(()=>{
      this.updateScroll();
    },1000);
  }


  //function to communicate the api to get the particular response
  chatCommunicate(question: any) {
    this.chatService.communicate(question).subscribe(data => {
      this.test = data;
      console.log("its running");
      console.log(this.test);
      if (this.welcome == true) {
        this.chatWelcome();
      }
      else {
        console.log(question);
        this.chatbotResponse()
      }
    })
  }

  chatbotResponse() {
    const app = document.getElementById("chatBox");

    const maindiv = document.createElement("div");
    maindiv.id = "maindiv";
    app.appendChild(maindiv);
    const img = document.createElement("img");
    img.src = "../../assets/robot (1).png";
    img.className = "botIcon";
    maindiv.appendChild(img);
    console.log(this.test);
    var chatrespObj: string = this.test.response[0].answer;

    //removing the unwanted data from the string
    chatrespObj = chatrespObj.replace('[', '');
    chatrespObj = chatrespObj.replace(']', '');

    //spliting the string and store it in the array 
    var resArray = chatrespObj.split(",");
    //iterating over the array
    if (resArray != null) {
      console.log("check");
      console.log(resArray);
      console.log(resArray.length);

      //chat response div
      const chatdiv = document.createElement("div");
      chatdiv.id = "chatdiv";
      maindiv.appendChild(chatdiv);

      //--------------chat response div-------

      for (let i = 0; i < resArray.length; i++) {
        if (i == 0) {
          const p = document.createElement("p");
          p.textContent = resArray[i];
          p.className = "botResponseCss";
          chatdiv.appendChild(p);
          console.log(resArray[i]);
          if (resArray[i] == " List of the pizza") {
            console.log(resArray[i]);
            console.log("if is triggering");
            this.pizzaList = true;
          }
          if (resArray[i] == "Please enter your Order Id") {
            console.log(resArray[i]);
            this.CheckOrderStatusFlag = true;

          }

        }
        else {
          if (resArray[i] == "Complain about quality and service" || resArray[i] == "About Refund") {
            this.need_help = true;
          }
          const button = document.createElement("button");
          button.innerHTML = resArray[i];
          button.id = resArray[i] + i.toString();
          button.className = "botResponseOption";
          button.addEventListener("click", () => {
            this.chatUserRequestOption(button.id);
          });
          chatdiv.appendChild(button);

        }
      }
    }
    console.log(this.test);
    console.log(this.test.response[0].reload);
    if (this.test.response[0].reload == "true") {
      setTimeout(this.reload,9000);
     
    }
  }

  //for reloading the the bot
  reload(){
    window.location.reload();
  }
  chatUserRequest(question: any) {
    const app = document.getElementById("chatBox");
    //chat response div
    const userchatdiv = document.createElement("div");
    userchatdiv.id = "userchatdiv";
    app.appendChild(userchatdiv);
    //--------------chat response div-------
    const img = document.createElement("img");
    img.src = "../../assets/user.png"
    img.className = "userIcon";
    userchatdiv.appendChild(img);
    const p = document.createElement("p");
    p.textContent = question;
    p.className = "userResponseCss";
    userchatdiv.appendChild(p);
    console.log(question);
    if (this.CheckOrderStatusFlag == true || this.need_help == true) {
      this.CheckOrderSatus(question);
    }
    else {
      if (this.pizzaList == true && this.flag == 1) {
        this.Name = question;
        this.flag = this.flag + 1;
        this.takeOrderPhone();
      }
      else if (this.pizzaList == true && this.flag == 2) {
        this.phoneNumber = question;
        this.flag = this.flag + 1;
        this.takeOrderAddress();
      }
      else if (this.pizzaList == true && this.flag == 3) {
        this.address = question;
        this.orderCompleted();
        console.log(this.Name);
        console.log(this.address);
        console.log(this.phoneNumber);
        console.log(this.pizzaName);
      }
      else {
        this.chatCommunicate(question);
      }
    }
  }

  //function to be trigger after the option is hit

  chatUserRequestOption(id: any) {

    //part to take the order the pizza
    if (this.pizzaList == true) {
      //triggering function to take the order
      this.takeOrderName(id);
    }
    else {
      const app = document.getElementById("chatBox");
      //chat response div
      const userchatdiv = document.createElement("div");
      userchatdiv.id = "userchatdiv";
      app.appendChild(userchatdiv);
      //--------------chat response div-------
      const img = document.createElement("img");
      img.src = "../../assets/user.png"
      img.className = "userIcon";
      userchatdiv.appendChild(img);
      const p = document.createElement("p");
      p.textContent = document.getElementById(id).innerHTML;
      p.className = "userResponseCss";
      userchatdiv.appendChild(p);
      console.log(document.getElementById(id).innerHTML);
      if (id == "cancel_order") {
        this.cancelOrder();
      }
      else {
        this.chatCommunicate(document.getElementById(id).innerHTML);
      }
    }
  }

  //method to take the order
  takeOrderName(id: any) {

    this.pizzaName = document.getElementById(id).innerHTML;
    const app = document.getElementById("chatBox");


    const maindiv = document.createElement("div");
    maindiv.id = "maindiv";
    app.appendChild(maindiv);
    const img = document.createElement("img");
    img.src = "../../assets/robot (1).png";
    img.className = "botIcon";
    maindiv.appendChild(img);

    const p = document.createElement("p");
    p.className = "botResponseCss";
    p.textContent = "Please enter your Name";
    maindiv.appendChild(p);

  }

  takeOrderPhone() {
    const app = document.getElementById("chatBox");


    const maindiv = document.createElement("div");
    maindiv.id = "maindiv";
    app.appendChild(maindiv);
    const img = document.createElement("img");
    img.src = "../../assets/robot (1).png";
    img.className = "botIcon";
    maindiv.appendChild(img);

    const p = document.createElement("p");
    p.className = "botResponseCss";
    p.textContent = "Please enter your phone no";
    maindiv.appendChild(p);
  }
  takeOrderAddress() {
    const app = document.getElementById("chatBox");


    const maindiv = document.createElement("div");
    maindiv.id = "maindiv";
    app.appendChild(maindiv);
    const img = document.createElement("img");
    img.src = "../../assets/robot (1).png";
    img.className = "botIcon";
    maindiv.appendChild(img);


    const p = document.createElement("p");
    p.className = "botResponseCss";
    p.textContent = "Please enter your address";
    maindiv.appendChild(p);
  }

  chatWelcome() {
    this.welcome = false;
    this.chatbotResponse();
  }

  orderCompleted() {
    this.orderId = 'ORD' + Math.floor(Math.random() * 1000);
    this.chatService.placeOrder(this.phoneNumber, this.Name, this.pizzaName, this.address, this.orderId).subscribe(data => {
      console.log(data);
      this.orderThanks();
    })

  }

  orderThanks() {
    const app = document.getElementById("chatBox");

    const maindiv = document.createElement("div");
    maindiv.id = "maindiv";
    app.appendChild(maindiv);
    const img = document.createElement("img");
    img.src = "../../assets/robot (1).png";
    img.className = "botIcon";
    maindiv.appendChild(img);


    const div = document.createElement("div");
    div.id = "OrderCards";
    div.className = "card";
    maindiv.appendChild(div);

    const cardId = document.getElementById("OrderCards");
    const img1 = document.createElement("img");
    img1.className = "cardImg";
    img1.src = "../../assets/check.png"
    cardId.appendChild(img1);



    const p0 = document.createElement("p");
    p0.textContent = "Order Placed Sucessfully!!";
    cardId.appendChild(p0);

    const p3 = document.createElement("p");
    p3.textContent = "Your Order Id:-" + this.orderId;
    cardId.appendChild(p3);

    const p = document.createElement("p");
    p.textContent = "Pizza:-" + this.pizzaName;
    cardId.appendChild(p);

    const p1 = document.createElement("p");
    p1.textContent = "Number:-" + this.phoneNumber.toString();
    cardId.appendChild(p1);

    const p2 = document.createElement("p");
    p2.textContent = "Delivery Address:-" + this.address;
    cardId.appendChild(p2);
  }

  //function to check order status
  CheckOrderSatus(orderId: any) {
    this.chatService.checkOrderStatus(orderId).subscribe(data => {
      this.OrderStatusResponse = data;
      console.log(data);
      if (this.OrderStatusResponse.response.length == 1) {
        const app = document.getElementById("chatBox");

        const maindiv = document.createElement("div");
        maindiv.id = "maindiv";
        app.appendChild(maindiv);
        const img = document.createElement("img");
        img.src = "../../assets/robot (1).png";
        img.className = "botIcon";
        maindiv.appendChild(img);

        const chatdiv = document.createElement("div");
        chatdiv.id = "chatdiv";
        maindiv.appendChild(chatdiv);
        if (this.need_help == true) {
          const pHelp = document.createElement("p");
          pHelp.textContent = "Thanks " + this.OrderStatusResponse.response[0].name;
          pHelp.className = "botResponseCss";
          chatdiv.appendChild(pHelp);
          this.chatCommunicate("complain");
        }
        else {
          const pHelp = document.createElement("p");
          pHelp.textContent = "Thanks " + this.OrderStatusResponse.response[0].name + " ,How can i help you?"
          pHelp.className = "botResponseCss";
          chatdiv.appendChild(pHelp);

          //card for order status


          const div = document.createElement("div");
          div.id = "OrderCards";
          div.className = "card";
          chatdiv.appendChild(div);

          const cardId = document.getElementById("OrderCards");
          const p0 = document.createElement("p");
          p0.textContent = "Your Order " + this.OrderStatusResponse.response[0].status;
          cardId.appendChild(p0);

          const p3 = document.createElement("p");
          p3.textContent = "Your Order Id:-" + this.OrderStatusResponse.response[0].orderId;
          cardId.appendChild(p3);

          const p = document.createElement("p");
          p.textContent = "Pizza:-" + this.OrderStatusResponse.response[0].pizzaName;
          cardId.appendChild(p);

          const p1 = document.createElement("p");
          p1.textContent = "Number:-" + this.OrderStatusResponse.response[0].phoneNumber;
          cardId.appendChild(p1);

          const p2 = document.createElement("p");
          p2.textContent = "Delivery Address:-" + this.OrderStatusResponse.response[0].address;
          cardId.appendChild(p2);

          if (this.OrderStatusResponse.response[0].status != "is cancelled") {
            const button = document.createElement("button");
            button.innerHTML = "Cancel Order";
            button.id = "cancel_order";
            button.className = "botResponseOption";
            button.addEventListener("click", () => {
              this.chatUserRequestOption(button.id);
            });
            chatdiv.appendChild(button);
          }
        }
      }
      else {
        if (this.count < 2) {
          const app = document.getElementById("chatBox");

          const maindiv = document.createElement("div");
          maindiv.id = "maindiv";
          app.appendChild(maindiv);
          const img = document.createElement("img");
          img.src = "../../assets/robot (1).png";
          img.className = "botIcon";
          maindiv.appendChild(img);

          const chatdiv = document.createElement("div");
          chatdiv.id = "chatdiv";
          maindiv.appendChild(chatdiv);

          const p = document.createElement("p");
          p.textContent = "Sorry,Please check and re-enter your OrderId"
          p.className = "botResponseCss";
          chatdiv.appendChild(p);
          this.count = this.count + 1;
        }
        else {
          const app = document.getElementById("chatBox");

          const maindiv = document.createElement("div");
          maindiv.id = "maindiv";
          app.appendChild(maindiv);
          const img = document.createElement("img");
          img.src = "../../assets/robot (1).png";
          img.className = "botIcon";
          maindiv.appendChild(img);

          const chatdiv = document.createElement("div");
          chatdiv.id = "chatdiv";
          maindiv.appendChild(chatdiv);

          const p = document.createElement("p");
          p.textContent = "Sorry,I think you have not placed order with us";
          p.className = "botResponseCss";
          const p1 = document.createElement("p");
          p1.textContent = "For more queries please contact customer care";
          p1.className = "botResponseCss";

          const p2 = document.createElement("p");
          p2.textContent = "customer care no:- 91-7970466639";
          p2.className = "botResponseCss";
          chatdiv.appendChild(p);
          chatdiv.appendChild(p1);
          chatdiv.appendChild(p2);
        }
      }
    })
  }

  cancelOrder() {
    this.chatService.cancelOrder(this.OrderStatusResponse.response[0].orderId).subscribe(data => {
      console.log(data);
      this.chatCommunicate("Cancel Order");
    });
  }


  //function to be trigger to keep the scroll bar at the last added element
  updateScroll(){
    const id=document.getElementById("chatContainer");
    id.scrollTop = id.scrollHeight;
  }
}

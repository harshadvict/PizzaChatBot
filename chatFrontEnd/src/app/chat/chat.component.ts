import { Component, OnInit, ɵConsole } from '@angular/core';

import { ChatServiceService } from '../chat-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  question: any = "greeting";
  test: any;
  welcome: boolean = true;

  //pizza and user detail variable
  bookingOrder:boolean=false;
  HowManyPizza: boolean = false;
  NoOfPizza: number = 0;
  pizzaArray: any;
  pizzaType: any;
  pizzaList: boolean = false;
  pizzaName: any;
  cheeseName: string = "Not added";
  crustName:string="Not added";
  topings:string="Not added";
  Name: any;
  phoneNumber: number;
  address: any;
  orderId: any;
  flag: number = 1;
  customizationCrust: boolean = false;
  customizationChesse:boolean=false;
  customizationTopings:boolean=false;
  //----------end-------------------


  //check order status related variable
  CheckOrderStatusFlag: boolean = false;
  OrderStatusResponse: any;
  count: number = 0;
  //---------------end-------------------

  //variable for need help part
  need_help: boolean = false;
  totalAmount: any;
  img: any;
  //--------------------end-----------

  constructor(private chatService: ChatServiceService) { }

  ngOnInit(): void {
    this.chatCommunicate(this.question);
    window.setInterval(() => {
      this.updateScroll();
    }, 1000);
  }


  //function to communicate the api to get the particular response
  chatCommunicate(question: any) {
    if(question=="Crust Type"){
      this.customizationCrust=true;
    }
    if(question=="Add extra Cheese"){
      this.customizationChesse=true;
    }
    if(question=="Toppings"){
      this.customizationTopings=true;
    }
    this.chatService.communicate(question).subscribe(data => {
      this.test = data;
      console.log("its running");
      console.log(this.test);
      if (this.welcome == true) {
        this.chatWelcome();
      }
      else {
        if (this.test.response[0].question == "veg") {
          this.pizzaType = "veg";
        }
        if (this.test.response[0].question == "non-veg") {
          this.pizzaType = "Non-Veg";
        }
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
          if (resArray[i] == "Please choose pizza") {
            console.log(resArray[i]);
            console.log("if is triggering");
            this.pizzaList = true;
            this.displayPizzaCards();
            break;
          }
          if (resArray[i] == "Please enter your Order Id") {
            console.log(resArray[i]);
            this.CheckOrderStatusFlag = true;

          }
          if (resArray[i] == "How many do you want?") {
            console.log(resArray[i]);
            this.HowManyPizza = true;
          }
          if(resArray[i].includes("Extra")){
            this.cheeseName="Extra Cheese";
            this.anyThingExtra();
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
          if (this.HowManyPizza == true) {
            button.addEventListener("click", () => {
              this.HowMany(document.getElementById(button.id).innerHTML);
            });
          }
          else if(this.customizationCrust==true){
            button.addEventListener("click", () => {
              this.addCrust(document.getElementById(button.id).innerHTML);
            });
          } 
          else if(this.customizationTopings==true){
            button.addEventListener("click", () => {
              this.addTopings(document.getElementById(button.id).innerHTML);
            });
          }
          else {
            button.addEventListener("click", () => {
              this.chatUserRequestOption(button.id);
            });
          }
          chatdiv.appendChild(button);

        }
      }
    }
    console.log(this.test);
    console.log(this.test.response[0].reload);
    if (this.test.response[0].reload == "true") {
      setTimeout(this.reload, 9000);

    }
  }





  //this function display the pizza in the form of the card
  displayPizzaCards() {
    this.chatService.PizzaCardsList(this.pizzaType).subscribe(data => {
      console.log(data);
      this.pizzaArray = data;
      const app = document.getElementById("chatBox");
      const maindiv = document.createElement("div");
      maindiv.id = "cardPizzaDiv";
      app.appendChild(maindiv);
      for (let i = 0; i < this.pizzaArray.response.length; i++) {
        console.log(this.pizzaArray.response[i]);
        const cardDiv = document.createElement("div");
        cardDiv.id = "internalPizzaCardDiv";
        maindiv.appendChild(cardDiv);
        const pizzaImg = document.createElement("img");
        pizzaImg.src = this.pizzaArray.response[i].pizza_pic;
        pizzaImg.id = "pizzaImage"+i;
        pizzaImg.className="pizzaImage";
        cardDiv.appendChild(pizzaImg);
        const pname = document.createElement("p");
        pname.id = "pizzaName" + i;
        pname.className = "pizzaName";
        pname.innerText = this.pizzaArray.response[i].pizza_name;
        cardDiv.appendChild(pname);

        const hr=document.createElement("hr");
        hr.id="hr1";
        cardDiv.appendChild(hr);

        const pabout = document.createElement("p");
        pabout.id = "pizzaAbout";
        pabout.innerText = this.pizzaArray.response[i].special;
        cardDiv.appendChild(pabout);

        const rateDiv=document.createElement("div");
        rateDiv.id="rateDiv";
        cardDiv.appendChild(rateDiv);

        const prs = document.createElement("p");
        prs.id = "pizzarate";
        prs.innerText ="Rs:-";
        rateDiv.appendChild(prs);


        const prate = document.createElement("p");
        prate.id = "pizzarate"+i;
        prate.innerText =this.pizzaArray.response[i].rate;
        rateDiv.appendChild(prate);

        const selectButton = document.createElement("button");
        selectButton.id = "pizzaSelectButton";
        selectButton.textContent="Select";
        selectButton.addEventListener("click", () => {
          this.pizzaNameStoring(pname.id,prate.id,pizzaImg.src);
        });
        cardDiv.appendChild(selectButton);
      }
    })

  }



  //for reloading the the bot
  reload() {
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
    else if(question.includes("who") || question.includes("you")){
      this.chatCommunicate("about");
      setTimeout(()=>{this.ngOnInit()},1000);
    }
    else {
      if (this.bookingOrder == true && this.flag == 1) {
        this.Name = question;
        this.flag = this.flag + 1;
        this.takeOrderPhone();
      }
      else if (this.bookingOrder == true && this.flag == 2) {
        this.phoneNumber = question;
        this.flag = this.flag + 1;
        this.takeOrderAddress();
      }
      else if (this.bookingOrder == true && this.flag == 3) {
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
      this.userConversastion(id);
      this.pizzaList = false;
      this.chatCommunicate("customization");
    }
    else {
      console.log(id);
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
  takeOrderName() {
    this.chatCommunicate("detail info");
    this.bookingOrder=true;
   // this.pizzaName = document.getElementById(id).innerHTML;
   setTimeout(()=>{
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
   },3000);
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
    this.chatService.placeOrder(this.phoneNumber, this.Name, this.pizzaName, this.address, this.orderId,this.crustName,this.topings,this.cheeseName,this.totalAmount,this.img).subscribe(data => {
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

    const hr=document.createElement("hr");
    hr.id="hr";
    cardId.appendChild(hr);
    
    const detailCard=document.createElement("div");
    detailCard.id="detailcard";
    cardId.appendChild(detailCard);

    const p4 = document.createElement("p");
    p4.textContent = "Order Details";
    detailCard.appendChild(p4);

    const p5 = document.createElement("p");
    p5.textContent = "Hi "+this.Name+",";
    detailCard.appendChild(p5);

    const p3 = document.createElement("p");
    p3.textContent = "Your Order Id:-" + this.orderId;
    detailCard.appendChild(p3);

    const p = document.createElement("p");
    p.textContent = "Pizza:-" + this.pizzaName;
    detailCard.appendChild(p);

    const p6 = document.createElement("p");
    p6.textContent = "Add on:-" + this.crustName+","+this.topings+","+this.cheeseName;
    detailCard.appendChild(p6);

    const p7 = document.createElement("p");
    p7.textContent = "Paid amount:-" +" Rs." +this.totalAmount;
    detailCard.appendChild(p7);

    const p1 = document.createElement("p");
    p1.textContent = "Number:-" + this.phoneNumber.toString();
    detailCard.appendChild(p1);

    const p2 = document.createElement("p");
    p2.textContent = "Delivery Address:-" + this.address;
    detailCard.appendChild(p2);
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
  updateScroll() {
    const id = document.getElementById("chatContainer");
    id.scrollTop = id.scrollHeight;
  }

  //used for pizzabooking conversastion on base of id
  userConversastion(id: any) {
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
  }

   //used for pizzabooking conversastion on base of value
   userConversastionValue(value: any) {
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
    p.textContent = value;
    p.className = "userResponseCss";
    userchatdiv.appendChild(p);
    console.log(value);
  }

  //this function is use to store the quantity of the pizza
  HowMany(quantity: any) {
    this.NoOfPizza = quantity;
    console.log("no of pizza:-"+this.NoOfPizza);
    console.log("pizza cost:-"+this.totalAmount);
    this.totalAmount=parseInt(this.totalAmount)*this.NoOfPizza;
    console.log("Total Amount:"+this.totalAmount);
    console.log(quantity);
    this.userConversastionValue(quantity)
    this.takeOrderName();
  }

  //this function is use to store the name of the pizzza
  pizzaNameStoring(id:any,rateId:any,imgsrc:any){
    const pizzaDiv=document.getElementById("cardPizzaDiv");
    pizzaDiv.style.display="none";
    this.pizzaName=document.getElementById(id).innerHTML;
    console.log("Pizza name:"+this.pizzaName);
    this.totalAmount=document.getElementById(rateId).innerHTML;
    console.log("pizza rate:"+this.totalAmount);
    this.img=imgsrc
    console.log("Image:"+this.img);
    this.chatUserRequestOption(id);
  }

  //method to add crust
  addCrust(crust: string) {
    this.crustName=crust;
    this.userConversastionValue(crust);
    this.customizationCrust=false;
    console.log("crust name:"+this.crustName);
    this.anyThingExtra();
  }
  addTopings(topings: string) {
    this.topings=topings;
    this.userConversastionValue(topings);
    this.customizationTopings=false;
    console.log("toping name:"+this.topings);
    this.anyThingExtra();
  }

  anyThingExtra(){
    this.chatCommunicate("repeat question");
  }
}

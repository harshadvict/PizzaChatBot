(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+XlM":
/*!****************************************!*\
  !*** ./src/app/chat/chat.component.ts ***!
  \****************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _chat_service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../chat-service.service */ "BJqi");



class ChatComponent {
    //--------------------end-----------
    constructor(chatService) {
        this.chatService = chatService;
        this.question = "greeting";
        this.welcome = true;
        //pizza and user detail variable
        this.pizzaList = false;
        this.flag = 1;
        //----------end-------------------
        //check order status related variable
        this.CheckOrderStatusFlag = false;
        this.count = 0;
        //---------------end-------------------
        //variable for need help part
        this.need_help = false;
    }
    ngOnInit() {
        this.chatCommunicate(this.question);
        window.setInterval(() => {
            this.updateScroll();
        }, 1000);
    }
    //function to communicate the api to get the particular response
    chatCommunicate(question) {
        this.chatService.communicate(question).subscribe(data => {
            this.test = data;
            console.log("its running");
            console.log(this.test);
            if (this.welcome == true) {
                this.chatWelcome();
            }
            else {
                console.log(question);
                this.chatbotResponse();
            }
        });
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
        var chatrespObj = this.test.response[0].answer;
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
            setTimeout(this.reload, 9000);
        }
    }
    //for reloading the the bot
    reload() {
        window.location.reload();
    }
    chatUserRequest(question) {
        const app = document.getElementById("chatBox");
        //chat response div
        const userchatdiv = document.createElement("div");
        userchatdiv.id = "userchatdiv";
        app.appendChild(userchatdiv);
        //--------------chat response div-------
        const img = document.createElement("img");
        img.src = "../../assets/user.png";
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
    chatUserRequestOption(id) {
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
            img.src = "../../assets/user.png";
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
    takeOrderName(id) {
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
        });
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
        img1.src = "../../assets/check.png";
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
    CheckOrderSatus(orderId) {
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
                    pHelp.textContent = "Thanks " + this.OrderStatusResponse.response[0].name + " ,How can i help you?";
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
                    p.textContent = "Sorry,Please check and re-enter your OrderId";
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
        });
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
}
ChatComponent.ɵfac = function ChatComponent_Factory(t) { return new (t || ChatComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_chat_service_service__WEBPACK_IMPORTED_MODULE_1__["ChatServiceService"])); };
ChatComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ChatComponent, selectors: [["app-chat"]], decls: 10, vars: 0, consts: [[1, "chatbotheading"], ["src", "../../assets/robot (2).png", "alt", "", 1, "botimg"], [1, "botname"], ["id", "chatContainer", 1, "chatContainer"], ["id", "chatBox", 1, "chatBox"], [1, "responseContainer"], ["type", "text", "placeholder", "   please enter response...", 1, "responseField"], ["question", ""], ["src", "../../assets/enter.png", "alt", "button-image", 1, "responseButton", 3, "click"]], template: function ChatComponent_Template(rf, ctx) { if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Pizza Chat Bot");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "input", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ChatComponent_Template_img_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8); return ctx.chatUserRequest(_r0.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["@import url('https://fonts.googleapis.com/css2?family=Nerko+One&display=swap');\r\n.chatContainer[_ngcontent-%COMP%]{\r\n    border: 2px solid #1A1A1D;\r\n    border-radius: 20px;\r\n    background-color:#1A1A1D;\r\n    height: 500px;\r\n    width: 600px;\r\n    position: relative;\r\n    overflow: scroll;\r\n}\r\n[_ngcontent-%COMP%]::-webkit-scrollbar {\r\n  width: 0px;\r\n  background: transparent;\r\n}\r\n.responseContainer[_ngcontent-%COMP%]{\r\ndisplay: flex;\r\nflex-flow: row;\r\n}\r\n.responseField[_ngcontent-%COMP%]{\r\n  height: 30px;\r\n  width: 520px;\r\n  border: 2px solid black;\r\n  border-radius: 20px;\r\n  margin-top: 3px;\r\n  padding-left: 10px;\r\n}\r\ninput[_ngcontent-%COMP%]:focus{\r\n  outline: none;\r\n}\r\n.responseButton[_ngcontent-%COMP%]{\r\n    margin-left: 10px;\r\n    margin-top: 3px;\r\n    height: 35px;\r\n    width: 35px;\r\n}\r\n.chatBox[_ngcontent-%COMP%]{\r\n  display: flex;\r\n  flex-flow: column;\r\n  justify-content: space-between;\r\n}\r\n.chatbotheading[_ngcontent-%COMP%]{\r\n  border: 1px solid #DC3D24;\r\n  height: 70px;\r\n  width: 600px;\r\n  display: flex;\r\n  flex-direction: row;\r\n  border-radius: 20px;\r\n  background-color: #DC3D24;\r\n}\r\n.botname[_ngcontent-%COMP%]{\r\n  padding-left: 30px;\r\n  font-size: 30px;\r\n  margin-top:10px;\r\n  font-family: 'Nerko One', cursive;\r\n  color: white;\r\n}\r\n.botimg[_ngcontent-%COMP%]{\r\n  margin-left: 10px;\r\n  width: 64px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2hhdC9jaGF0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOEVBQThFO0FBQzlFO0lBQ0kseUJBQXlCO0lBQ3pCLG1CQUFtQjtJQUNuQix3QkFBd0I7SUFDeEIsYUFBYTtJQUNiLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsZ0JBQWdCO0FBQ3BCO0FBQ0E7RUFDRSxVQUFVO0VBQ1YsdUJBQXVCO0FBQ3pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsY0FBYztBQUNkO0FBQ0E7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsYUFBYTtBQUNmO0FBQ0E7SUFDSSxpQkFBaUI7SUFDakIsZUFBZTtJQUNmLFlBQVk7SUFDWixXQUFXO0FBQ2Y7QUFDQTtFQUNFLGFBQWE7RUFDYixpQkFBaUI7RUFDakIsOEJBQThCO0FBQ2hDO0FBQ0E7RUFDRSx5QkFBeUI7RUFDekIsWUFBWTtFQUNaLFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQix5QkFBeUI7QUFDM0I7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsZUFBZTtFQUNmLGlDQUFpQztFQUNqQyxZQUFZO0FBQ2Q7QUFDQTtFQUNFLGlCQUFpQjtFQUNqQixXQUFXO0FBQ2IiLCJmaWxlIjoic3JjL2FwcC9jaGF0L2NoYXQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU5lcmtvK09uZSZkaXNwbGF5PXN3YXAnKTtcclxuLmNoYXRDb250YWluZXJ7XHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjMUExQTFEO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IzFBMUExRDtcclxuICAgIGhlaWdodDogNTAwcHg7XHJcbiAgICB3aWR0aDogNjAwcHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBvdmVyZmxvdzogc2Nyb2xsO1xyXG59XHJcbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gIHdpZHRoOiAwcHg7XHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbn1cclxuLnJlc3BvbnNlQ29udGFpbmVye1xyXG5kaXNwbGF5OiBmbGV4O1xyXG5mbGV4LWZsb3c6IHJvdztcclxufVxyXG4ucmVzcG9uc2VGaWVsZHtcclxuICBoZWlnaHQ6IDMwcHg7XHJcbiAgd2lkdGg6IDUyMHB4O1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xyXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgbWFyZ2luLXRvcDogM3B4O1xyXG4gIHBhZGRpbmctbGVmdDogMTBweDtcclxufVxyXG5pbnB1dDpmb2N1c3tcclxuICBvdXRsaW5lOiBub25lO1xyXG59XHJcbi5yZXNwb25zZUJ1dHRvbntcclxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogM3B4O1xyXG4gICAgaGVpZ2h0OiAzNXB4O1xyXG4gICAgd2lkdGg6IDM1cHg7XHJcbn1cclxuLmNoYXRCb3h7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWZsb3c6IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuLmNoYXRib3RoZWFkaW5ne1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNEQzNEMjQ7XHJcbiAgaGVpZ2h0OiA3MHB4O1xyXG4gIHdpZHRoOiA2MDBweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREMzRDI0O1xyXG59XHJcbi5ib3RuYW1le1xyXG4gIHBhZGRpbmctbGVmdDogMzBweDtcclxuICBmb250LXNpemU6IDMwcHg7XHJcbiAgbWFyZ2luLXRvcDoxMHB4O1xyXG4gIGZvbnQtZmFtaWx5OiAnTmVya28gT25lJywgY3Vyc2l2ZTtcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuLmJvdGltZ3tcclxuICBtYXJnaW4tbGVmdDogMTBweDtcclxuICB3aWR0aDogNjRweDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChatComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-chat',
                templateUrl: './chat.component.html',
                styleUrls: ['./chat.component.css']
            }]
    }], function () { return [{ type: _chat_service_service__WEBPACK_IMPORTED_MODULE_1__["ChatServiceService"] }]; }, null); })();


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Prograd chatbot application\chatFrontEnd\src\main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "BJqi":
/*!*****************************************!*\
  !*** ./src/app/chat-service.service.ts ***!
  \*****************************************/
/*! exports provided: ChatServiceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatServiceService", function() { return ChatServiceService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



class ChatServiceService {
    constructor(http) {
        this.http = http;
    }
    communicate(question) {
        console.log(question);
        return this.http.get("chatbot//api/v1/" + question);
    }
    placeOrder(phoneNumber, name, pizzaName, address, orderId) {
        console.log("in service function");
        const params = {
            phoneNumber: phoneNumber,
            name: name,
            pizzaName: pizzaName,
            address: address,
            orderId: orderId,
            status: "will be delivered in 30 mins"
        };
        return this.http.post("chatbot/api/v1/createOrder", params);
    }
    checkOrderStatus(OrderId) {
        console.log("to check order status");
        return this.http.get("chatbot/api/v1/orderStatus/" + OrderId);
    }
    cancelOrder(OrderId) {
        console.log("to cancel order");
        return this.http.get("chatbot/api/v1/cancelOrder/" + OrderId);
    }
}
ChatServiceService.ɵfac = function ChatServiceService_Factory(t) { return new (t || ChatServiceService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
ChatServiceService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ChatServiceService, factory: ChatServiceService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChatServiceService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chat/chat.component */ "+XlM");



class AppComponent {
    constructor() {
        this.title = 'chatFrontEnd';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-chat");
    } }, directives: [_chat_chat_component__WEBPACK_IMPORTED_MODULE_1__["ChatComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chat/chat.component */ "+XlM");
/* harmony import */ var _chat_service_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chat-service.service */ "BJqi");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "tk/3");








class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [_chat_service_service__WEBPACK_IMPORTED_MODULE_5__["ChatServiceService"]], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _chat_chat_component__WEBPACK_IMPORTED_MODULE_4__["ChatComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _chat_chat_component__WEBPACK_IMPORTED_MODULE_4__["ChatComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"]
                ],
                providers: [_chat_service_service__WEBPACK_IMPORTED_MODULE_5__["ChatServiceService"]],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
# PizzaChatBot




 Developer Documentation(APIs/Modules)

Allowed HTTPs requests:

     PUT     : To create resource
     GET     : Get a resource or list of resource
Description Of Usual Server Responses:
     200 OK - the request was successful (some API calls may return 201 instead).
     404 Not Found - resource was not found.
     405 Method Not Allowed - requested method is not supported for resource
     400 Bad Request - the request could not be understood or was missing required parameters.
Endpoints:
  For conversation :-
  Request type :GET
   Params to be appended in request url:(Question or order)
   API URL:-https://whispering-oasis-38645.herokuapp.com/chatbot//api/v1/:question
   Sample API URL :-https://whispering-oasis-38645.herokuapp.com/chatbot//api/v1/Ordering%20pizza
For create order:-
Request type :POST
Params to be appended in body:-Sample params 
params=
{
      phoneNumber:"1234567891”,
      name:”Your name”,
      pizzaName:”pizzaName”,
      crustName:”crustName”,
      topingName:”topingName”,
      cheeseName:”cheeseName”,
      totalAmount:”totalAmount”,
      img:”img”,
      address:”address”,
      orderId:”orderId”,
      status:"will be delivered in 30 mins"
  }
    API URL:-https://whispering-oasis-38645.herokuapp.com/chatbot/api/v1/createOrder,{Params}
   Sample API URL :-https://whispering-oasis-38645.herokuapp.com/chatbot/api/v1/createOrder
	Payload:-
                              {
                                     address: "some place"
cheeseName: "Not added"
crustName: "Not added"
img: "https://whispering-oasis-38645.herokuapp.com/assets/Deluxe%20Veggie.jpg"
name: "raghu"
orderId: "ORD980"
phoneNumber: "1234567891"
pizzaName: "Deluxe Veggie"
status: "will be delivered in 30 mins"
topingName: "Not added"
totalAmount: 1400
}
  For pizza status :-
  Request type :GET
   Params to be appended in request url:(OrderId)
   API URL:-https://whispering-oasis-38645.herokuapp.com/chatbot/api/v1/orderStatus/:OrderId
   Sample API URL:- https://whispering-oasis-38645.herokuapp.com/chatbot/api/v1/orderStatus/ord980
  For cancelling pizza :-
  Request type :GET
   Params to be appended in request url:(OrderId)
   API URL:-https://whispering-oasis-38645.herokuapp.com/chatbot//api/v1/cancelOrder/:OrderId
   Sample API URL :-https://whispering-oasis-38645.herokuapp.com/chatbot//api/v1/cancelOrder/ord980
  For getting pizza list :-
  Request type :GET
   Params to be appended in request url:(Type)
   API URL:-https://whispering-oasis-38645.herokuapp.com/chatbot/api/v1/showPizzaInCard/:Type
   Sample API URL :-https://whispering-oasis-38645.herokuapp.com/chatbot/api/v1/showPizzaInCard/veg

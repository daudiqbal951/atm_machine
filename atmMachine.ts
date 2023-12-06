/*Develop a TS program that show the working of an ATM machine such

 - User should login by entering his/her unique account number and a secret PIN
- User can check account balance 
- User can withdraw money 
- User can check his/her previous transections in the current login
- User should be asked at the end of each function that if he/she wants to end transections or perform any other transections if the user choose more transections he/she must be shown all the options again and he / she can perform any transections.

In the current login means if user logged in and performed 5 transections he/she have an option to check these 5 transections
If he/she choosed to end the transections the data should be removed*/

import inquirer, { Answers, QuestionAnswer, QuestionCollection } from "inquirer";
interface accounts{
    "accountNumber":number,
    "pinCode":number,
    "balance":number,
};
var accounts:accounts[]=[
    {
        "accountNumber":12345,
        "pinCode":1234,
        "balance":19924
    },
    {
        "accountNumber":23456,
        "pinCode":2345,
        "balance":187692
    },
    {
        "accountNumber":34567,
        "pinCode":3456,
        "balance":1324113
    },
    {
        "accountNumber":45678,
        "pinCode":4567,
        "balance":2000
    },
    {
        "accountNumber":56789,
        "pinCode":5678,
        "balance":5000
    }
];
enum StartStop{
    Perform_Another_Transaction="Perform Another Transaction",
    End_Transaction="End Transaction"
};
enum Action {
    Check_Account_Balance="Check Account Balance",
    Withdraw_Money="Withdraw Money",
    Check_Previous_transaction="Check Previous Transactions"
};
var loginDetails:QuestionCollection[]=[{
    type:"number",
    name:"accountNumber",
    message:"Enter your account number:"
},
{
    type:"password",
    name:"pinCode",
    message:"Enter your 4-digit pin code:",
    mask: "*",
    validate(input){
        if(input.length==4){
            return true
        }
        return false
    }
}];
var action:QuestionCollection[]=[{
    type:"list",
    name:"action",
    message:"Please choose what you want to do",
    choices:[Action.Check_Account_Balance,Action.Withdraw_Money,Action.Check_Previous_transaction]
},
];
var startStop:QuestionCollection[]=[{
    type:"list",
    name:"startStop",
    message:"do want to make another transaction",
    choices:[StartStop.End_Transaction,StartStop.Perform_Another_Transaction]
},
];
var answer:Answers=await inquirer.prompt(loginDetails);
var logIn= accounts.find((account)=>{
    if(answer.accountNumber==account.accountNumber && answer.pinCode==account.pinCode){
        return account
    }
});
if (logIn){
    console.log("Welcome to your Account!");
    let transactionRecord:string[]=[];
    do{
        var choices:Answers=await inquirer.prompt(action);
        if(choices.action==Action.Check_Account_Balance){
            console.log(`Your account balance is ${logIn.balance}`)    
        };
        if(choices.action==Action.Withdraw_Money){
            var amount:Answers=await inquirer.prompt([{
                type:"number",
                name:"amount",
                message:"Please enter the amount:"
            }]);
            if(logIn.balance>=amount.amount){
                if(amount.amount%500==0){
                    logIn.balance=logIn.balance-amount.amount;
                    console.log(`Amount ${amount.amount} has been deducted from your account.\nYour new balance is ${logIn.balance}`);
                    transactionRecord.push(amount.amount + " has been transacted from your account");
                }
                else{
                    console.log(`Please enter amount in multiples of 500`)
            }    
            }
            else {
                console.log("You donot have sufficient funds!!")
            }
          
        }
        
        if(choices.action==Action.Check_Previous_transaction){
            console.log(transactionRecord)
        };
        var continueTransaction:Answers=await inquirer.prompt(startStop);
    } while(continueTransaction.startStop!= StartStop.End_Transaction) ;       
}
else{
    console.log("Incorrect Account Number or Pin Code")
};
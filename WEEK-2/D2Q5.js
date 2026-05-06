/*
2.OTP Countdown Simulator (Console App)
------------------------------------
        
        Simulate OTP sending flow in Node.js:
        
        Show “OTP Sent Successfully”
        
        Start 10-second countdown
        
        Allow resend only after countdown ends
*/

/*
console.log("OTP Sent Successfully");
setTimeout(()=>{
    console.log("You can resend OTP now")
},10000);
*/

console.log("OTP Sent Successfully")
seconds = 10;
let I=intervalId = setInterval(()=> {
    seconds--;
    console.log(`You can resend OTP in ${seconds} seconds`)
    if(seconds===0){
        console.log("Resend OTP")
        clearInterval(intervalId)
    }
})

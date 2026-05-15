//1st Question
const user = {
    id: 101,
    name: "Ravi",
    preferences: {
         theme: "dark",
         language: "en"
     }
};

// 1.Create a shallow copy of user
let CopyUser={...user}
// Change: name in the copied object,preferences.theme in the copied object,Log both original and copied objects,Observe what changes and what doesn’t
CopyUser.name = "Madhurima"
CopyUser.preferences.theme = "light"
console.log(user)
console.log(CopyUser)

//2nd Question
 const order = {
    orderId: "ORD1001",
    customer: {
        name: "Anita",
        address: {
        city: "Hyderabad",
        pincode: 500085
 }
},
items: [
 { product: "Laptop", price: 70000 }
]
};

// 1. Create a deep copy of order
let copyOrder = structuredClone(order)
//2. Modify in copied object: customer.address.city,items[0].price,Verify original object remains unchanged
copyOrder.customer.address.city = "Bangalore"
copyOrder.items[0].price = 75060
console.log(order)
console.log(copyOrder)

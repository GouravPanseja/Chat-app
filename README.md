The data Structures for storage for this app:

Two collections:
1. userChats
2. chats

userChats:- It is used to show the recent chats of a user ie people with whom the user has selected to chat. These all userChats appear in the sidebar in 'chats' component.

CREATION OF DOCUMENT FOR EACH USER IN THE USERCHATS
When the user is created , a document with id same as its 'uid' is created in the userChats collection. but is kept empty

UPDATING THE DOCUMENT FOR EACH USER IN USERCHATS
when a user searches for a user and selects it,its document in the userChats is updated with this structure

combinedId:{
    data: serverTimestamp(),
    userInfo{
        // info the user selected by the currentUser
        uid:
        email:
        photoURL:
    }
}

ACCESSING THE USERCHAT
When a user must visit the homepage he must see all his chats in the sidebar, therefore, we set a listener on this document of the document of user in userChat and access all the fields in the document.

Then the data obtained is converted into arrays of array
where each subarrays contains the currentUser's different chats in this format 

[  
    // key ,value
    [combinedId, { data :--- , userInfo:{---} } ] // 1st chat 
    [combinedId, { data :--- , userInfo:{---} } ] // 2nd chat
]








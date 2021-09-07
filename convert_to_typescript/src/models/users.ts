import {Users} from "../entity/users";
import { getRepository } from "typeorm";



export function queryUsers() {    
    let all = getRepository(Users).find();               
    console.log("Loaded users: ", all );  
console.log("Loaded users: ", all ); 

    return all;
}

export function queryUserByID(id : number) {
    let user= getRepository(Users).find( id );               
    console.log("Load 1 user: ", user );  
    return user;
}

export function queryUserByNamePassword( user : Users ) {
    // let data= getRepository(Users).find( { username: 'test1' , password :'1234' } );    
 
    let data= getRepository(Users).find( { username: user.id , password : user.password } );                         
    console.log("Load 1 user by name and password: ", data );  
    return user;
}

export async function addUser( user : Users ) {
    let insertUser =await getRepository(Users).insert( { username: user.id , password : user.password  , email: user.email  });
    console.log("insertUser from the db: ",  insertUser );
   
    return insertUser;
}

export async function deleteUserByID( user : Users ) {
    let result = await getRepository(Users).delete(  {  id: user.id   } );
    console.log("del result= " ,result);
     
    return result; 
}

export async function updateByID( user : Users ) {
    let result = await getRepository(Users).update(  {  id: user.id   }  , {username: user.username , password: user.password,  email: user.email } );
    console.log("del result= " ,result);
    
    let updateUser =  await getRepository(Users).findOne(user.id); 

    console.log("update user= " ,updateUser);

    return updateUser; 
}



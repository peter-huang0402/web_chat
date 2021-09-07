import "reflect-metadata";
import {createConnection} from "typeorm";
import {Users} from "./entity/users";
//import { serialize } from "class-transformer"; 
import { getRepository } from "typeorm";
import { queryUsers, queryUserByID, queryUserByNamePassword, addUser, deleteUserByID , updateByID } from "./models/users";




createConnection().then(async connection => {
    /*
    console.log("1. Inserting a new users into the database...");
    const users = new Users();
    users.username = "test2";
    users.password = "1234";
    users.email = "test2@gmail.com";
    await connection.manager.save(users);
    console.log("Saved a new user with id: " + users.id+" ,name="+users.username);

    console.log("Loading users from the database...");
    const alldata = await connection.manager.find(Users);
    console.log("Loaded users: ", alldata);    
    */




    console.log("3. Find a user...");
    let userRepository = connection.getRepository(Users);
    // await userRepository.save(users);
    // console.log("Users has been saved");


    let queryUser =await userRepository.find({select: ["username","email"] });
    let queryUser1 =await userRepository.find( { username: 'test1' , password :'1234' });
	console.log("queryUser from the db: ",  queryUser1 ); 


    let createUser =await userRepository.create( { username: 'test11' , password :'1234' , email:'test11@gmail.com' });
    console.log("createUser from the db: ",  createUser );
    
    /*
    let insertUser =await userRepository.insert( { username: 'test12' , password :'1234' , email:'test12@gmail.com' });
    console.log("insertUser from the db: ",  insertUser );
    */

    console.log( "1 hasId ,before save(), createUser= ", userRepository.hasId(createUser) ); 

    await userRepository.save(createUser);
    console.log( "2 hasId ,after save(), createUser= ", userRepository.hasId(createUser) ); 
        
    let result = await userRepository.delete(  {  username: 'test11'  ,  email:'test11@gmail.com'   } );
    console.log("del result= " ,result);


     result = await userRepository.update(  {  username: 'test99'} , {username: 'test100', email:'test100@gmail.com' } );
    console.log("update result= " ,result);





    let queryUser10 = getRepository(Users).findOne(3);
    console.log("findOne(3)= ",queryUser10); 




}).catch(error => console.log(error));

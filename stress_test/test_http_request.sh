#!/usr/bin/env bash


for i in {1..100}
do

   echo "start $i"
   curl http://localhost:3000/users/get &
   curl --header "Content-Type: application/json" --request POST  --data '{"username":"f_'$i'","password":"1234" , "email":"f_'$i'@gmail.com" }'  http://localhost:3000/users &
   echo "end $i"

   ##insert=$( curl --header "Content-Type: application/json" --request POST  --data '{"username":"a_'$i'","password":"1234" , "email":"a_'$i'@gmail.com" }'  http://localhost:3000/users & )
  ## echo "no.$i , return id=$insert"

done 

exit 0

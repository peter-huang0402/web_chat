#!/usr/bin/env bash

## manually key in
## wscat -c "ws://localhost:8080/ws?user=test1"
## {"op":"msg","payload":"test message","from":"test1"  }

for i in {1..1}
do
    for j in {1..3}
    do
        wscat -c "ws://localhost:8080/ws?user=a_$i"  -x '{"op":"msg","payload":"test message i='$i' ,j='$j' !!!","from":"a_'$i'"  }'  
    done 
done 

exit 0

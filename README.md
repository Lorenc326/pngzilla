# pngzilla (to be renamed lol)
Sandbox pet-project with child-processes, queue & docker.

User requests calculation of random crypto key, while queue process its calculations on background. Basically just simulation of heavy sync process that might happen on server side.

### .env
to run project, you should have env file setup
```
NODE_PORT=3000
REDIS_PORT=6379
```

### Build and start application
```
docker-compmose up
```
### Example log output when 20 records are inserted 
```
app_1    | server start at port 3000
app_1    | queue is empty, retry in 1000ms
app_1    | added new record to queue: key=0.8me8u9y1hu5, value=69
app_1    | added new record to queue: key=0.ywxg9cf8zcf, value=69
app_1    | added new record to queue: key=0.plboq0ifnee, value=69
app_1    | added new record to queue: key=0.xhllhwh4g5, value=69
app_1    | added new record to queue: key=0.m2943mk59r, value=69
app_1    | added new record to queue: key=0.6k5n3fekxn, value=69
app_1    | added new record to queue: key=0.mwj0gnxvrdr, value=69
app_1    | added new record to queue: key=0.hdlngsp4jck, value=69
app_1    | added new record to queue: key=0.ch0wgg8zaa, value=69
app_1    | added new record to queue: key=0.2igbkakhopj, value=69
app_1    | added new record to queue: key=0.2r3pbhnrbc2, value=69
app_1    | added new record to queue: key=0.krmp5875pa, value=69
app_1    | added new record to queue: key=0.uv75qyf08v, value=69
app_1    | added new record to queue: key=0.5b2kones1rp, value=69
app_1    | added new record to queue: key=0.i5emcx68z7s, value=69
app_1    | added new record to queue: key=0.pew3uwhqrx, value=69
app_1    | added new record to queue: key=0.3jvqjye0668, value=69
app_1    | added new record to queue: key=0.yy2qonzqyj, value=69
app_1    | added new record to queue: key=0.kzl1az4akwi, value=69
app_1    | added new record to queue: key=0.hy683t070s, value=69
app_1    | queue has 20 records
app_1    | processing 0.ch0wgg8zaa
app_1    | child-process executed result for 0.ch0wgg8zaa
app_1    | processed and removed 0.ch0wgg8zaa
app_1    | queue has 19 records
app_1    | processing 0.krmp5875pa
app_1    | child-process executed result for 0.krmp5875pa
app_1    | processed and removed 0.krmp5875pa
app_1    | queue has 18 records
app_1    | processing 0.5b2kones1rp
app_1    | child-process executed result for 0.5b2kones1rp
app_1    | processed and removed 0.5b2kones1rp
app_1    | queue has 17 records
app_1    | processing 0.2r3pbhnrbc2
app_1    | child-process executed result for 0.2r3pbhnrbc2
app_1    | processed and removed 0.2r3pbhnrbc2
app_1    | queue has 16 records
app_1    | processing 0.i5emcx68z7s
app_1    | child-process executed result for 0.i5emcx68z7s
app_1    | processed and removed 0.i5emcx68z7s
app_1    | queue has 15 records
app_1    | processing 0.pew3uwhqrx
app_1    | child-process executed result for 0.pew3uwhqrx
app_1    | processed and removed 0.pew3uwhqrx
.....
```

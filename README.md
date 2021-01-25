# REDIS HIGH AVAILIBILY AND REPLICATION

This prodject mainly focuses on achieving HA and Replication on Kubernetes platform. I tried to follow all the necessary best practices unless and until it makes our workflow more complicated. Since our primary goal is to achieve HA.


## CLIENT

I made a most simple and bare-bone client on nodejs to ensure our connection to Redis and for testing purposes. Since Redis is a key-value pair in-memory database (now it supports Json, Hash, etc) and just to make things simple I am setting a key and sending the response back to the client after fetching the key from the database.

For More info on client side and Kubernetes implementation visit [Nodejs-Client](https://github.com/sourikghosh/redisHA/tree/main/client)

## REDIS
## Master-Replica replication
Use ` replicaof ` to make a Redis instance a copy of another Redis server. A few things to understand ASAP about Redis replication

- Redis replication is asynchronous, but you can configure a master to stop accepting writes if it appears to be not connected with at least a given number of replicas

- Redis replicas are able to perform a partial resynchronization with the master if the replication link is lost for a relatively small amount of time.

## Challenges To achieve HA
- Cannot really use Deployment to create Redis pods.Deployment are not meant for stateful components. There are many reasons for that.
- Cannot use clusterIp service since its loadbalances the pod (in round-robin by default).
  Loadbalancing is not desired for Redis cluster because we only want to write on master and not on Replicas because writing on replicas will be discarded on the next sync with the master node
- Cannot hard-coded the config file since `replicaof` field will keep changing in long-run.
- How to deciede which will be the next **master** if the **master** dies.

## Expected Solutions
- We have to use Statefulset a StatefulSet manages Pods that are based on an identical container spec. Unlike a Deployment, a StatefulSet maintains a sticky identity for each of their Pods. These pods are created from the same spec, but are not interchangeable: each has a persistent identifier that it maintains across any rescheduling.
- We have to use headless service.Headless Services, a cluster IP is not allocated, kube-proxy does not handle these Services, and there is no load balancing or proxying done by the platform for them.For headless Services that define selectors, the endpoints controller creates Endpoints records in the API, and modifies the DNS configuration to return records (addresses) that point directly to the Pods backing the Servic.
- One of the Solution is using initContainers to make the connection between replicas and master on the fly.Initcontainer spawns before the pod creation and makes the master-replica connection.
- Redis solution to this is Redis Sentinels.Redis Sentinel provides high availability for Redis. In practical terms this means that using Sentinel you can create a Redis deployment that resists without human intervention certain kinds of failures.

### Redis Persistence
Redis is a database though it's in-memory but we are enabling persistence in it by both append-only mode and rdb mode as well both the mode have its drawback.

##### RDB mode
This makes the format more resistant to corruption but there is a performance hit to pay (around 10%) when saving and loading RDB files, so you can disable it.
If you want to save some CPU in the saving child set it to 'no' but the dataset will likely be bigger if you have compressible values or keys.
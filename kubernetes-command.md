```bash
#Here I am creating a kind cluster
kind create cluster --name redis --image kindest/node:v1.18.4

#Creating namespace redis
kubectl create ns redis

#Creating the statefulset with all config,secret and service
kubectl apply -n redis -f ./redis/configMap.yml
kubectl apply -n redis -f ./redis/service.yml
kubectl apply -n redis -f ./redis/statefulSet.yml
kubectl apply -n redis -f ./sentinels/statefulSet.yml

#To check the diagnosis
kubectl get -n redis pods
kubectl get -n redis configMap
kubectl get -n redis statefulset
kubectl get -n redis pv

#Getting the logs
kubectl -n redis logs redis-0
kubectl -n redis logs redis-1
kubectl -n redis logs redis-2

#Checking the Replication
kubectl -n redis exec -it redis-0 sh
redis-cli 
auth a-very-complex-password-here
info replication

#Checking the Sentinels logs
kubectl -n redis get pods -o wide
kubectl -n redis get pv
kubectl -n redis logs sentinel-0
```

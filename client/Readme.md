kubectl create ns client
kubectl apply -n client -f ./configmap.yml
kubectl apply -n client -f ./secret.yml
kubectl apply -n client -f ./deployment.yml
kubectl apply -n client -f ./service.yml

curl localhost

```bash
#Correct result
{
 "ed": "shoot"
}
```
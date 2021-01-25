## Cient Kubernetes Setup
First,we create a new ns or namespace.Namespace are generally used to organized and isolate the workspace on kubernetes.
```bash 
kubectl create ns client
```
Then we create the configMap for the deployment where we set the port configuration of the nodejs app
```bash 
kubectl apply -n client -f ./configmap.yml
```

```bash 
kubectl apply -n client -f ./secret.yml
```
```bash 
kubectl apply -n client -f ./deployment.yml
```
```bash 
kubectl apply -n client -f ./service.yml
```
```bash 
curl localhost
```
```bash
#Correct result
{
 "ed": "shoot"
}
```

## Cient Kubernetes Setup
First,we create a new ns or namespace.Namespace are generally used to organized and isolate the workspace on kubernetes.
```bash 
kubectl create ns client
```
Then we create the configMap for the deployment where we set the port configuration of the nodejs app
```bash 
kubectl apply -n client -f ./configmap.yml
```
Then we pass the secrets like Database config, password etc.You might be thinking why we are not using Db_secrets in more secure way like vaults, My answer to that question is just to reduce complexity in our aritechture. Please use a more secure and robust approach while handling your secrets like *hasiCorp Vault* in production. 
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

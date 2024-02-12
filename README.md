# exif_extractor_js_tests

<h1>1.Prerequisites</h1>


You need to have installed the following:

		npm
		nodejs
		docker
		aws-cli 
		An aws -account with correct permissions
 
2. i) Clone the tests repository
   
		git clone https://github.com/hkarani/exif_extractor_js_tests.git

ii) Clones Lambda function repository

		git clone https://github.com/hkarani/exif_extractor_js.git
	
	
<h1>3. Testing Lambda Function Locally</h1>

i. Open exif_extractor_js project in terminal
	
ii. Build the project to test from your machine

		docker build --platform linux/amd64 -t exif_extractor:latest . 
		
iii. Install runtime interace emulator on your machine

		mkdir -p ~/.aws-lambda-rie && \                                                             
    		curl -Lo ~/.aws-lambda-rie/aws-lambda-rie https://github.com/aws/aws-lambda-runtime-interface-emulator/releases/latest/download/aws-lambda-rie && \
    		chmod +x ~/.aws-lambda-rie/aws-lambda-rie

iv. Run docker image with the interface emulator
   
    		docker run --platform linux/amd64 -d -v ~/.aws-lambda-rie:/aws-lambda -p 9000:8080 \      
        --entrypoint /aws-lambda/aws-lambda-rie \
        exif_extractor:latest \
        /usr/local/bin/npx aws-lambda-ric index.handler
        
   A succesfull attempt will leave an print and output like one below
   
        	c70a36164d87652031142cf13495b3722aa540e9f1f257b3b11ccb7dd11dfa3c
        
	
	
v. Then you can go within the exif_extractor_test project and uncomment a function call you'd like to test. The url of the lamnda function running locally will look like this
	`http://localhost:9000/2015-03-31/functions/function/invocations` depending on the port you choose run the docker run on as in (iv)
		
vi. Copy the url into the post call in test.js and Run node test.js in terminal after uncommenting function passing images to the the lambda function you'd like
		to test.
		
vii. To stop image

	docker ps
   
vii Copy the container id and pass it to docker kill

        docker kill 3766c4ab331c
		
Alternatively to stop all running docker images go with

	docker stop $(docker ps -q)

		
<h1>4. Deploy and Test Lambda Function </h1>

1. Authenticate Docker CLI to Amazon ECR Registry, replace 012345678910 with your AWS account ID. You need to have set up your aws credentials.
    
		aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 012345678910.dkr.ecr.us-east-1.amazonaws.com
		
Success will return login succeeded
		
2. Create an Amazong ECR  for you docker image. Replace "exifextractor" with an name of your choice
	
	        aws ecr create-repository --repository-name exif_extractor --region us-east-1 --image-scanning-configuration scanOnPush=true --image-tag-mutability MUTABLE
	
A successful result will look like this
    		{
    		    "repository": {
    			"repositoryArn": "arn:aws:ecr:us-east-1:012345678910:repository/exif_extractor",
    			"registryId": "012345678910",
    			"repositoryName": "exif_extractor",
    			"repositoryUri": "012345678910.dkr.ecr.us-east-1.amazonaws.com/exif_extractor",
    			"createdAt": 1707731520.493,
    			"imageTagMutability": "MUTABLE",
    			"imageScanningConfiguration": {
    			    "scanOnPush": true
    			},
    			"encryptionConfiguration": {
    			    "encryptionType": "AES256"
    			}
    		    }
    		}
		
3. Copy the repositoryUri from the successfully created repository and tag your local image to it like below
	
		docker tag exif_extractor:latest 012345678910.dkr.ecr.us-east-1.amazonaws.com/exif_extractor
		
4. Push the local image to Amazon ECR
    
		docker push 012345678910.dkr.ecr.us-east-1.amazonaws.com/exif_extractor
	
4b. For the next step you will need a configured role to create a lambda function via terminal. If you don't have one, to create a role use the command below and you can replace "exif_extractor_lambda_role" with an alternative role name of your choice.
	
	     aws iam create-role --role-name exif_extractor_lambda_role --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{ "Effect": "Allow", "Principal": {"Service": "lambda.amazonaws.com"}, "Action": "sts:AssumeRole"}]}'
	
5. Create a lambda function with the pushed image. Replace "exif_extractor_lambda_role" with a registered role with correct permission
	
    		aws lambda create-function \
      		--function-name exif_extractor \
      		--package-type Image \
      		--code ImageUri=0123456789.dkr.ecr.us-east-1.amazonaws.com/exif_extractor:latest \
      		--role arn:aws:iam::012345678910:role/exif_extractor_lambda_role
  		
6. Login into your AWS an go to the function you just created.
In Configurations change set the timeout to a higher value of more than 30 seconds since image data processing can take time for larger images and due to network lag. Click Save to save changes.
   
8. Still in Configurations go to Function URL and create a function url. Select Auth_type as NONE for testing only.
Copy the funtion url and test it exif_extractor_js_test code by running node test.js.
  	
  	
	
	
	
		



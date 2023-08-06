export const handler = async (event) => {
    console.log(event);

    // by default we are denying everything
    var effect = 'Deny';
    
    //retrieve the token from the event
    var token = event.authorizationToken;
    
    //now you could do some things like 
    // 1. call an OAuth provider
    // 2. lookup this token in your database (if you self manage tokens)
    // 3. decode the JWT token and do some additional verifications

    if(token == "MySecretToken"){
      effect = "Allow";
    }
    
    // get the resource
    var resource = event.methodArn;
    
    //construct a response which basically it will be a policy
    var authResponse = {}
    authResponse.principalId = 'user';
    var policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    var statement1 = {};
    statement1.Action = 'execute-api:Invoke';
    statement1.Effect = effect;
    statement1.Resource = resource;
    policyDocument.Statement[0] = statement1;
    authResponse.policyDocument = policyDocument;
    
    // you could add some additional context like for example a tenant
    var context = {}
    context.tenant = 'tenant1';
    authResponse.context = context;
    
    // return the response
    return authResponse;
  };
  
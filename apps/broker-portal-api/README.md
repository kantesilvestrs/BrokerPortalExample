
# API

## Welcome

This is the API documentation. The API is written in C# - **however, you do not need to know anything about C# or have dotnet installed to get this running**

You do need docker though...

If you are comfortable with C#, feel free to run it however which way you desire.

## Getting Started

```bash

# From the root of the repo

cd ./apps/broker-portal-api/src
docker build . -t brokerportalapi
docker run -p 7000:7000 brokerportalapi

```

When you hit run, you should see some logging output that looks like this - this means you're successful. If it doesn't look like this and you've tried everything to get it working, don't panic, please contact the team (via recruiter or direct):

```text

warn: Microsoft.AspNetCore.Hosting.Diagnostics[15]
      Overriding HTTP_PORTS '8080' and HTTPS_PORTS ''. Binding to values defined by URLS instead 'http://*:7000'.
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://[::]:7000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Production
info: Microsoft.Hosting.Lifetime[0]
      Content root path: /app

```

Once you see this, you should be able to navigate to the [Swagger Documentation](http://localhost:7000/swagger/index.html)

## Super Important Information

In order to login, you'll need to use the credentials: Username: **insurx** ; Password: **supersecretpassword1**

This is a super secret password, please do not share...

Also, CORS should be off

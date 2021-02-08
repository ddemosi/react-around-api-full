# Around the US!
> A portfolio project featuring user authentication

This application features user authentication through popular and highly scalable "token authentication" through localStorage. Users can create cards and add public images, which will be stored on a custom configured server hosted on AWS Lightsail. Users can also like cards, remove likes, delete cards, and edit their own profile details.

![A photo of the UI](https://github.com/ddemosi/react-around-api-full/around-dashboard.png?raw=true)

It also features responsive design and a hamburger icon with a mobile navigation menu.

![](https://github.com/ddemosi/react-around-api-full/around-mobile.png?raw=true)

![](https://github.com/ddemosi/react-around-api-full/around-mobile-open.png?raw=true)


## Installation

After clone, make sure you have node.js installed. Then navigate to the backend directory and run:

```sh
npm install
```

Then run:

```sh
node app
```

Navigate to the front end directory. Run:

```sh
npm install
```

Then:

```sh
npm run start
```


## Development setup

THIS IS THE DEVELOPMENT VERSION (NOT COMPILED). PRODUCTION BUILD IS ON THE "deployment-branch". Only difference is that the FETCH requests are directed at localhost rather than the remote server. Remote server will reject any requests made from localhost as part of it's CORS policy.


## Meta

Daniel Gummow (dannydemosi) – [@YourLinkedIn](https://www.linkedin.com/in/daniel-gummow-223043186/) – rdgummow@gmail.com

[https://github.com/ddemosi/](https://github.com/ddemosi/)
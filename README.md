# Goodlow Admin

This repo serves as the source code for the admin route of [GoodlowEFC/admin](https://github.com/OwenRempel/GoodlowEFC/tree/main/admin)

It is built using React and Requires the [GoodlowEFC/API](https://github.com/OwenRempel/GoodlowEFC/tree/main/API) to be hosted at by default <code>/API</code> but this can be updated by changing the <code>process.env.REACT_APP_API_URL</code>

```ENV
REACT_APP_API_URL={API_URL}
```

Also the build path of <code>npm run build</code> has been changed to the folowing to allow for intigration to the main [GoodlowEFC/admin](https://github.com/OwenRempel/GoodlowEFC/tree/main/admin) repo

```JSON
"build": "BUILD_PATH='../../Site/app/admin' react-scripts build",
```
If this does not suit your build the orignal is as follows
```JSON
"build": "react-scripts build",
```

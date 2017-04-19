# loopback-component-openpay
[LoopBack](http://loopback.io) component to use [openpay](http://www.openpay.mx/).

## Description
loopback-component-openpay is a package to wrap openpay package inside a loopback app.
After installation you will notice an important change in your application:
* New models created:
    - card
    - customer
    - request_openpay
* Socket.io server is created when app start.

### Enabling the component
In order to use this component you need to enable it as any other component. Edit the file
``` project-dir/server/component-config.json ``` and include it.
```json
{
  "loopback-component-openpay": {
  }
}
```

### Enabling models
As you may notice there is new models generated after installation of this component, to start using "geoposition" model just enable it
as any other model. Edit the file ``` project-dir/server/model-config.json ``` and include it.
```json
{
  "card": {
    "dataSource": "<datasource>",
    "public": true
  },
  "customer": {
      "dataSource": "<datasource>",
      "public": true
  },
  "request_openpay": {
      "dataSource": "<datasource>",
      "public": true
  }
}
```
Remember to put the datasource of your preference.


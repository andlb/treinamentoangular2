const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports= {
    uri:'mongodb://localhost:27017/yucar',
    secret:crypto,
    db:'yucar',
    acesso:'http://localhost:4200',
    segredoemail:'2bcd283a93100a701377b20c357c79f03d9b2a05db521f8f3fcc5bffbef5fb41b2a600ac76a37e65cbc769965e4739ba429abd1a4af30dae00aeed9c756d8b70a170d9cead45773fec908e2c40a4ee0cb92d8d3942d59d8ccc6d532c2c7fb6d1bd982a5dfeb810e1bccdf75d0aa72aefea97cd04b6572bfe8978b304945e0079b6902c44f4fef828ed9d10a90ab64aa4730dda412cb39e37b03f50d33eaf7ab1483167baffc73dc295c5b06729cd6201d2932c890d333921b3889b6f10dfd6f6d8915a0bd2c18df6069c1fd5c735a221dcc0d7d8fdab7bde31e3bbb591e6944be5b477ec67681b11fb19534b13a7745414e2dff81bce07d93c7dc5e05b32dbec'
};
let user=require('../controllers/users');
let wallet=require('../controllers/wallet');
let walletTrans=require('../controllers/walletTransaction');
let order=require('../controllers/order');
let orderItem=require('../controllers/orderItem');
let penalty=require('../controllers/penalty');
let category=require('../controllers/category');
let product=require('../controllers/product');
let photo=require('../controllers/photos');
let upload=require('../controllers/uploadCSV');
let email=require('../controllers/emailSMSSend');
let bill=require('../controllers/invoice')
let creditpoint=require('../controllers/CreditPoint')
const middleware = require(`../middleware`);
module.exports=(app,passport)=>{
    app.post('/api/users/login1',passport.authenticate('local',{
        successRedirect:'/api/users/suc',
        failureRedirect:'/api/users/fail'
    }));
    app.get('/api/users/suc',(req,res)=>{
        console.log('req.user===>',req.user);
        res.send({'Token':token,'message':"success",'obj':obj});
    });
    app.get('/api/users/fail',(req,res)=>{
        console.log("in fail");
        res.send({"error":"failed"});
    });
//....................................
    app.post('/api/users/add',user.createUser);
    app.put('/api/users/upd',user.editUser);
    app.delete('/api/users/del',user.deleteUser);
    app.get('/api/users/fetch',user.fetchUser);
    app.post('/api/users/get',user.getUser);
    app.get('/api/users/topCustomer',user.topCustomer);
    app.get('/api/users/topInventoryUser',user.topInventoryUser);
    app.get('/api/users/InventoryUser',user.getInventoryUser);
    app.get('/api/users/borrower',user.getCustomer);
    app.get('/api/users/countCustomer',user.countCustomer);
    app.get('/api/users/countInventoryUser',user.countInventoryUser);
    app.post('/api/users/changePassword',user.changePassword);
    //....................................
    app.post('/api/wallet/add',wallet.createWallet);
    app.post('/api/wallet/get',wallet.getWallet);
    //....................................
    app.post('/api/walletTrans/add',walletTrans.createWalletTransaction);
    app.post('/api/walletTrans/get',walletTrans.getTransctionByUserId);
    //....................................
    app.get('/api/creditpointGet/:id',creditpoint.getCreditPoint);
    app.get('/api/creditpointTrans/:id',creditpoint.getCreditPointTransaction);
    //....................................
    app.post('/api/upload/borrower',upload.csvBorrowerFile);
    app.post('/api/upload/product',upload.csvProductFile);
    //....................................
    app.post('/api/email',email.sendEmail)
    app.post('/api/bill',bill.sendBill)
    //....................................
    app.post('/api/orders/add',order.createOrder)
    app.get('/api/orders/list',order.getOrders)
    app.delete('/api/orders/delete',order.deleteOrder)
    app.post('/api/orders/byDate',order.getOrdersByDate)
    app.post('/api/orders/byUserId',order.getOrdersByUserId)
    //....................................
    app.post('/api/orderitems/add',orderItem.createOrderitem)
    app.delete('/api/orderitems/delete',orderItem.deleteOrderitem)
    app.post('/api/orderitems/byorderId',orderItem.getOrderitemByorderId)
    app.post('/api/orderitems/status',orderItem.statusChanged)
    app.get('/api/orderitems/get',orderItem.getAllOrderItem)
    //....................................
    app.post('/api/penalty/add',penalty.createPenalty)
    app.get('/api/penalty/list',penalty.getPenalty)
    app.delete('/api/penalty/delete',penalty.deletePenalty)
    //....................................
    app.post('/api/category/add',category.createCategory)
    app.get('/api/category/list',category.getCategory)
    app.delete('/api/category/delete',category.deleteCategory)
    //....................................
    app.post('/api/product/add',product.createProduct)
    app.get('/api/product/list',product.fetchProduct)
    app.post('/api/product/listId',product.fetchProductById)
    app.get('/api/product/list/:id',product.fetchUserProduct)
    app.get('/api/product/topProduct',product.topProduct)
    app.delete('/api/product/delete',product.deleteProduct)
    app.put('/api/product/update',product.editProduct)
    app.post('/api/product/approved',product.unApproved)
    app.get('/api/product/countProduct',product.countProduct)
    app.get('/api/product/list/:id',product.fetchUserProduct)
    app.get('/api/product/lists/:id',product.fetchUserProducts)
    app.get('/api/product/listsell/:id',product.fetchUserProductSell)
    app.get('/api/product/listCnt/:id',product.fetchUserProductCnt)
    app.get('/api/product/listsell/:id',product.fetchUserProductSellCnt)
    
    //....................................
    app.post('/api/photo/add',photo.createPhoto)
    app.delete('/api/photo/delete',photo.deletePhoto)
    app.post('/api/photo/getPhotosByProduct',photo.getphotos)
};
//product.validation.js
module.exports.validation_create = (req,res,next)=>{
    if(!req.body.title){
        req.flash('error','Title is required');
        res.redirect('/admin/product/add');
        console.log(req.body.title);
        console.log(req.body);
        return;
    }
    if(!req.body.price){
        req.flash('error','Price is required');
        res.redirect('/admin/product/add');
        return;
    }
    if(!req.body.description){
        req.flash('error','Description is required');
        res.redirect('/admin/product/add');
        return;
    }
    if(!req.body.discountPercentage){
        req.flash('error','Discount Percentage is required');
        res.redirect('/admin/product/add');
        return;
    }
    if(!req.body.stock){
        req.flash('error','Stock is required');
        res.redirect('/admin/product/add');
        return;
    }
    if(!req.body.status){
        req.flash('error','Status is required');
        res.redirect('/admin/product/add');
        return;
    }
    if(!req.body.position){
        req.flash('error','Position is required');
        res.redirect('/admin/product/add');
        return;
    }
    if(!req.files.thumbnail){
        req.flash('error','Thumbnail is required');
        res.redirect('/admin/product/add');
        return;
    }
    next();
}

module.exports.validation_update = (req,res,next)=>{
    if(!req.body.title){
        req.flash('error','Title is required');
        res.redirect('/admin/product/edit/'+req.params.id);
        return;
    }
    if(!req.body.price){
        req.flash('error','Price is required');
        res.redirect('/admin/product/edit/'+req.params.id);
        return;
    }
    if(!req.body.description){
        req.flash('error','Description is required');
        res.redirect('/admin/product/edit/'+req.params.id);
        return;
    }
    if(!req.body.discountPercentage){
        req.flash('error','Discount Percentage is required');
        res.redirect('/admin/product/edit/'+req.params.id);
        return;
    }
    if(!req.body.stock){
        req.flash('error','Stock is required');
        res.redirect('/admin/product/edit/'+req.params.id);
        return;
    }
    if(!req.body.status){
        req.flash('error','Status is required');
        res.redirect('/admin/product/edit/'+req.params.id);
        return;
    }
    if(!req.body.position){
        req.flash('error','Position is required');
        res.redirect('/admin/product/edit/'+req.params.id);
        return;
    }
    // if(!req.files.thumbnail){
    //     req.flash('error','Thumbnail is required');
    //     res.redirect('/admin/product/add');
    //     return;
    // }
    next();
}
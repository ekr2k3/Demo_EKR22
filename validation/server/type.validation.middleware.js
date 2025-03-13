//type.validation.middleware.js
module.exports.createPostValidation = (req,res,next)=>{
    if(!req.body.name){
        req.flash('error','name is required');
        res.redirect('/admin/product/add');
        console.log(req.body.name);
        console.log(req.body);
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

module.exports.editPatchValidation = (req,res,next)=>{
    if(!req.body.name){
        req.flash('error','name is required');
        res.redirect('/admin/product/add');
        console.log(req.body.name);
        console.log(req.body);
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
    // Bỏ đoạn thubnail vì khi sửa không cập nhập tương đương dùng dữ liệu cũ
    // + việc không thể điền giá trị cũ vào input[file]
    //==> việc cho phép trống ô này là hợp lý
    // if(!req.files.thumbnail){
    //     req.flash('error','Thumbnail is required');
    //     res.redirect('/admin/product/add');
    //     return;
    // }
    next();
}
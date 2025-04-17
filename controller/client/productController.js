// productController.js
var modelPhone = require('../../models/itemPhone.js');
var modelCategory = require('../../models/types.model.js');
module.exports.productGet = async (req, res) => {
    var condition = {}
    var DATA = await modelPhone.find(condition);
    console.log(DATA); // Kiểm tra thử bằng các in ra
    res.render('client/pages/product/index.pug', {
        title: 'Product',
        toPug: DATA
    });
};


async function getListSub(id_cha,result){
    //duyệt mảng 1 lượt tìm id các phần từ con của id_cha
    //từ các phần tử tìm đưa vào mảng temp sau đó cổng dồn vào mảng result
    //Sau đó duyệt mảng temp để tìm id con của các phần tử trong mảng temp (nói các khác là đệ quy)
    var temp = await modelCategory.find({ parent_id: id_cha });
    console.log("temp" + temp); // Kiểm tra thử bằng các in ra
    for (let i = 0; i < temp.length; i++) {
        const id_con = temp[i]._id.toString(); // Lấy id của danh mục con convert tờ object thành string
        result.push(id_con);
        // Gọi đệ quy để tìm danh mục con của id_con
        await getListSub(id_con, result);
    }
    return result; // Kết quả trả về là 1 list các id cấp thấp của id_cha
}


module.exports.SubProductGet = async (req, res) => {
    //id danh mục hiện tại
    var id_DM = req.params.id_DM;
    //Tạo danh sách danh mục con
    var result = [];
    result = await getListSub(id_DM, result);   // Note Do getListSub là hàm async, nếu không await, 
    //result sẽ là một Promise, chứ không phải mảng kết quả.
    //thêm danh mục cha vào danh sách
    result.push(id_DM);
    console.log(result);
    //Cộng dồn các sản phẩm danh mục con + danh mục cha
    var AllDATA = [];
    for(var i = 0; i < result.length; i++) {
        var id = result[i];
        var condition = { Thuoc_danh_muc: id };
        var DATA = await modelPhone.find(condition);
        AllDATA = AllDATA.concat(DATA); // Nối mảng DATA vào AllDATA
    }
    console.log(AllDATA); // Kiểm tra thử bằng các in ra
    //lấy tên danh mục
    var Category = await modelCategory.findById(id_DM);
    res.render('client/pages/product/index.pug', {
        title: Category.name,
        toPug: AllDATA
    });
}

module.exports.productDetailGet = async (req, res) => {
    var id_pro = req.params.id_pro;
    var condition = { _id: id_pro };
    var DATA = await modelPhone.find(condition);
    console.log(DATA); // Kiểm tra thử bằng các in ra
    res.render('client/pages/product/detail.pug', {
        title: 'Detail',
        toPug: DATA[0]
    });
}

module.exports.productSearchGet = async (req, res) => {
    var search = req.query.search; // Lấy giá trị từ query string
    console.log(search); // Kiểm tra thử bằng các in ra
    // Biểu thức chính quy
    var condition = { title: { $regex: search, $options: 'i' } }; // Tìm kiếm không phân biệt chữ hoa chữ thường
    var DATA = await modelPhone.find(condition);
    console.log(DATA); // Kiểm tra thử bằng các in ra
    res.render('client/pages/product/search.pug', {
        title: 'Search',
        toPug: DATA
    });
}
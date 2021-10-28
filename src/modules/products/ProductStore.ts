import {observable} from "mobx";
import {productService} from "./ProductService";
import {toastUtil} from "../../common/utils/ToastUtil";
import {colorService} from "./color/ColorService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import $ from "jquery";

class ProductStore{
    @observable page: any = 0;
    @observable totalPages: any = 0;
    @observable productId: any = '';
    @observable listProduct: any[] = [];
    @observable isLoading: boolean = false;
    @observable productInfo: any;
    @observable dataRequest: any = {
        images: [],
        name: '',
        state: '',
        code: '',
        costPrice: 0,
        price: 0,
        discount: 0,
        isHot: false,
        categoryId: '',
        description: '',
        options: [],
        color: 0,
        size: 0
    };

    async getProduct(){
        this.isLoading = true;
        const result = await productService.getProduct()
        this.isLoading = false;
        if(result.status === 200){
            this.listProduct = result.body.data;
            this.totalPages = result.body.metadata.totalPages
        }
    }
    async getProductDetail(id: any){
        this.isLoading = true;
        const result = await productService.productDetail(id)
        this.isLoading = false;
        if(result.status === 200){
            this.productInfo = result.body;
        }
    }

    async addProduct(){
        let {name, isHot, description, state, categoryId, discount, costPrice, images, code, price, options} = this.dataRequest;
        if(!name) {
            toastUtil.warning('Vui lòng nhập Name');
            return false;
        }

        let data = {
            code: code,
            name: name,
            isHot: isHot,
            description: description,
            state: state,
            discount: discount,
            imageUrls: images,
            costPrice: costPrice,
            price: price,
            categoryId: categoryId,
            optionList: options
        }

        const result = await productService.addProduct(data);

        if(result.status === HttpStatusCode.OK){
            await this.getProduct();
            $('#close_add').trigger("click")
            toastUtil.success('Add product success')
        }else {
            toastUtil.error(result.body.message);
        }
    }


    async deleteProduct(){
        const result = await colorService.deleteColor(this.productId);
        if(result.status === HttpStatusCode.OK){
            this.listProduct.map((value, i) => {
                if(value.id === this.productId){
                    this.listProduct.splice(i, 1)
                }
            })
            $('#close_delete').trigger("click")
            toastUtil.success('Delete product success')
        }else {
            toastUtil.error(result.body.message);
        }
    }

}

export const productStore = new ProductStore();
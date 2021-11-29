import {observable} from "mobx";
import {productService} from "./ProductService";
import {toastUtil} from "../../common/utils/ToastUtil";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import $ from "jquery";

class ProductStore{
    @observable page: any = 0;
    @observable totalPages: any = 0;
    @observable productId: any = '';
    @observable listProduct: any[] = [];
    @observable listBrand: any[] = [];
    @observable isLoading: boolean = false;
    @observable productInfo: any;
    @observable isHot: any = false;
    @observable searchName: string = '';
    @observable dataRequest: any = {
        imageUrls: [],
        name: '',
        state: '',
        code: '',
        costPrice: 0,
        price: 0,
        discount: 0,
        isHot: false,
        brandId: 0,
        categoryId: '',
        description: '',
        optionList: [],
        color: 0,
        size: 0
    };

    clearForm(){
        this.dataRequest = {
            imageUrls: [],
            name: '',
            state: '',
            code: '',
            costPrice: 0,
            price: 0,
            discount: 0,
            isHot: false,
            brandId: 0,
            categoryId: '',
            description: '',
            optionList: [],
            color: 0,
            size: 0
        };
    }

    async getProduct(){
        this.isLoading = true;
        const result = await productService.getProduct()
        this.isLoading = false;
        if(result.status === 200){
            this.listProduct = result.body.data;
            this.totalPages = result.body.metadata.totalPages
        }
    }

    async getAllBrands(){
        const result = await productService.getBrands()
        if(result.status === 200){
            this.listBrand = result.body;
        }
    }

    async getProductDetail(id: any){
        this.isLoading = true;
        const result = await productService.productDetail(id)
        this.isLoading = false;
        if(result.status === 200){
            this.dataRequest = result.body;
        }
    }

    async addProduct(){
        let {name, isHot, description, state, categoryId, discount, costPrice, imageUrls, code, price, optionList, brandId} = this.dataRequest;

        if(!name) {
            toastUtil.warning('Vui lòng nhập Name');
            return false;
        }
        if(!code) {
            toastUtil.warning('Vui lòng nhập Code');
            return false;
        }
        if(!categoryId) {
            toastUtil.warning('Vui lòng chọn Category');
            return false;
        }
        if(!optionList) {
            toastUtil.warning('Vui lòng thêm Options');
            return false;
        }
        if(!description) {
            toastUtil.warning('Vui lòng nhập Description');
            return false;
        } if(!price) {
            toastUtil.warning('Vui lòng nhập Price');
            return false;
        } if(!costPrice) {
            toastUtil.warning('Vui lòng nhập CostPrice');
            return false;
        }

        if(!discount) {
            toastUtil.warning('Vui lòng nhập Discount');
            return false;
        }
        if(!isHot) {
            toastUtil.warning('Vui lòng chọn isHot');
            return false;
        }

        if(!brandId) {
            toastUtil.warning('Vui lòng chọn brand');
            return false;
        }
        if(!state) {
            toastUtil.warning('Vui lòng chọn State');
            return false;
        }


        let data = {
            code: code,
            name: name,
            isHot: isHot,
            description: description,
            state: state,
            discount: discount,
            imageUrls: imageUrls,
            costPrice: costPrice,
            price: price,
            brandId: brandId,
            categoryId: categoryId,
            optionList: optionList
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

    async editProduct(){
        let {id, name, isHot, description, state, categoryId, discount, costPrice, imageUrls, code, price, optionList, brandId} = this.dataRequest;
        if(!name) {
            toastUtil.warning('Vui lòng nhập Name');
            return false;
        }
        if(!code) {
            toastUtil.warning('Vui lòng nhập Code');
            return false;
        }
        if(!categoryId) {
            toastUtil.warning('Vui lòng chọn Category');
            return false;
        }
        if(!optionList) {
            toastUtil.warning('Vui lòng thêm Options');
            return false;
        }
        if(!description) {
            toastUtil.warning('Vui lòng nhập Description');
            return false;
        } if(!price) {
            toastUtil.warning('Vui lòng nhập Price');
            return false;
        } if(!costPrice) {
            toastUtil.warning('Vui lòng nhập CostPrice');
            return false;
        }

        if(!discount) {
            toastUtil.warning('Vui lòng nhập Discount');
            return false;
        }
        if(!isHot) {
            toastUtil.warning('Vui lòng chọn isHot');
            return false;
        }

        if(!brandId) {
            toastUtil.warning('Vui lòng chọn brand');
            return false;
        }
        if(!state) {
            toastUtil.warning('Vui lòng chọn State');
            return false;
        }


        let data = {
            code: code,
            name: name,
            isHot: isHot,
            description: description,
            state: state,
            discount: discount,
            imageUrls: imageUrls,
            costPrice: costPrice,
            price: price,
            brandId: brandId,
            categoryId: categoryId,
            optionList: optionList
        }

        const result = await productService.editProduct(id, data);

        if(result.status === HttpStatusCode.OK){
            await this.getProduct();
            $('#close_edit').trigger("click")
            toastUtil.success('Edit product success')
        }else {
            toastUtil.error(result.body.message);
        }
    }

    async deleteProduct(){
        const result = await productService.deleteProduct(this.productId);
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
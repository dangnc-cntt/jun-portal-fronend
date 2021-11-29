import {action, observable} from "mobx";
import HttpStatusCode from "../../../common/constants/HttpErrorCode";
import {toastUtil} from "../../../common/utils/ToastUtil";
import $ from "jquery"
import {brandService} from "./BrandService";

class BrandStore {
    @observable public isLoading: boolean = false;
    @observable public brandId: number = 0;
    @observable public listBrand: any[] = [];
    @observable public dataRequest: any = {
        id: 0,
        name: "",
        description: '',
        logoUrl: ''
    };

    clearForm(){
        this.dataRequest = {
            id: 0,
            name: "",
            description: '',
            logoUrl: ''
        };
    }


    @action async getBrand() {
        const result = await brandService.getBrand();
        if (result.status === HttpStatusCode.OK) {
            this.listBrand = result.body.data;
        }
    }


    async brandDetail(id: number) {
        const result = await brandService.brandDetail(id);
        if (result.status === HttpStatusCode.OK) {
            this.dataRequest = result.body;
        } else {
            toastUtil.error(result.body.message);
        }
    }

    async addBrand(){

        let {name, description, logoUrl} = this.dataRequest;
        if(!name) {
            toastUtil.warning('Vui lòng nhập Name');
            return false;
        }
        if(!description) {
            toastUtil.warning('Vui lòng nhập Description');
            return false;
        }
        if(!logoUrl) {
            toastUtil.warning('Vui lòng chọn logoUrl');
            return false;
        }
        const result = await brandService.addBrand(name, description, logoUrl);

        if(result.status === HttpStatusCode.OK){
            await this.getBrand();
            this.clearForm()
            $('#close_add').trigger("click")
            toastUtil.success('Add brand success')
        }else {
            toastUtil.error(result.body.message);
        }
    }

    async editBrand(){
        let {id, name, description, logoUrl} = this.dataRequest;

        if(!name) {
            toastUtil.warning('Vui lòng nhập Name');
            return false;
        }
        if(!description) {
            toastUtil.warning('Vui lòng nhập Description');
            return false;
        }
        if(!logoUrl) {
            toastUtil.warning('Vui lòng chọn logoUrl');
            return false;
        }

        const result = await brandService.editBrand(id, name, description, logoUrl);

        if(result.status === HttpStatusCode.OK){
            await this.getBrand();
            this.clearForm()
            $('#close_edit').trigger("click")
            toastUtil.success('Edit brand success')
        }else {
            toastUtil.error(result.body.message);
        }
    }


}

export const brandStore = new BrandStore();

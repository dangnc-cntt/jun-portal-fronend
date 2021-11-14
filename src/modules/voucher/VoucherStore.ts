import {action, observable} from "mobx";
import {voucherService} from "./VoucherService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {toastUtil} from "../../common/utils/ToastUtil";
import $ from "jquery"

interface IDataRequest{
    id?: number,
    imageUrl: string,
    name: string,
    code: string,
    discount: string,
    description: string,
    type: string,
    state: string,
    date: any
}


class VoucherStore {
    @observable public isLoading: boolean = false;
    @observable public voucherId: number = 0;
    @observable public listVoucher: any[] = [];
    @observable public dataRequest: IDataRequest = {
        imageUrl: "",
        name: "",
        code: "",
        discount: "",
        description: '',
        type: '',
        state: '',
        date: ''
    };


    @action async getVoucher() {
        const result = await voucherService.getVoucher();
        if (result.status === HttpStatusCode.OK) {
            this.listVoucher = result.body.data;
        }
    }

    async detail(id: any){
        const result = await voucherService.detailVoucher(id);

        if(result.status === HttpStatusCode.OK){
            this.dataRequest = result.body;
        }else {
            toastUtil.error(result.body.message);
        }
    }

    async add(){
        let  {code, description, discount, date, imageUrl, name, state, type} = this.dataRequest;

        if(!name) {
            toastUtil.warning("Vui lòng nhập name!")
            return false;
        }
        if(!code) {
            toastUtil.warning("Vui lòng nhập code!")
            return false;
        }
        if(!discount) {
            toastUtil.warning("Vui lòng nhập discount!")
            return false;
        }
        if(!imageUrl) {
            toastUtil.warning("Vui lòng chọn image!")
            return false;
        }
        if(!date) {
            toastUtil.warning("Vui lòng chọn expiryDate!")
            return false;
        }
        if(!description) {
            toastUtil.warning("Vui lòng nhập description!")
            return false;
        }
        if(!type) {
            toastUtil.warning("Vui lòng chọn type!")
            return false;
        }
        if(!state) {
            toastUtil.warning("Vui lòng chọn state!")
            return false;
        }

        let data: IDataRequest = {
            name: name,
            type: type,
            state: state,
            imageUrl: imageUrl,
            date: date,
            discount: discount,
            description: description,
            code: code
        }
        const result = await voucherService.addVoucher(data);

        if(result.status === HttpStatusCode.OK){
            await this.getVoucher();
            $('#close_add').trigger("click")
            toastUtil.success('Add voucher success')
        }else {
            toastUtil.error(result.body.message);
        }
    }

    async edit(){
        let  {id, code, description, discount, date, imageUrl, name, state, type} = this.dataRequest;

        if(!name) {
            toastUtil.warning("Vui lòng nhập name!")
            return false;
        }
        if(!code) {
            toastUtil.warning("Vui lòng nhập code!")
            return false;
        }
        if(!discount) {
            toastUtil.warning("Vui lòng nhập discount!")
            return false;
        }
        if(!imageUrl) {
            toastUtil.warning("Vui lòng chọn image!")
            return false;
        }
        if(!date) {
            toastUtil.warning("Vui lòng chọn expiryDate!")
            return false;
        }
        if(!description) {
            toastUtil.warning("Vui lòng nhập description!")
            return false;
        }
        if(!type) {
            toastUtil.warning("Vui lòng chọn type!")
            return false;
        }
        if(!state) {
            toastUtil.warning("Vui lòng chọn state!")
            return false;
        }

        let data: IDataRequest = {
            name: name,
            type: type,
            state: state,
            imageUrl: imageUrl,
            date: date,
            discount: discount,
            description: description,
            code: code
        }

        const result = await voucherService.editVoucher(id, data);

        if(result.status === HttpStatusCode.OK){
           toastUtil.success('Edit voucher success')
           this.listVoucher.map((value) => {
               if(value.id === id) {
                   value.name = name;
                   value.code = code;
                   value.imageUrl = imageUrl;
                   value.date = date;
                   value.type = type;
                   value.state = state;
                   value.description = description;
               }
           })
            $('#close_edit').trigger("click")
        }else {
            toastUtil.error(result.body.message);
        }
    }


    async delete(){
        const result = await voucherService.deleteVoucher(this.voucherId);
        if(result.status === HttpStatusCode.OK){
            this.listVoucher.map((value, i) => {
                if(value.id === this.voucherId){
                    this.listVoucher.splice(i, 1)
                }
            })
            $('#close_delete').trigger("click")
            toastUtil.success('Delete voucher success')
        }else {
            toastUtil.error(result.body.message);
        }
    }


}

export const voucherStore = new VoucherStore();

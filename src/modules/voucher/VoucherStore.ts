import {action, observable} from "mobx";
import {voucherService} from "./VoucherService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {toastUtil} from "../../common/utils/ToastUtil";
import $ from "jquery";
import {getLocalDateTime} from "../../common/utils/Utils";


interface IDataRequest{
    id?: number,
    imageUrl: string,
    name: string,
    code: string,
    discount: string,
    description: string,
    type: string,
    state: string,
    expiryDate: any
}


class VoucherStore {
    @observable public isLoading: boolean = false;
    @observable public voucherId: number = 0;
    @observable public listVoucher: any[] = [];
    @observable public searchName: string = '';
    @observable public code: string = "";
    @observable public page: number = 0;
    @observable public totalPages: number = 0;
    @observable public paramsAddVoucher: {type: string, accountIds: any[]
    } = {
        type: '',
        accountIds: []
    };


    @observable public dataRequest: IDataRequest = {
        imageUrl: "",
        name: "",
        code: "",
        discount: "",
        description: '',
        type: '',
        state: '',
        expiryDate: ''
    };


    @action async getVoucher() {
        const result = await voucherService.getVoucher();
        if (result.status === HttpStatusCode.OK) {
            this.listVoucher = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
        }
    }

    async detail(id: any){
        const result = await voucherService.detailVoucher(id);

        if(result.status === HttpStatusCode.OK){
            result.body.expiryDate = getLocalDateTime(result.body.expiryDate, "yyyy/mm/dd hh:m_m");
            this.dataRequest = result.body;
        }else {
            toastUtil.error(result.body.message);
        }
    }

    async addVoucherUser(){
        let {type, accountIds} = this.paramsAddVoucher;

        const result = await voucherService.addVoucherUser(this.voucherId, type, accountIds);

        if(result.status === 200){
            toastUtil.success('Add voucher user success');
            $('#close_add_voucher_user').trigger("click");
            voucherStore.paramsAddVoucher.accountIds = [];
            voucherStore.paramsAddVoucher.type = '';
        }
    }


    async add(){
        let  {code, description, discount, expiryDate, imageUrl, name, state, type} = this.dataRequest;

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
        if(!expiryDate) {
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

        let data: any = {
            name: name,
            type: type,
            state: state,
            imageUrl: imageUrl,
            date: expiryDate,
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
        let  {id, code, description, discount, expiryDate, imageUrl, name, state, type} = this.dataRequest;

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
        if(!expiryDate) {
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

        let data: any = {
            name: name,
            type: type,
            state: state,
            imageUrl: imageUrl,
            date: expiryDate,
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
                   value.expiryDate = expiryDate;
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

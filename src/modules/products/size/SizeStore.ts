import {action, observable} from "mobx";
import HttpStatusCode from "../../../common/constants/HttpErrorCode";
import {toastUtil} from "../../../common/utils/ToastUtil";
import {sizeService} from "./SizeService";
import $ from "jquery"

class SizeStore {
    @observable public isLoading: boolean = false;
    @observable public sizeId: number = 0;
    @observable public listSize: any[] = [];
    @observable public dataRequest: any = {
        id: 0,
        name: "",
    };


    @action async getSize() {
        const result = await sizeService.getSize();
        if (result.status === HttpStatusCode.OK) {
            this.listSize = result.body;
        }
    }


    @action async cateDetail(id: number) {
        const result = await sizeService.sizeDetail(id);
        if (result.status === HttpStatusCode.OK) {
            this.dataRequest = result.body;
        } else {
            toastUtil.error(result.body.message);
        }
    }

    async addSize(){

        if(!this.dataRequest.name) {
            toastUtil.warning('Vui lòng nhập Name');
            return false;
        }

        const result = await sizeService.addSize(this.dataRequest.name);

        if(result.status === HttpStatusCode.OK){
            await this.getSize();
            this.dataRequest.name = ""
            $('#close_add_size').trigger("click")
            toastUtil.success('Add size success')
        }else {
            toastUtil.error(result.body.message);
        }
    }


    async deleteSize(){
        const result = await sizeService.deleteSize(this.sizeId);
        if(result.status === HttpStatusCode.OK){
            this.listSize.map((value, i) => {
                if(value.id === this.sizeId){
                    this.listSize.splice(i, 1)
                }
            })
            $('#close_delete_size').trigger("click")
            toastUtil.success('Delete size success')
        }else {
            toastUtil.error(result.body.message);
        }
    }


}

export const sizeStore = new SizeStore();

import {action, observable} from "mobx";
import HttpStatusCode from "../../../common/constants/HttpErrorCode";
import {toastUtil} from "../../../common/utils/ToastUtil";
import {colorService} from "./ColorService";
import $ from "jquery"

class ColorStore {
    @observable public isLoading: boolean = false;
    @observable public colorId: number = 0;
    @observable public listColor: any[] = [];
    @observable public dataRequest: any = {
        id: 0,
        name: "",
    };


    @action async getColor() {
        const result = await colorService.getColor();
        if (result.status === HttpStatusCode.OK) {
            this.listColor = result.body;
        }
    }


    @action async cateDetail(id: number) {
        const result = await colorService.colorDetail(id);
        if (result.status === HttpStatusCode.OK) {
            this.dataRequest = result.body;
        } else {
            toastUtil.error(result.body.message);
        }
    }
    
    async addColor(){

        if(!this.dataRequest.name) {
            toastUtil.warning('Vui lòng nhập Name');
            return false;
        }

        const result = await colorService.addColor(this.dataRequest.name);

        if(result.status === HttpStatusCode.OK){
            await this.getColor();
            this.dataRequest.name = "";
            $('#close_add_color').trigger("click")
            toastUtil.success('Add color success')
        }else {
            toastUtil.error(result.body.message);
        }
    }


    async deleteColor(){
        const result = await colorService.deleteColor(this.colorId);
        if(result.status === HttpStatusCode.OK){
            this.listColor.map((value, i) => {
                if(value.id === this.colorId){
                    this.listColor.splice(i, 1)
                }
            })
            $('#close_delete_color').trigger("click")
            toastUtil.success('Delete color success')
        }else {
            toastUtil.error(result.body.message);
        }
    }


}

export const colorStore = new ColorStore();

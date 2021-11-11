import {action, observable} from "mobx";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {toastUtil} from "../../common/utils/ToastUtil";
import {categoryService} from "./CategoryService";
import $ from "jquery"

class CategoryStore {
    @observable public isLoading: boolean = false;
    @observable public isLoadingButton: boolean = false;
    @observable public searchName: string = '';
    @observable public cateId: number = 0;
    @observable public page: number = 0;
    @observable public state: string = "";
    @observable public totalPages: number = 0;
    @observable public listCate: any[] = [];
    @observable public dataRequest: any = {
        id: 0,
        name: "",
        imageUrl: "",
        description: "",
        state: ""
    };

    @action async clearForm() {
        this.dataRequest = {
            id: 0,
            name: "",
            imageUrl: "",
            description: "",
            state: ""
        }
    }

    @action async getCate() {
        const result = await categoryService.getCategory();
        if (result.status === HttpStatusCode.OK) {
            this.listCate = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
        } else {
            toastUtil.error(result.body.message);
        }
    }


    @action async cateDetail(id: number) {
        const result = await categoryService.categoryDetail(id);
        if (result.status === HttpStatusCode.OK) {
            this.dataRequest = result.body;
        } else {
            toastUtil.error(result.body.message);
        }
    }
    
    async addCate(){
        let { name, imageUrl, description, state} = this.dataRequest;

        if(!name) {
            toastUtil.warning('Vui lòng nhập Name');
            return false;
        }
        if(!imageUrl) {
            toastUtil.warning('Vui lòng chọn AvatarUrl');
            return false;
        }
        if(!description) {
            toastUtil.warning('Vui lòng nhập Description');
            return false;
        }
        if(!state) {
            toastUtil.warning('Vui lòng chọn State');
            return false;
        }

        const result = await categoryService.addCate(this.dataRequest);

        if(result.status === HttpStatusCode.OK){
            await this.getCate();
            $('#close_add_cate').trigger("click")
            toastUtil.success('Add category success')
        }else {
            toastUtil.error(result.body.message);
        }
    }


    async editCate(){
        let {id, name, imageUrl, description, state} = this.dataRequest;

        if(!name) {
            toastUtil.warning('Vui lòng nhập Name');
            return false;
        }
        if(!imageUrl) {
            toastUtil.warning('Vui lòng chọn AvatarUrl');
            return false;
        }
        if(!description) {
            toastUtil.warning('Vui lòng nhập Description');
            return false;
        }
        if(!state) {
            toastUtil.warning('Vui lòng chọn State');
            return false;
        }
        const result = await categoryService.editCate(id, this.dataRequest);

        if(result.status === HttpStatusCode.OK){
            await this.getCate();
            $('#close_edit_cate').trigger("click")
            toastUtil.success('Update category success')
        }else {
            toastUtil.error(result.body.message);
        }
    }

    async deleteCate(){
        const result = await categoryService.deleteCate(this.cateId);
        if(result.status === HttpStatusCode.OK){
            this.listCate.map((value, i) => {
                if(value.id === this.cateId){
                    this.listCate.splice(i, 1)
                }
            })
            $('#close_delete_cate').trigger("click")
            toastUtil.success('Delete category success')
        }else {
            toastUtil.error(result.body.message);
        }
    }


}

export const categoryStore = new CategoryStore();

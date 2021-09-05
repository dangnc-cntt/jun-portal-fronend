import {observable} from "mobx";


export interface BreadScrumItem {
    name: string,
    link: string
}


class CommonStore {
    @observable
    breadScrumList: BreadScrumItem[] = [];
}

export const commonStore=new CommonStore();

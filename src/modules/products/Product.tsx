import React, {Component} from 'react';
import {observer} from "mobx-react";
import Loading from "../../common/component/Loading";
import NoContent from "../../common/component/NoContent";
import {productStore} from "./ProductStore";
import DeleteProduct from "./components/DeleteProduct";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";


@observer
class Product extends Component {

    async componentDidMount() {
        await productStore.getProduct()
    }


    render() {
        return (
            <div className="product_">
                <div className="content-wrapper">
                    <div className=" d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center justify-content-between">
                            <h3 className="mb-0">Product</h3>
                            <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#addProduct" onClick={() => productStore.clearForm()}>Create</button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            {productStore.isLoading ? <Loading/> :
                                <div className="table-responsive mt-4">
                                    {productStore.listProduct && productStore.listProduct.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>Id</strong></th>
                                                <th><strong>Images</strong></th>
                                                <th><strong>Name</strong></th>
                                                <th><strong>Category Id</strong></th>
                                                <th><strong>Is Hot</strong></th>
                                                <th><strong>State</strong></th>
                                                <th className="text-center"><strong>Actions</strong></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {productStore.listProduct.map((item, i) => (
                                                <tr key={i} className="position-relative">
                                                    <td>{item.id}</td>
                                                    <td>{item.imageUrls && <img src={item.imageUrls[0]} alt=""/>}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.categoryId}</td>
                                                    <td>{item.isHot.toString()}</td>
                                                    <td>{item.state}</td>
                                                    <td width="5%" className="text-center">
                                                        <div className="btn-group">
                                                            <button type="button"
                                                                    onClick={() => productStore.getProductDetail(item.id)}
                                                                    className="btn btn-inverse-warning btn-icon"
                                                                    data-toggle="modal" data-target="#editProduct">
                                                                <i className="far fa-pen"/>
                                                            </button>
                                                            {/*<button type="button"*/}
                                                            {/*        onClick={() => productStore.productId = item.id}*/}
                                                            {/*        className="btn btn-inverse-danger btn-icon"*/}
                                                            {/*        data-toggle="modal" data-target="#deleteProduct">*/}
                                                            {/*    <i className="far fa-trash-alt"/>*/}
                                                            {/*</button>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        : <div className="p-5"> <NoContent/> </div> }
                                </div>
                            }
                        </div>
                    </div>
                    <AddProduct/>
                    <EditProduct/>
                    {/*<DeleteProduct/>*/}
                </div>
            </div>
        );
    }
}

export default Product;
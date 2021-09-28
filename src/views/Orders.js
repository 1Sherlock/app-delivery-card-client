import React, {useEffect, useState} from 'react';
import {Collapse, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {connect} from "react-redux";
import {changeStatus, getOrderInfo, getOrders, updateState} from "../redux/actions/orderAction";
import {ORDER_STATUS, ORDER_STATUSES, ORDER_TYPES} from "../tools/constants";
import {AvForm, AvField} from "availity-reactstrap-validation"
import PaginationComponent from "../components/PaginationComponent";

const Orders = (props) => {
    const [show, setShow] = useState(-1);

    useEffect(() => {
        props.getOrders(0);
    }, [])

    const changeShow = (index) => {
        setShow(show === index ? -1 : index);
    }

    const changeModal = () => {
        props.updateState({isOpen: false, selectedOrder: null})
    }

    const changeModalChange = () => {
        props.updateState({isOpenChange: false, selectedOrderChange: null})
    }

    const getData = (payload) => {
        props.getOrders(payload.page);
    }

    return (
        <div className="content">
            <div className="container-fluid">
                {/*<div className="row mb-3 order-header">*/}

                {/*    <div className="col-2">*/}
                {/*        <h4 className="mb-0 font-acrom-bold mt-0">ИД</h4>*/}
                {/*    </div>*/}
                {/*    <div className="col-2">*/}
                {/*        <h4 className="mb-0 font-acrom-bold mt-0">Ф.И.О</h4>*/}
                {/*    </div>*/}
                {/*    <div className="col-2">*/}
                {/*        <h4 className="mb-0 font-acrom-bold mt-0">Дата</h4>*/}
                {/*    </div>*/}
                {/*    <div className="col-2">*/}
                {/*        <h4 className="mb-0 font-acrom-bold mt-0">Тип заказа</h4>*/}
                {/*    </div>*/}
                {/*    <div className="col-2">*/}
                {/*        <h4 className="mb-0 font-acrom-bold mt-0">Номер телефона</h4>*/}
                {/*    </div>*/}
                {/*    <div className="col-2">*/}
                {/*        <h4 className="mb-0 font-acrom-bold mt-0">Филиал</h4>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>ИД</th>
                        <th>Ф.И.О</th>
                        <th>Дата</th>
                        <th>Тип заказа</th>
                        <th>Статус заказа</th>
                        <th>Номер телефона</th>
                        <th>Филиал</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.orders?.map((item, index) => (
                        <tr onClick={() => changeShow(index)} >
                            <td className={item.status === 10 ? "text-success" : ""}>{item.number}</td>
                            <td className={item.status === 10 ? "text-success" : ""}>{item.client}</td>
                            <td className={item.status === 10 ? "text-success" : ""}>{item.date ? item.date.substr(0, 10) + " " + item.date.substr(11, 5) : ""}</td>
                            <td className={item.status === 10 ? "text-success" : ""}>{ORDER_TYPES[item.type]}</td>
                            <td className={item.status === 10 ? "text-success" : ""} >{item.statusDesc}</td>
                            <td className={item.status === 10 ? "text-success" : ""}>{item.clientPhone}</td>
                            <td className={item.status === 10 ? "text-success" : ""}>{item.branch}</td>
                            <td>
                                <button type="button" className="btn btn-success my-1 mr-2" onClick={() => {
                                    props.updateState({isOpen: true, selectedOrder: item});
                                    props.getOrderInfo(item.id)
                                }}>Информация
                                </button>
                                <button type="button" className="btn btn-primary my-1" onClick={() => {
                                    props.updateState({isOpenChange: true, selectedOrderChange: item})
                                }}>Изменить статус
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <PaginationComponent
                    totalPages={props.totalPages}
                    currentPage={props.page}
                    getPageData={getData}
                />
            </div>


            <Modal isOpen={props.isOpen} toggle={changeModal} size="xl">
                <ModalHeader>
                    Информация о заказе
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-4">
                            <h5>Заказ</h5>

                            <p className="mb-0">Курер</p>
                            <h6 className="mb-3">{props.selectedOrder?.courier ? props.selectedOrder?.courier : "-"}</h6>

                            <p className="mb-0">Адрес доставки (lat/long)</p>
                            <h6>{props.selectedOrder?.deliveryAddress ? props.selectedOrder?.deliveryAddress : "-"}</h6>
                            <h6 className="mb-3">{props.selectedOrder?.deliveryLatitude ? props.selectedOrder?.deliveryLatitude : "-"} / {props.selectedOrder?.deliveryLongitude ? props.selectedOrder?.deliveryLongitude : "-"}</h6>

                            <p className="mb-0">Дата доставки (min/max)</p>
                            <h6>{props.selectedOrder?.deliveryDate ? props.selectedOrder?.deliveryDate.substr(0, 10) + " " + props.selectedOrder?.deliveryDate.substr(11, 5) : ""}</h6>
                            <h6 className="mb-3">{props.selectedOrder?.deliveryTimeMax ? props.selectedOrder?.deliveryTimeMax.substr(0, 10) + " " + props.selectedOrder?.deliveryTimeMax.substr(11, 5) : ""} / {props.selectedOrder?.deliveryTimeMin ? props.selectedOrder?.deliveryTimeMin.substr(0, 10) + " " + props.selectedOrder?.deliveryTimeMin.substr(11, 5) : ""}</h6>

                            <p className="mb-0">Статус</p>
                            <h6 className="mb-3">{props.selectedOrder?.statusDesc ? props.selectedOrder?.statusDesc : "-"}</h6>

                            <p className="mb-0">User</p>
                            <h6 className="mb-3">{props.selectedOrder?.user ? props.selectedOrder?.user : "-"}</h6>
                        </div>
                        {props.orderInfo &&
                            <>
                                <div className="col-md-4">
                                    <h5>Платежы</h5>

                                    {props.orderInfo.payments.length > 0 ?
                                        props.orderInfo.payments.map((item, index) => (
                                            <div>
                                                <p className="mb-0">Номер</p>
                                                <h6 className="mb-3">{item.number ? item.number : "-"}</h6>

                                                <p className="mb-0">Дата</p>
                                                <h6>{item.date ? item.date.substr(0, 10) + " " + item.date.substr(11, 5) : ""}</h6>

                                                <p className="mb-0">Номер и срок годности карты</p>
                                                <h6 className="mb-3">{item.cardNumber ? item.cardNumber : "-"} {item.cardExpiry ? item.cardExpiry : "-"}</h6>

                                                <p className="mb-0">Деньги карты</p>
                                                <h6 className="mb-3">{item.cardAmount ? item.cardAmount : "-"}</h6>

                                                <p className="mb-0">Цена доставки</p>
                                                <h6 className="mb-3">{item.deliveryAmount ? item.deliveryAmount : "-"}</h6>

                                                <p className="mb-0">User</p>
                                                <h6 className="mb-3">{item.user ? item.user : "-"}</h6>

                                                <p className="mb-0">Телефон номер карты</p>
                                                <h6 className="mb-3">{item.cardPhone ? item.cardPhone : "-"}</h6>

                                                <p className="mb-0">Филиал</p>
                                                <h6 className="mb-3">{item.branch ? item.branch : "-"}</h6>

                                                <p className="mb-0">procHoldId</p>
                                                <h6 className="mb-3">{item.procHoldId ? item.procHoldId : "-"}</h6>

                                                <p className="mb-0">procTranId</p>
                                                <h6 className="mb-3">{item.procTranId ? item.procTranId : "-"}</h6>

                                                <p className="mb-0">procDeliveryHoldId</p>
                                                <h6 className="mb-3">{item.procDeliveryHoldId ? item.procDeliveryHoldId : "-"}</h6>

                                                <p className="mb-0">procDeliveryTranId</p>
                                                <h6 className="mb-3">{item.procDeliveryTranId ? item.procDeliveryTranId : "-"}</h6>

                                                <p className="mb-0">Статус</p>
                                                <h6 className="mb-3">{item.statusDesc ? item.statusDesc : "-"}</h6>

                                                <p className="mb-0">merchantTransactionId</p>
                                                <h6 className="mb-3">{item.merchantTransactionId ? item.merchantTransactionId : "-"}</h6>


                                            </div>
                                        )) : <h4 className="text-muted">Пока что нет платежей</h4>
                                    }


                                </div>
                                <div className="col-md-4">
                                    <h5>Карты</h5>

                                    {props.orderInfo.cards.length > 0 ?
                                        props.orderInfo.cards.map((item, index) => (
                                            <div>
                                                <p className="mb-0">iabsApplicationId</p>
                                                <h6 className="mb-3">{item.iabsApplicationId ? item.iabsApplicationId : "-"}</h6>

                                                <p className="mb-0">iabsCardCode</p>
                                                <h6 className="mb-3">{item.iabsCardCode ? item.iabsCardCode : "-"}</h6>

                                                <p className="mb-0">Тип контракта</p>
                                                <h6 className="mb-3">{item.contractType ? item.contractType : "-"}</h6>

                                                <p className="mb-0">Ид контракта</p>
                                                <h6 className="mb-3">{item.contractId ? item.contractId : "-"}</h6>

                                                <p className="mb-0">Номер и срок годности карты </p>
                                                <h6 className="mb-3">{item.cardNumber ? item.cardNumber : "-"} {item.dateExpire ? item.dateExpire : "-"}</h6>

                                                <p className="mb-0">Статус</p>
                                                <h6 className="mb-3">{item.status ? item.status : "-"}</h6>

                                                <p className="mb-0">Цена карты</p>
                                                <h6 className="mb-3">{item.cardPrice ? item.cardPrice : "-"}</h6>

                                                <p className="mb-0">Тип карты</p>
                                                <h6 className="mb-3">{item.cardType ? item.cardType : "-"}</h6>
                                            </div>
                                        )) : <h4 className="text-muted">Пока что нет карты</h4>
                                    }


                                </div>

                            </>
                        }
                    </div>

                </ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-secondary" onClick={changeModal}>Закрыт</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={props.isOpenChange} toggle={changeModalChange}>
                <AvForm onValidSubmit={props.changeStatus}>
                    <ModalHeader>
                        Изменить статус заказа
                    </ModalHeader>
                    <ModalBody>
                        <AvField type="select" required name="status" label="Статус">
                            <option>Выберите</option>
                            {ORDER_STATUSES.map((item, index) => {
                                return item.length > 0 ? <option value={index}>{item}</option> : ""
                            })}
                        </AvField>
                        <AvField type="text" required name="courier" label="Курьер"/>
                    </ModalBody>
                    <ModalFooter>
                        <button type="submit" className="btn btn-success">Изменить</button>
                        <button type="button" className="btn btn-secondary" onClick={changeModalChange}>Закрыт</button>
                    </ModalFooter>
                </AvForm>
            </Modal>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        isLoading: state.order.isLoading,
        page: state.order.page,
        totalPages: state.order.totalPages,
        selectedOrder: state.order.selectedOrder,
        isOpen: state.order.isOpen,
        isOpenChange: state.order.isOpenChange,
        orderInfo: state.order.orderInfo
    }
}

export default connect(mapStateToProps, {getOrders, updateState, changeStatus, getOrderInfo})(Orders);
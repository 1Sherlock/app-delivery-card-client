import React, {useEffect, useState} from 'react';
import {Collapse, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {connect} from "react-redux";
import {changeStatus, getOrders, updateState} from "../redux/actions/orderAction";
import {ORDER_STATUS, ORDER_TYPES} from "../tools/constants";
import {AvForm, AvField} from "availity-reactstrap-validation"
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

    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row mb-3 order-header">
                    <div className="col-2">
                        <h4 className="mb-0 font-acrom-bold mt-0">ИД</h4>
                    </div>
                    <div className="col-2">
                        <h4 className="mb-0 font-acrom-bold mt-0">Ф.И.О</h4>
                    </div>
                    <div className="col-2">
                        <h4 className="mb-0 font-acrom-bold mt-0">Дата</h4>
                    </div>
                    <div className="col-2">
                        <h4 className="mb-0 font-acrom-bold mt-0">Тип заказа</h4>
                    </div>
                    <div className="col-2">
                        <h4 className="mb-0 font-acrom-bold mt-0">Номер телефона</h4>
                    </div>
                    <div className="col-2">
                        <h4 className="mb-0 font-acrom-bold mt-0">Филиал</h4>
                    </div>
                </div>
                <div className="order-list">
                    {props.orders?.map((item, index) => (
                        <div className="order-list-item align-items-center row mb-2">
                            <div className="order-list-item-header w-100 d-flex" onClick={() => changeShow(index)}>
                                <div className="col-2">
                                    <h6 className="my-0">{item.number}</h6>
                                </div>
                                <div className="col-2">
                                    <h6 className="my-0">{item.user}</h6>
                                </div>
                                <div className="col-2">
                                    <h6 className="my-0">{item.date ? item.date.substr(0, 10) + " " + item.date.substr(11, 5) : ""}</h6>
                                </div>
                                <div className="col-2">
                                    <h6 className="my-0">{ORDER_TYPES[item.type]}</h6>
                                </div>
                                <div className="col-2">
                                    <h6 className="my-0">{item.clientPhone}</h6>
                                </div>
                                <div className="col-2">
                                    <h6 className="my-0">{item.branch}</h6>
                                </div>
                            </div>
                            <Collapse isOpen={show === index} className="w-100">
                                <div className="order-list-body row mx-0 w-100 justify-content-center">
                                    {/*<div className="col-8"><h3 className="mt-0 font-acrom-bold mb-4 text-center">Персональная информация</h3></div>*/}
                                    <div className="col-4"><h3
                                        className="mt-0 font-acrom-bold mb-4 text-center">Информация о заказе</h3></div>

                                </div>
                                <div className="row order-list-body">
                                    <div className="col-3 offset-2">
                                        <p className="mt-0 mb-1">Тип заказа</p>
                                        <h2 className="mt-0 mb-3 font-acrom-bold">{item.typeDesc}</h2>

                                        <p className="mt-0 mb-1">Достака</p>
                                        <h2 className="mt-0 mb-3 font-acrom-bold">{item.withDelivery ? "Есть" : "Нет"}</h2>

                                        {item.withDelivery ?
                                            <>
                                                <p className="mt-0 mb-1">Адрес доставки</p>
                                                <h2 className="mt-0 mb-3 font-acrom-bold">{item.deliveryAddress}</h2>
                                                <p className="mt-0 mb-1">Дата доставки</p>
                                                <h2 className="mt-0 mb-3 font-acrom-bold">{item.deliveryDate ? item.deliveryDate.substr(0, 10) + " " + item.deliveryDate.substr(11, 5) : ""}</h2>
                                                <p className="mt-0 mb-1">Время доставки (мин)</p>
                                                <h2 className="mt-0 mb-3 font-acrom-bold">{item.deliveryTimeMin ? item.deliveryTimeMin.substr(0, 10) + " " + item.deliveryTimeMin.substr(11, 5) : ""}</h2>
                                                <p className="mt-0 mb-1">Время доставки (мах)</p>
                                                <h2 className="mt-0 mb-3 font-acrom-bold">{item.deliveryTimeMax ? item.deliveryTimeMax.substr(0, 10) + " " + item.deliveryTimeMax.substr(11, 5) : ""}</h2>
                                            </> : ""
                                        }

                                    </div>
                                    <div className="col-3">
                                        <p className="mt-0 mb-1">Адрес доставки (лат / лонг)</p>
                                        <h2 className="mt-0 mb-3 font-acrom-bold">{item.deliveryLatitude} / {item.deliveryLongitude}</h2>

                                        <p className="mt-0 mb-1">Статус заказа</p>
                                        <h2 className="mt-0 mb-3 font-acrom-bold">{ORDER_STATUS[item.status]}</h2>
                                        <p className="mt-0 mb-1">Описание статуса заказа</p>
                                        <h2 className="mt-0 mb-3 font-acrom-bold">{item.statusDesc}</h2>
                                    </div>
                                    <div className="col-4">
                                        <p className="mt-0 mb-1">Регион</p>
                                        <h2 className="mt-0 mb-3 font-acrom-bold">{item.region}</h2>

                                        <p className="mt-0 mb-1">Курьер</p>
                                        <h2 className="mt-0 mb-3 font-acrom-bold">{item.courier}</h2>
                                        <button type="button" className="btn btn-primary"
                                                onClick={() => props.updateState({
                                                    isOpen: true,
                                                    selectedOrder: item
                                                })}>Информация
                                        </button>
                                        <button type="button" className="btn btn-success"
                                                onClick={() => props.updateState({
                                                    isOpenChange: true,
                                                    selectedOrderChange: item
                                                })}>Изменить статус
                                        </button>
                                    </div>
                                </div>
                            </Collapse>
                        </div>
                    ))}

                    {/*<div className="order-list-item align-items-center row mb-2">*/}
                    {/*    <div className="order-list-item-header w-100 d-flex" onClick={() => changeShow(1)}>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">3239490329</h6>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">Muxammatov N.</h6>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">20.11.2020</h6>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">Перевыпуск</h6>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">Humo</h6>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">Tashkent, Yunusabad</h6>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <Collapse isOpen={show === 1} className="w-100">*/}
                    {/*        <div className="order-list-body row mx-0 w-100 justify-content-center">*/}
                    {/*            /!*<div className="col-8"><h3 className="mt-0 font-acrom-bold mb-4 text-center">Персональная информация</h3></div>*!/*/}
                    {/*            <div className="col-4"><h3 className="mt-0 font-acrom-bold mb-4 text-center">Информация*/}
                    {/*                о заказе</h3></div>*/}

                    {/*        </div>*/}
                    {/*        <div className="row order-list-body">*/}
                    {/*            <div className="col-3 offset-2">*/}
                    {/*                <p className="mt-0 mb-1">ПИНФЛ</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">39391083849203</h2>*/}

                    {/*                <p className="mt-0 mb-1">Passport serial</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">AA 8576746</h2>*/}

                    {/*                <p className="mt-0 mb-1">Дата рождения</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">20.11.1998</h2>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-3">*/}
                    {/*                <p className="mt-0 mb-1">Основной номер телефона</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">+998 93 436 63 31</h2>*/}

                    {/*                <p className="mt-0 mb-1">Вторичный номер телефона</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">+998 33 166 11 31</h2>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-4">*/}
                    {/*                <p className="mt-0 mb-1">Статус платежа</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">Успешно</h2>*/}

                    {/*                <p className="mt-0 mb-1">Статус доставки</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">Доставлено</h2>*/}

                    {/*                <button type="button" className="btn btn-primary"*/}
                    {/*                        onClick={() => props.updateState({isOpen: true})}>Информация*/}
                    {/*                </button>*/}
                    {/*                <button type="button" className="btn btn-success"*/}
                    {/*                        onClick={() => props.updateState({isOpenChange: true})}>Изменить статус*/}
                    {/*                </button>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </Collapse>*/}
                    {/*</div>*/}
                    {/*<div className="order-list-item align-items-center row mb-2">*/}
                    {/*    <div className="order-list-item-header w-100 d-flex" onClick={() => changeShow(2)}>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">3239490329</h6>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">Muxammatov N.</h6>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">20.11.2020</h6>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">Перевыпуск</h6>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">Humo</h6>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">Tashkent, Yunusabad</h6>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <Collapse isOpen={show === 2} className="w-100">*/}
                    {/*        <div className="order-list-body row mx-0 w-100 justify-content-center">*/}
                    {/*            <div className="col-8"><h3*/}
                    {/*                className="mt-0 font-acrom-bold mb-4 text-center">Персональная информация</h3></div>*/}
                    {/*            <div className="col-4"><h3 className="mt-0 font-acrom-bold mb-4 text-center">Информация*/}
                    {/*                о заказе</h3></div>*/}
                    {/*            <div className="col-3 offset-2">*/}
                    {/*                <p className="mt-0 mb-1">ПИНФЛ</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">39391083849203</h2>*/}

                    {/*                <p className="mt-0 mb-1">Passport serial</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">AA 8576746</h2>*/}

                    {/*                <p className="mt-0 mb-1">Дата рождения</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">20.11.1998</h2>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-3">*/}
                    {/*                <p className="mt-0 mb-1">Основной номер телефона</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">+998 93 436 63 31</h2>*/}

                    {/*                <p className="mt-0 mb-1">Вторичный номер телефона</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">+998 33 166 11 31</h2>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-4">*/}
                    {/*                <p className="mt-0 mb-1">Статус платежа</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">Успешно</h2>*/}

                    {/*                <p className="mt-0 mb-1">Статус доставки</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">Доставлено</h2>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </Collapse>*/}
                    {/*</div>*/}
                    {/*<div className="order-list-item align-items-center row mb-2">*/}
                    {/*    <div className="order-list-item-header w-100 d-flex" onClick={() => changeShow(3)}>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">3239490329</h6>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">Muxammatov N.</h6>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">20.11.2020</h6>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">Перевыпуск</h6>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">Humo</h6>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-2">*/}
                    {/*            <h6 className="my-0">Tashkent, Yunusabad</h6>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <Collapse isOpen={show === 3} className="w-100">*/}
                    {/*        <div className="order-list-body row mx-0 w-100 justify-content-center">*/}
                    {/*            <div className="col-8"><h3*/}
                    {/*                className="mt-0 font-acrom-bold mb-4 text-center">Персональная информация</h3></div>*/}
                    {/*            <div className="col-4"><h3 className="mt-0 font-acrom-bold mb-4 text-center">Информация*/}
                    {/*                о заказе</h3></div>*/}
                    {/*            <div className="col-3 offset-2">*/}
                    {/*                <p className="mt-0 mb-1">ПИНФЛ</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">39391083849203</h2>*/}

                    {/*                <p className="mt-0 mb-1">Серия паспорта</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">AA 8576746</h2>*/}

                    {/*                <p className="mt-0 mb-1">Дата рождения</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">20.11.1998</h2>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-3">*/}
                    {/*                <p className="mt-0 mb-1">Основной номер телефона</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">+998 93 436 63 31</h2>*/}

                    {/*                <p className="mt-0 mb-1">Вторичный номер телефона</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">+998 33 166 11 31</h2>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-4">*/}
                    {/*                <p className="mt-0 mb-1">Статус платежа</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">Успешно</h2>*/}

                    {/*                <p className="mt-0 mb-1">Статус доставки</p>*/}
                    {/*                <h2 className="mt-0 mb-3 font-acrom-bold">Доставлено</h2>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </Collapse>*/}
                    {/*</div>*/}
                </div>
            </div>

            <Modal isOpen={props.isOpen} toggle={changeModal}>
                <ModalHeader>
                    Информация о заказе
                </ModalHeader>
                <ModalBody>

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
                        <AvField  type="select required" name="status">
                            <option>Выберите</option>
                            {ORDER_STATUS.map((item, index) => {
                                return item.length > 0 ?
                                    <option value={index}>{item}</option> : ""
                            })}
                        </AvField>
                        <AvField type="text" required name="courier"/>
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
    }
}

export default connect(mapStateToProps, {getOrders, updateState, changeStatus})(Orders);
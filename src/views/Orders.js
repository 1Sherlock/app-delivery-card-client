import React, {useState} from 'react';
import {Collapse} from "reactstrap";

const Orders = () => {
    const [show, setShow] = useState(-1);

    const changeShow = (index) => {
        setShow(show === index ? -1 : index);
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
                        <h4 className="mb-0 font-acrom-bold mt-0">Тип карты</h4>
                    </div>
                    <div className="col-2">
                        <h4 className="mb-0 font-acrom-bold mt-0">Филиал</h4>
                    </div>
                </div>
                <div className="order-list">
                    <div className="order-list-item align-items-center row mb-2">
                        <div className="order-list-item-header w-100 d-flex" onClick={() => changeShow(0)}>
                            <div className="col-2">
                                <h6 className="my-0">3239490329</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">Muxammatov N.</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">20.11.2020</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">Перевыпуск</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">Humo</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">Tashkent, Yunusabad</h6>
                            </div>
                        </div>
                        <Collapse isOpen={show === 0} className="w-100">
                            <div className="order-list-body row mx-0 w-100 justify-content-center">
                                <div className="col-8"><h3 className="mt-0 font-acrom-bold mb-4 text-center">Персональная информация</h3></div>
                                <div className="col-4"><h3 className="mt-0 font-acrom-bold mb-4 text-center">Информация о заказе</h3></div>
                                <div className="col-3 offset-2">
                                    <p className="mt-0 mb-1">ПИНФЛ</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">39391083849203</h2>

                                    <p className="mt-0 mb-1">Passport serial</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">AA 8576746</h2>

                                    <p className="mt-0 mb-1">Дата рождения</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">20.11.1998</h2>
                                </div>
                                <div className="col-3">
                                    <p className="mt-0 mb-1">Основной номер телефона</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">+998 93 436 63 31</h2>

                                    <p className="mt-0 mb-1">Вторичный номер телефона</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">+998 33 166 11 31</h2>
                                </div>
                                <div className="col-4">
                                    <p className="mt-0 mb-1">Статус платежа</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">Успешно</h2>

                                    <p className="mt-0 mb-1">Статус доставки</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">Доставлено</h2>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                    <div className="order-list-item align-items-center row mb-2">
                        <div className="order-list-item-header w-100 d-flex" onClick={() => changeShow(1)}>
                            <div className="col-2">
                                <h6 className="my-0">3239490329</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">Muxammatov N.</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">20.11.2020</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">Перевыпуск</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">Humo</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">Tashkent, Yunusabad</h6>
                            </div>
                        </div>
                        <Collapse isOpen={show === 1} className="w-100">
                            <div className="order-list-body row mx-0 w-100 justify-content-center">
                                <div className="col-8"><h3 className="mt-0 font-acrom-bold mb-4 text-center">Персональная информация</h3></div>
                                <div className="col-4"><h3 className="mt-0 font-acrom-bold mb-4 text-center">Информация о заказе</h3></div>
                                <div className="col-3 offset-2">
                                    <p className="mt-0 mb-1">ПИНФЛ</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">39391083849203</h2>

                                    <p className="mt-0 mb-1">Passport serial</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">AA 8576746</h2>

                                    <p className="mt-0 mb-1">Дата рождения</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">20.11.1998</h2>
                                </div>
                                <div className="col-3">
                                    <p className="mt-0 mb-1">Основной номер телефона</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">+998 93 436 63 31</h2>

                                    <p className="mt-0 mb-1">Вторичный номер телефона</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">+998 33 166 11 31</h2>
                                </div>
                                <div className="col-4">
                                    <p className="mt-0 mb-1">Статус платежа</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">Успешно</h2>

                                    <p className="mt-0 mb-1">Статус доставки</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">Доставлено</h2>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                    <div className="order-list-item align-items-center row mb-2">
                        <div className="order-list-item-header w-100 d-flex" onClick={() => changeShow(2)}>
                            <div className="col-2">
                                <h6 className="my-0">3239490329</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">Muxammatov N.</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">20.11.2020</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">Перевыпуск</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">Humo</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">Tashkent, Yunusabad</h6>
                            </div>
                        </div>
                        <Collapse isOpen={show === 2} className="w-100">
                            <div className="order-list-body row mx-0 w-100 justify-content-center">
                                <div className="col-8"><h3 className="mt-0 font-acrom-bold mb-4 text-center">Персональная информация</h3></div>
                                <div className="col-4"><h3 className="mt-0 font-acrom-bold mb-4 text-center">Информация о заказе</h3></div>
                                <div className="col-3 offset-2">
                                    <p className="mt-0 mb-1">ПИНФЛ</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">39391083849203</h2>

                                    <p className="mt-0 mb-1">Passport serial</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">AA 8576746</h2>

                                    <p className="mt-0 mb-1">Дата рождения</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">20.11.1998</h2>
                                </div>
                                <div className="col-3">
                                    <p className="mt-0 mb-1">Основной номер телефона</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">+998 93 436 63 31</h2>

                                    <p className="mt-0 mb-1">Вторичный номер телефона</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">+998 33 166 11 31</h2>
                                </div>
                                <div className="col-4">
                                    <p className="mt-0 mb-1">Статус платежа</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">Успешно</h2>

                                    <p className="mt-0 mb-1">Статус доставки</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">Доставлено</h2>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                    <div className="order-list-item align-items-center row mb-2">
                        <div className="order-list-item-header w-100 d-flex" onClick={() => changeShow(3)}>
                            <div className="col-2">
                                <h6 className="my-0">3239490329</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">Muxammatov N.</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">20.11.2020</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">Перевыпуск</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">Humo</h6>
                            </div>
                            <div className="col-2">
                                <h6 className="my-0">Tashkent, Yunusabad</h6>
                            </div>
                        </div>
                        <Collapse isOpen={show === 3} className="w-100">
                            <div className="order-list-body row mx-0 w-100 justify-content-center">
                                <div className="col-8"><h3 className="mt-0 font-acrom-bold mb-4 text-center">Персональная информация</h3></div>
                                <div className="col-4"><h3 className="mt-0 font-acrom-bold mb-4 text-center">Информация о заказе</h3></div>
                                <div className="col-3 offset-2">
                                    <p className="mt-0 mb-1">ПИНФЛ</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">39391083849203</h2>

                                    <p className="mt-0 mb-1">Серия паспорта</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">AA 8576746</h2>

                                    <p className="mt-0 mb-1">Дата рождения</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">20.11.1998</h2>
                                </div>
                                <div className="col-3">
                                    <p className="mt-0 mb-1">Основной номер телефона</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">+998 93 436 63 31</h2>

                                    <p className="mt-0 mb-1">Вторичный номер телефона</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">+998 33 166 11 31</h2>
                                </div>
                                <div className="col-4">
                                    <p className="mt-0 mb-1">Статус платежа</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">Успешно</h2>

                                    <p className="mt-0 mb-1">Статус доставки</p>
                                    <h2 className="mt-0 mb-3 font-acrom-bold">Доставлено</h2>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
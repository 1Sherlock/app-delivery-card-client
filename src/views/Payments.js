import React, {useEffect} from 'react';
import {CARD_TYPES, PAYMENT_TYPES} from "../tools/constants";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {connect} from "react-redux";
import {deleteEpos, getEposes, save, updateState} from "../redux/actions/eposAction";
import {getBranches} from "../redux/actions/branchAction";
import {getPayments} from "../redux/actions/paymentAction";
import PaginationComponent from "../components/PaginationComponent";

const Payments = (props) => {
    useEffect(() => {
        props.getPayments(0);
    }, []);

    const changeModal = ()=> {
        props.updateState({
            isOpen: false,
            selectedPayment: null
        })
    }

    const getData = (payload) => {
        props.getPayments(payload.page);
    }

    return (
        <div className="content">
            <div className="container-fluid">
                <table className="table table-hover table-striped table-bordered table-responsive-md">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Мерчант ИД</th>
                        <th>Терминал ИД</th>
                        <th>ПОРТ</th>
                        <th>Процессинг</th>
                        <th>Описание Процессинг</th>
                        <th>Филиал</th>
                        <th>Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.payments?.map((item, index) => (
                        <tr>
                            <td>{item.number}</td>
                            <td>{PAYMENT_TYPES[item.status]}</td>
                            <td>{item.statusDesc}</td>
                            <td>{item.user}</td>
                            <td>{item.branch}</td>
                            <td>
                                <button type="button" className="btn btn-primary my-2 mr-2" onClick={() => {props.updateState({isOpen: true, selectedPayment: item})}}>Информация</button>
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

            <Modal isOpen={props.isOpen} toggle={changeModal}>
                <ModalHeader>
                    Информация о платеже
                </ModalHeader>
                <ModalBody>
                    {props.selectedPayment ?
                        <>
                            <h4>Номер платежа</h4>
                            <p>{props.selectedPayment.number}</p>

                            <h4>Дата</h4>
                            <p>{props.selectedPayment.date ? (props.selectedPayment.date.substr(0, 10) + " " + props.selectedPayment.date.substr(11, 5)) : ""}</p>


                            <h4>Номер карты</h4>
                            <p>{props.selectedPayment.cardNumber}</p>

                            <h4>cardExpiry</h4>
                            <p>{props.selectedPayment.cardExpiry}</p>

                            <h4>cardPhone</h4>
                            <p>{props.selectedPayment.cardPhone}</p>

                            <h4>procHoldId</h4>
                            <p>{props.selectedPayment.procHoldId}</p>

                            <h4>procTranId</h4>
                            <p>{props.selectedPayment.procTranId}</p>

                            <h4>procDeliveryHoldId</h4>
                            <p>{props.selectedPayment.procDeliveryHoldId}</p>

                            <h4>procDeliveryTranId</h4>
                            <p>{props.selectedPayment.procDeliveryTranId}</p>

                            <h4>Статус</h4>
                            <p>{PAYMENT_TYPES[props.selectedPayment.status]}</p>

                            <h4>Описание статуса</h4>
                            <p>{props.selectedPayment.statusDesc}</p>

                            <h4>merchantTransactionId</h4>
                            <p>{props.selectedPayment.merchantTransactionId}</p>

                            <h4>Цена карты</h4>
                            <p>{props.selectedPayment.cardAmount}</p>

                            <h4>Цена доставки</h4>
                            <p>{props.selectedPayment.deliveryAmount}</p>

                            <h4>Пользователь</h4>
                            <p>{props.selectedPayment.user}</p>

                            <h4>Филиал</h4>
                            <p>{props.selectedPayment.branch}</p>
                        </> : ""
                    }

                </ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-secondary" onClick={changeModal}>Закрыт</button>
                </ModalFooter>
            </Modal>


        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.payment.isLoading,
        payments: state.payment.payments,
        page: state.payment.page,
        totalPages: state.payment.totalPages,
        selectedPayment: state.payment.selectedPayment,

    }
}

export default connect(mapStateToProps, {getPayments})(Payments);
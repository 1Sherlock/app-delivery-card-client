import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {deletePrice, getPrices, save, updateState} from "../redux/actions/deliveryPriceAction";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

const DeliveryPrice = (props) => {
    useEffect(() => {
        props.getPrices();
    }, []);

    const changeModal = () => {
        props.updateState({isOpen: !props.isOpen})
    }

    const changeModalDelete = () => {
        props.updateState({isOpenDelete: !props.isOpenDelete})
    }

    return (
        <div className="content">
            <div className="container-fluid">
                <button type="button" className="btn btn-success ml-auto d-block" onClick={() => props.updateState({isOpen: true, selectedPrice: null})}>Добавить цену доставки</button>

                <table className="table table-hover table-striped table-bordered table-responsive-md">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Цена (тийин)</th>
                        <th>Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.prices?.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.amount}</td>
                            <td>
                                <button type="button" className="btn btn-primary my-2 mr-2" onClick={() => {props.updateState({isOpen: true, selectedPrice: item})}}>Изменить</button>
                                <button type="button" className="btn btn-danger my-2" onClick={() => props.updateState({isOpenDelete: true, priceId: item.id})}>Удалить</button>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>

            <Modal isOpen={props.isOpen} toggle={changeModal}>
                <AvForm onValidSubmit={props.save} model={props.selectedPrice}>
                    <ModalHeader>
                        Добавить цену доставки
                    </ModalHeader>
                    <ModalBody>
                        {props.selectedPrice ?
                            <AvField
                                name="id"
                                reguired
                                type="text"
                                className="d-none"
                            /> : ""
                        }
                        <AvField
                            name="amount"
                            required
                            type="number"
                            label="Цена (тийин)"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <button type="submit" className="btn btn-success" disabled={props.isLoading}>
                            {props.isLoading ?
                                <span className="spinner-border spinner-border-sm mr-2"/> : ""}
                            Сохранить
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={changeModal}>Отменить</button>
                    </ModalFooter>
                </AvForm>
            </Modal>
            <Modal isOpen={props.isOpenDelete} toggle={changeModalDelete}>
                <ModalHeader>
                    Вы точно хотите удалить?
                </ModalHeader>
                <ModalFooter>
                    <button type="button" className="btn btn-danger" onClick={props.deletePrice} disabled={props.isLoading}>
                        {props.isLoading ?
                            <span className="spinner-border spinner-border-sm mr-2"/> : ""}
                        Удалить
                    </button>
                    <button type="button" className="btn btn-secondary">Отменить</button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        prices: state.price.prices,
        isOpen: state.price.isOpen,
        isOpenDelete: state.price.isOpenDelete,
        priceId: state.price.priceId,
        isLoading: state.price.isLoading,
        selectedPrice: state.price.selectedPrice,
    }
}

export default connect(mapStateToProps, {getPrices, updateState, deletePrice, save})(DeliveryPrice);
import React, {useEffect, useState} from 'react';
import {Collapse, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {connect} from "react-redux";
import {getCards, save, updateState, deleteCard} from "../redux/actions/cardAction";
import {AvField, AvForm} from "availity-reactstrap-validation";

const Cards = (props) => {


    useEffect(() => {
        props.getCards();
    }, []);
    const cardTypes = [
        "UzCard",
        "Humo",
        "Visa",
        "MasterCard",
        "UnionPay"
    ];

    const changeModal = () => {
        props.updateState({isOpen: !props.isOpen})
    }

    const changeModalDelete = () => {
        props.updateState({isOpenDelete: !props.isOpenDelete})
    }

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            props.updateState({file: reader.result})
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const changeFile = (e) => {
        getBase64(e.target.files[0]);
    }

    return (
        <div className="content">
            <div className="container-fluid">
                <button type="button" className="btn btn-success ml-auto d-block" onClick={() => props.updateState({isOpen: true, selectedCard: null})}>Добавить карту</button>

                <table className="table table-hover table-striped table-bordered table-responsive-md">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Название</th>
                        <th>Цена (тийин)</th>
                        <th>Тип</th>
                        <th>Комиссия</th>
                        <th>Валюта</th>
                        <th>Валютный код</th>
                        <th>Фото</th>
                        <th>Код</th>
                        <th>Срок годности</th>
                        <th>Описание (КР)</th>
                        <th>Описание (ЭНГ)</th>
                        <th>Описание (ЛАТ)</th>
                        <th>Описание (РУ)</th>
                        <th>Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.cards?.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{cardTypes[item.type]}</td>
                            <td>{item.commission}</td>
                            <td>{item.currency}</td>
                            <td>{item.currencyCode}</td>
                            <td>{item.photo ? <img src={item.photo} alt=""/> : "-"}</td>
                            <td>{item.productCode}</td>
                            <td>{item.lifetime} лет</td>
                            <td>{item.descriptionCr}</td>
                            <td>{item.descriptionEng}</td>
                            <td>{item.descriptionLat}</td>
                            <td>{item.descriptionRus}</td>
                            <td>
                                <button type="button" className="btn btn-primary my-2 mr-2" onClick={() => {props.updateState({isOpen: true, selectedCard: item, file: item.photo})}}>Изменить</button>
                                <button type="button" className="btn btn-danger my-2" onClick={() => props.updateState({isOpenDelete: true, cardId: item.id})}>Удалить</button>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>

            <Modal isOpen={props.isOpen} toggle={changeModal}>
                <AvForm onValidSubmit={props.save} model={props.selectedCard}>
                    <ModalHeader>
                        Добавить карту
                    </ModalHeader>
                    <ModalBody>
                        {props.selectedCard ?
                            <AvField
                                name="id"
                                reguired
                                type="text"
                                className="d-none"
                            /> : ""
                        }
                        <AvField
                            name="name"
                            required
                            type="text"
                            label="Название"
                        />
                        <AvField
                            name="price"
                            required
                            type="number"
                            label="Цена (тийин)"
                        />
                        <AvField
                            name="type"
                            required
                            type="select"
                            label="Тип"
                        >
                            <option value={0}>{cardTypes[0]}</option>
                            <option value={1}>{cardTypes[1]}</option>
                            <option value={2}>{cardTypes[2]}</option>
                            <option value={3}>{cardTypes[3]}</option>
                            <option value={4}>{cardTypes[4]}</option>
                        </AvField>
                        <AvField
                            name="descriptionCr"
                            type="textarea"
                            label="Описание (КР)"
                        />
                        <AvField
                            name="descriptionEng"
                            type="textarea"
                            label="Описание (ЭНГ)"
                        />
                        <AvField
                            name="descriptionLat"
                            type="textarea"
                            label="Описание (ЛАТ)"
                        />
                        <AvField
                            name="descriptionRus"
                            type="textarea"
                            label="Описание (РУ)"
                        />
                        <AvField
                            name="commission"
                            type="number"
                            label="Комиссия"
                            required
                        />
                        <AvField
                            type="text"
                            name="currency"
                            label="Валюта"
                            required
                        />
                        <AvField
                            type="text"
                            name="currencyCode"
                            label="Валютный код"
                            required
                        />
                        <AvField
                            type="text"
                            name="productCode"
                            label="Код"
                            required
                        />
                        <AvField
                            type="number"
                            name="lifetime"
                            label="Срок годности (лет)"
                            required
                        />
                        <input type="file" id="file" onChange={changeFile} name="file"/>
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
                    <button type="button" className="btn btn-danger" onClick={props.deleteCard} disabled={props.isLoading}>
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
        cards: state.card.cards,
        isOpen: state.card.isOpen,
        isOpenDelete: state.card.isOpenDelete,
        cardId: state.card.cardId,
        isLoading: state.card.isLoading,
        selectedCard: state.card.selectedCard
    }
}

export default connect(mapStateToProps, {getCards, updateState, save, deleteCard})(Cards);
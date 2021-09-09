import React, {useEffect} from 'react';
import {Collapse} from "reactstrap";
import {connect} from "react-redux";
import {getCards} from "../redux/actions/cardAction";

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
    return (
        <div className="content">
            <div className="container-fluid">
                <button type="button" className="btn btn-success ml-auto d-block">Добавить карту</button>

                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Название </th>
                            <th>Цена (тийин)</th>
                            <th>Тип</th>
                            <th>Комиссия</th>
                            <th>Валюта</th>
                            <th>Валютный код</th>
                            <th>Фото</th>
                            <th>Код</th>
                            <th>Срок годности</th>
                            <th>Описание</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.cards.map((item, index) => (
                        <tr>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{cardTypes[item.type]}</td>
                            <td>{item.commission}</td>
                            <td>{item.currency}</td>
                            <td>{item.currencyCode}</td>
                            <td>{item.photo?item.photo:"-"}</td>
                            <td>{item.productCode}</td>
                            <td>{item.lifetime} лет</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        cards: state.card.cards
    }
}

export default connect(mapStateToProps, {getCards})(Cards);
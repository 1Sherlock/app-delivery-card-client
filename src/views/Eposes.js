import React, {useEffect} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {connect} from "react-redux";
import {deleteEpos, getEposes, save, updateState} from "../redux/actions/eposAction";
import {getBranches} from "../redux/actions/branchAction";
import {ROLE_NAME} from "../tools/constants";

const Eposes = (props) => {
    useEffect(() => {
        props.getEposes();
        props.getBranches();
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
                <button type="button" className="btn btn-success ml-auto d-block" onClick={() => props.updateState({isOpen: true, selectedUser: null})}>Добавить терминал</button>

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
                    {props.eposes?.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.merchantId}</td>
                            <td>{item.terminalId}</td>
                            <td>{item.port ? item.port : "-"}</td>
                            <td>{item.processing ? item.processing : "-"}</td>
                            <td>{item.processingDesc}</td>
                            <td>{item.branchId ? props.branches?.filter(item22 => item22.id === item.branchId)[0]?.nameRus : "-"}</td>
                            <td>
                                <button type="button" className="btn btn-primary my-2 mr-2" onClick={() => {props.updateState({isOpen: true, selectedEpos: item})}}>Изменить</button>
                                <button type="button" className="btn btn-danger my-2" onClick={() => props.updateState({isOpenDelete: true, eposId: item.id})}>Удалить</button>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>

            <Modal isOpen={props.isOpen} toggle={changeModal}>
                <AvForm onValidSubmit={props.save} model={props.selectedEpos}>
                    <ModalHeader>
                        Добавить терминал
                    </ModalHeader>
                    <ModalBody>
                        {props.selectedEpos ?
                            <AvField
                                name="id"
                                type="text"
                                className="d-none"
                            /> : ""
                        }
                        <AvField
                            name="merchantId"
                            required
                            type="text"
                            label="Мерчант ИД"
                        />
                        <AvField
                            name="terminalId"
                            required
                            type="text"
                            label="Терминал ИД"
                        />

                        <AvField
                            type="port"
                            name="text"
                            label="Порт"
                        />

                        <AvField
                            name="processing"
                            required
                            type="select"
                            label="Процессинг"
                        >
                            <option>Выберите</option>
                            <option value="0">UzCard</option>
                            <option value="1">Humo</option>
                            <option value="2">Visa</option>
                            <option value="3">MasterCard</option>
                            <option value="4">UnionPay</option>
                        </AvField>


                        <AvField
                            name="processingDesc"
                            type="textarea"
                            label="Описание Процессинг"
                        />

                        <AvField
                            name="branchId"
                            type="select"
                            label="Филиал"
                        >
                            <option>Выберите</option>
                            {props.branches?.map(item => (
                                <option value={item.id}>{item.nameRus}</option>
                            ))}
                        </AvField>

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
                    <button type="button" className="btn btn-danger" onClick={props.deleteUser} disabled={props.isLoading}>
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
        eposes: state.epos.eposes,
        isOpen: state.epos.isOpen,
        isOpenDelete: state.epos.isOpenDelete,
        eposId: state.epos.eposId,
        isLoading: state.epos.isLoading,
        selectedEpos: state.epos.selectedEpos,
        branches: state.branch.branches
    }
}

export default connect(mapStateToProps, {getEposes, updateState, deleteEpos, save, getBranches})(Eposes);
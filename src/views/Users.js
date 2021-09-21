import React, {useEffect} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {connect} from "react-redux";
import {deleteUser, getUsers, save, updateState} from "../redux/actions/userAction";
import {getBranches} from "../redux/actions/branchAction";
import {ROLE_NAME} from "../tools/constants";

const Users = (props) => {
    useEffect(() => {
        props.getUsers();
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
                <button type="button" className="btn btn-success ml-auto d-block" onClick={() => props.updateState({isOpen: true, selectedUser: null})}>Добавить ползователь</button>

                <table className="table table-hover table-striped table-bordered table-responsive-md">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>ФИО</th>
                        <th>Username</th>
                        <th>Номер телефона</th>
                        <th>Эмаил</th>
                        <th>Роль</th>
                        <th>Филиал</th>
                        <th>Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.users?.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.fullname}</td>
                            <td>{item.username}</td>
                            <td>{item.phoneNumber ? item.phoneNumber : "-"}</td>
                            <td>{item.eMail ? item.eMail : "-"}</td>
                            <td>{ROLE_NAME[item.role] ? ROLE_NAME[item.role] : "-"}</td>
                            <td>{item.branchId ? props.branches?.filter(item22 => item22.id === item.branchId)[0]?.nameRus : "-"}</td>
                            <td>
                                <button type="button" className="btn btn-primary my-2 mr-2" onClick={() => {props.updateState({isOpen: true, selectedUser: item})}}>Изменить</button>
                                <button type="button" className="btn btn-danger my-2" onClick={() => props.updateState({isOpenDelete: true, userId: item.id})}>Удалить</button>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>

            <Modal isOpen={props.isOpen} toggle={changeModal}>
                <AvForm onValidSubmit={props.save} model={props.selectedUser}>
                    <ModalHeader>
                        Добавить ползователь
                    </ModalHeader>
                    <ModalBody>
                        {props.selectedUser ?
                            <AvField
                                name="id"
                                type="text"
                                className="d-none"
                            /> : ""
                        }
                        <AvField
                            name="fullname"
                            required
                            type="text"
                            label="ФИО"
                        />
                        <AvField
                            name="username"
                            required
                            type="text"
                            label="Username"
                        />

                        <AvField
                            type="password"
                            name="password"
                            label="Пароль"
                        />

                        <AvField
                            name="phoneNumber"
                            type="text"
                            label="Номер телефона"
                        />

                        <AvField
                            name="eMail"
                            type="email"
                            label="Эмаил"
                        />
                        <AvField
                            name="role"
                            required
                            type="select"
                            label="Роль"
                        >
                            <option>Выберите</option>
                            <option value="0">Администратор</option>
                            <option value="1">Партнер</option>
                            <option value="2">Сотрудник ФО</option>
                        </AvField>
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
        users: state.user.users,
        isOpen: state.user.isOpen,
        isOpenDelete: state.user.isOpenDelete,
        userId: state.user.userId,
        isLoading: state.user.isLoading,
        selectedUser: state.user.selectedUser,
        branches: state.branch.branches
    }
}

export default connect(mapStateToProps, {getUsers, updateState, deleteUser, save, getBranches})(Users);
import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {deleteBranch, getBranches, save, updateState} from "../redux/actions/branchAction";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {getRegions} from "../redux/actions/regionAction";

const Filials = (props) => {

    useEffect(() => {
        props.getBranches();
        props.getRegions();
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
                <button type="button" className="btn btn-success ml-auto d-block" onClick={() => props.updateState({isOpen: true, selectedBranch: null})}>Добавить филиал</button>

                <table className="table table-hover table-striped table-bordered table-responsive-md">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Название (КР)</th>
                        <th>Название (ЛАТ)</th>
                        <th>Название (РУС)</th>
                        <th>Название (ЭНГ)</th>
                        <th>МФО</th>
                        <th>Адрес</th>
                        <th>Латтитуд / Лонгитуд</th>
                        <th>Регион</th>
                        <th>Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.branches?.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.nameCr}</td>
                            <td>{item.nameLat}</td>
                            <td>{item.nameRus}</td>
                            <td>{item.nameEng}</td>
                            <td>{item.mfo}</td>
                            <td>{item.address}</td>
                            <td>{item.latitude} / {item.longitude}</td>
                            <td>{item.regionId ?
                                props.regions.filter(item2 => item2.id === item.regionId)[0]?.nameRu : ""
                            }</td>
                            <td>
                                <button type="button" className="btn btn-primary my-2 mr-2" onClick={() => {props.updateState({isOpen: true, selectedBranch: item})}}>Изменить</button>
                                <button type="button" className="btn btn-danger my-2" onClick={() => props.updateState({isOpenDelete: true, branchId: item.id})}>Удалить</button>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>

            <Modal isOpen={props.isOpen} toggle={changeModal}>
                <AvForm onValidSubmit={props.save} model={props.selectedBranch}>
                    <ModalHeader>
                        Добавить филиал
                    </ModalHeader>
                    <ModalBody>
                        {props.selectedBranch ?
                            <AvField
                                name="id"
                                reguired
                                type="text"
                                className="d-none"
                            /> : ""
                        }
                        <AvField
                            name="nameCr"
                            required
                            type="text"
                            label="Название (КР)"
                        />
                        <AvField
                            name="nameLat"
                            required
                            type="text"
                            label="Название (ЛАТ)"
                        />
                        <AvField
                            name="nameRus"
                            required
                            type="text"
                            label="Название (РУ)"
                        />
                        <AvField
                            name="nameEng"
                            required
                            type="text"
                            label="Название (ЭН)"
                        />

                        <AvField
                            type="text"
                            name="mfo"
                            label="МФО"
                            required
                        />
                        <AvField
                            type="text"
                            name="address"
                            label="Адрес"
                            required
                        />
                        <AvField
                            type="number"
                            name="latitude"
                            label="Латитуд"
                            required
                        />
                        <AvField
                            type="number"
                            name="longitude"
                            label="Лонгитуд"
                            required
                        />
                        <AvField
                            type="select"
                            name="regionId"
                            label="Регион"
                            required
                        >
                            <option>Выберите</option>
                            {props.regions.map(item => (
                                <option value={item.id}>{item.nameRu}</option>
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
                    <button type="button" className="btn btn-danger" onClick={props.deleteBranch} disabled={props.isLoading}>
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
        branches: state.branch.branches,
        isOpen: state.branch.isOpen,
        isOpenDelete: state.branch.isOpenDelete,
        branchId: state.branch.branchId,
        isLoading: state.branch.isLoading,
        selectedBranch: state.branch.selectedBranch,
        regions: state.region.regions
    }
}

export default connect(mapStateToProps, {getBranches, updateState, deleteBranch, save, getRegions})(Filials);
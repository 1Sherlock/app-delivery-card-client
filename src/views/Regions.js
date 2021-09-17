import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getRegions, updateState, save, deleteRegion} from "../redux/actions/regionAction";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

const Regions = (props) => {
    useEffect(() => {
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
                <button type="button" className="btn btn-success ml-auto d-block" onClick={() => props.updateState({isOpen: true, selectedRegion: null})}>Добавить регион</button>

                <table className="table table-hover table-striped table-bordered table-responsive-md">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Название (УЗ)</th>
                        <th>Название (РУ)</th>
                        <th>Delivery Code</th>
                        <th>Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.regions?.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.nameRu}</td>
                            <td>{item.deliveryCode}</td>
                            <td>
                                <button type="button" className="btn btn-primary my-2 mr-2" onClick={() => {props.updateState({isOpen: true, selectedRegion: item})}}>Изменить</button>
                                <button type="button" className="btn btn-danger my-2" onClick={() => props.updateState({isOpenDelete: true, regionId: item.id})}>Удалить</button>
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </div>

            <Modal isOpen={props.isOpen} toggle={changeModal}>
                <AvForm onValidSubmit={props.save} model={props.selectedRegion}>
                    <ModalHeader>
                        Добавить регион
                    </ModalHeader>
                    <ModalBody>
                        {props.selectedRegion ?
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
                            label="Название (УЗ)"
                        />
                        <AvField
                            name="nameRu"
                            required
                            type="text"
                            label="Название (РУ)"
                        />

                        <AvField
                            type="text"
                            name="deliveryCode"
                            label="Код"
                            required
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
                    <button type="button" className="btn btn-danger" onClick={props.deleteRegion} disabled={props.isLoading}>
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
        regions: state.region.regions,
        isOpen: state.region.isOpen,
        isOpenDelete: state.region.isOpenDelete,
        regionId: state.region.regionId,
        isLoading: state.region.isLoading,
        selectedRegion: state.region.selectedRegion
    }
}

export default connect(mapStateToProps, {getRegions, updateState, deleteRegion, save})(Regions);
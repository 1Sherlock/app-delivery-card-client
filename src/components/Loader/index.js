/**
 * Created by Sherlock on 07.05.2021.
 */

import React, {useState, useEffect} from 'react';
import styles from "./Loader.module.scss"

const Index = (props) => {



    return (
        !props.hide?
            <div className={styles.loader + " " + (props.hiding ? styles.hiding : "")}>
                <div className={styles.logo} />
                <div className={styles.spinner} />
                <h4 className="font-acrom-medium">Загрузка</h4>
            </div> : ""
    );
};

export default Index;
import React from "react"; 
import styles from './Loader.module.css'
import Head from "next/head";
const Loader = () =>{

return(<>
    <Head>
        <title>Загрузка...</title>
    </Head>

    <div className={styles.container}>
    <div className={styles.box}>

        <div className={styles.title}>
            <span className={styles.block}></span>
            <h1>Загрузка<span></span></h1>
        </div>

        <div className={styles.role}>
            <div className={styles.block}/>
            <p>Не займёт и секунды</p>
        </div>

    </div>
</div>
</>

)
}
export default Loader;
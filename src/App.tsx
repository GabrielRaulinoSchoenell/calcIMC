import React, { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import { levels, calculateImc, Level } from './helpers/imc';
import leftArrow from './assets/leftarrow.png';
import { GridItem } from './components/GridItem/Index';


const App = () => {
  const [heightField, setHeight] = useState<number>(0);
  const [weightField, setWeight] = useState<number>(0);
  const [showItem, setShowItem] = useState<Level | null>(null)

  const changeHeightField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseFloat(event.target.value))
  }
  const changeWeightField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(parseFloat(event.target.value))
  }

  const handleBackButton = ()=>{
    setShowItem(null);
    setHeight(0);
    setWeight(0);
  }

  const handleCalculateButton = () => {
    if (heightField && weightField) {
      setShowItem(calculateImc(heightField, weightField) as Level | null);
    } else {
      alert('digita tudo ai caralho')
    }
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt='' width={150}></img>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para Indice de Massa corporea, parametro usado pela organização mundial da saude para enconrtar o peso ideal para cada pessoa</p>

          <input type='number' placeholder="Digite a sua altura. Ex 1.5 (em metros)" value={heightField > 0 ? heightField : ''} 
          onChange={e => changeHeightField(e)} disabled={showItem ? true : false}/>
          
          <input type='number' placeholder="Digite o seu peso. Ex 75.3 (em quilos)" value={weightField > 0 ? weightField : ''} 
          onChange={e => changeWeightField(e)} disabled={showItem ? true : false}/>

          <button onClick={handleCalculateButton} disabled={showItem? true : false} className={showItem ? styles.disabled : styles.abled}>Calcular</button>
        </div>
        <div className={styles.rightSide}>

          {!showItem &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} data={item} />
              ))}
            </div>
          }

          {showItem &&
            <div className={styles.bigItem}>
              <div className={styles.arrowRight} onClick={handleBackButton}>
                <img src={leftArrow} alt='' width='24'/>
              </div>
              <GridItem data={showItem}/>
            </div>
          }          
        </div>
      </div>
    </div>
  )
}

export default App
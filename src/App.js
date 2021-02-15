import { useSelector, useDispatch } from 'react-redux';

import {
  BUSCAR,
  ACTUALIZAR,
  DETALLE,
  LIMPIAR,
} from './constants';
import './App.css';

const App = () => {
  const dispatch = useDispatch()
  const data = useSelector(
    ({ climaReducer }) => climaReducer.ciudades
  )
  const detalle = useSelector(
    ({ climaReducer }) => climaReducer.select
  )
  const buscarClima = event => {
    event.preventDefault()
    const text = event.target.ciudad.value
    event.target.ciudad.value = ''
    dispatch({ type: BUSCAR, payload: text })
  }
  const actualizarClima = id => {
    dispatch({ type: ACTUALIZAR, payload: id })
  }
  const verDetalle = id => {
    dispatch({ type: DETALLE, payload: id })
  }
  const limpiar = () => {
    dispatch({ type: LIMPIAR })
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => limpiar()}>Limpiar</button>
        <br />
        <form onSubmit={event => buscarClima(event)} >
          <input type='text' name='ciudad' />
          <button>Buscar</button>
        </form>
        <br />
        <div>
          <table>
          <caption>Resultados</caption>
            <tbody>
              <tr>
                <th>#</th>
                <th>Ciudad</th>
                <th>Temperatura</th>
                <th>Acción</th>
              </tr>
              {data.map((ciudad, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{ciudad.name}</td>
                    <td>{ciudad.main.temp}</td>
                    <td>
                      <button onClick={() => actualizarClima(idx)}>Actualizar</button>
                      <button onClick={() => verDetalle(idx)}>Detalle</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <br />
        {detalle && (
          <div>
            <table>
            <caption>Detalle</caption>
              <tbody>
                <tr>
                  <th>Ciudad</th>
                  <th>Temperatura</th>
                  <th>Max</th>
                  <th>Min</th>
                  <th>Sensación Térmica</th>
                  <th>Humedad</th>
                  <th>Presión</th>
                  <th>Acción</th>
                </tr>
                  <tr key={detalle.id}>
                    <td>{detalle.name}</td>
                    <td>{detalle.main.temp}</td>
                    <td>{detalle.main.temp_max}</td>
                    <td>{detalle.main.temp_min}</td>
                    <td>{detalle.main.feels_like}</td>
                    <td>{detalle.main.humidity}</td>
                    <td>{detalle.main.pressure}</td>
                    <td>
                      <button onClick={() => actualizarClima(detalle.id)}>Actualizar</button>
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

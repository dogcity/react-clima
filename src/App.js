import { useSelector, useDispatch } from 'react-redux';

import { buscar, actualizar, detalleId } from './actions/clima';
import './App.css';

const App = () => {
  const dispatch = useDispatch()
  const data = useSelector(
    ({ climaReducer }) => climaReducer.ciudades
  )
  const detalle = useSelector(
    ({ climaReducer }) => climaReducer.selected
  )
  const buscarClima = event => {
    event.preventDefault()
    dispatch(buscar(event.target.ciudad.value))
  }

  const actualizarClima = id => {
    dispatch(actualizar(id))
  }

  const verDetalle = id => {
    dispatch(detalleId(id))
  }

  return (
    <div className="App">
      <header className="App-header">
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

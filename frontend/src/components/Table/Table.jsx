import React from 'react'
import { useNavigate } from 'react-router-dom';
import './table.css'

const Table = ({
  headers, // Array de strings
  content, // Array de objetos
  staticPath, // Parte de la ruta a la que va a redirigir
}) => {
  let navigate = useNavigate();
  const renderHeading = ([key, value]) => {
    return <th className="table__heading" role="columnheader" key={key}>
      {value}
    </th>
  };

  const renderHead = () => (
    <thead className="table__head">
      <tr className="table__row" role="row">
        {Object.entries(headers).map(renderHeading)}
      </tr>
    </thead>
  );

  const rowStyles = {
    cursor: staticPath ? 'pointer' : ''
  }

  const renderRow = row => {
    return <tr className="table__row" style={rowStyles} role="row" key={row.id} onClick={staticPath ? () => navigate(`${staticPath}/${row.id}`) : () => {}}>
      {Object.entries(headers).map(([key, value]) => {
        if(key === "payStatus") {
          switch (row[key]) {
            case "Adeuda":
              return <td className="table__cell" role="cell" style={{color:'var(--red-bg)', fontWeight: 'bold'}} data-label={value} key={key}>
                {row[key]}
              </td>
            case "Pendiente":
              return <td className="table__cell" role="cell" style={{color:'var(--yellow-bg)', fontWeight: 'bold'}} data-label={value} key={key}>
                {row[key]}
              </td>
            default:
              return <td className="table__cell" role="cell" style={{color:'var(--green-bg)', fontWeight: 'bold'}} data-label={value} key={key}>
                {row[key]}
              </td>
          }
        } else if(key === "sessionStatus") {
          switch (row[key]) {
            case "Presencial":
              return <td className="table__cell" role="cell" style={{color:'var(--green-bg)', fontWeight: 'bold'}} data-label={value} key={key}>
                {row[key]}
              </td>
            case "Altas":
              return <td className="table__cell" role="cell" style={{color:'var(--yellow-bg)', fontWeight: 'bold'}} data-label={value} key={key}>
                {row[key]}
              </td>
            case "Entrevista":
              return <td className="table__cell" role="cell" style={{color:'var(--red-bg)', fontWeight: 'bold'}} data-label={value} key={key}>
                {row[key]}
              </td>
            case "Virtual":
              return <td className="table__cell" role="cell" style={{color:'var(--skyblue-bg)', fontWeight: 'bold'}} data-label={value} key={key}>
                {row[key]}
              </td>
            case "No olvidar":
              return <td className="table__cell" role="cell" style={{color:'var(--secondary-green-bg)', fontWeight: 'bold'}} data-label={value} key={key}>
                {row[key]}
              </td>
            case "Cancelado":
              return <td className="table__cell" role="cell" style={{color:'var(--violet-bg)', fontWeight: 'bold'}} data-label={value} key={key}>
                {row[key]}
              </td>
            case "No se presentó":
              return <td className="table__cell" role="cell" style={{color:'var(--orange-bg)', fontWeight: 'bold'}} data-label={value} key={key}>
                {row[key]}
              </td>
            case "Citas medicas":
              return <td className="table__cell" role="cell" style={{color:'var(--brown-bg)', fontWeight: 'bold'}} data-label={value} key={key}>
                {row[key]}
              </td>
            default:
              return <td className="table__cell" role="cell" style={{color:'var(--darkblue-bg)', fontWeight: 'bold'}} data-label={value} key={key}>
                {row[key]}
              </td>
          }
        } else {
          return <td className="table__cell" role="cell" data-label={value} key={key}>
            {row[key]}
          </td>
        }
      })}
    </tr>
  };

  const renderBody = () => (
    <tbody className="table__body">{content.map(renderRow)}</tbody>
  );

  return (
    <table className="table" role="table">
      { renderHead() }
      { renderBody() }
    </table>
  );
}

export default Table
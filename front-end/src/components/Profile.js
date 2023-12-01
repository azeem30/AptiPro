import React from 'react'

export default function Profile({data, side, department}) {
  let studentProfileBoxStyle = {
    marginTop: '40px',
    height: '690px'
  };
  let teacherProfileBoxStyle = {
    marginTop: '40px',
    height: '250px'
  };
  let separator = {
    height: '0.5px'
  };
  let labelStyle = {
    fontSize: '18px'
  };
  return (
    <div>
      {
        side==='student' && 
          <div style={studentProfileBoxStyle} className='container w-50 bg-white rounded'>
            <div className='d-flex justify-content-center'>
              <h3 className='fw-semibold text-wrap my-2'>Profile</h3>
            </div>
            <div className='mb-3 bg-dark-subtle' style={separator}></div>
            <div className="d-block align-start mx-4">
              <p style={labelStyle} className='fw-semibold'>Roll No: <span className='fw-lighter mx-2'>{data.rollNo}</span></p>
              <p style={labelStyle} className='fw-semibold'>Name: <span className='fw-lighter mx-2'>{data.name}</span></p>
              <p style={labelStyle} className='fw-semibold'>Email: <span className='fw-lighter mx-2'>{data.email}</span></p>
              <p style={labelStyle} className='fw-semibold'>Semester: <span className='fw-lighter mx-2'>{data.semester}</span></p>
              <p style={labelStyle} className='fw-semibold'>Department: <span className='fw-lighter mx-2'>{department.departmentName}</span></p>
            </div>
            <div>
              <table className='table table-bordered w-50 mx-4'>
                <thead>
                  <tr className='mx-2'>
                    <th className="col fw-semibold">Semester</th>
                    <th className="col fw-semibold">SGPI</th>
                    <th className="col fw-semibold">CGPI</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.results?.map((result, index) => (
                      <tr className='mx-2' key={result.semester}>
                        <th className="col fw-semibold">{result.semester}</th>
                        <td className="col">{result.sgpi}</td>
                        <td className="col">{result.cgpi}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
      }
      {
        side==='teacher' && 
        <div style={teacherProfileBoxStyle} className='container w-50 bg-white rounded'>
          <div className='d-flex justify-content-center'>
            <h3 className='fw-semibold text-wrap my-2'>Profile</h3>
          </div>
          <div className='mb-3 bg-dark-subtle' style={separator}></div>
          <div className="d-block align-start mx-4">
              <p style={labelStyle} className='fw-semibold'>Roll No: <span className='fw-lighter mx-2'>{data.rollNo}</span></p>
              <p style={labelStyle} className='fw-semibold'>Name: <span className='fw-lighter mx-2'>{data.name}</span></p>
              <p style={labelStyle} className='fw-semibold'>Email: <span className='fw-lighter mx-2'>{data.email}</span></p>
              <p style={labelStyle} className='fw-semibold'>Department: <span className='fw-lighter mx-2'>{department.departmentName}</span></p>
          </div>
        </div>
      }
    </div>
  )
}

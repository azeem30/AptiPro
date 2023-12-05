import React from 'react';
import '../styles/profile.css'

export default function Profile({ data, side, department }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <div className='container w-50 rounded profile-box' style={{height: side==='student'? '690px' : '250px'}}>
        <div className='d-flex justify-content-center'>
          <h3 className='fw-semibold text-wrap my-2'>Profile</h3>
        </div>
        <div className='mb-3 separator'></div>
        <div className='mx-4'>
          <p className='label fw-semibold'>Roll No: <span className='fw-lighter'>{data.rollNo}</span></p>
          <p className='label fw-semibold'>Name: <span className='fw-lighter'>{data.name}</span></p>
          <p className='label fw-semibold'>Email: <span className='fw-lighter'>{data.email}</span></p>
          {side === 'student' && (
            <>
              <p className='label fw-semibold'>Semester: <span className='fw-lighter'>{data.semester}</span></p>
              <p className='label fw-semibold'>Department: <span className='fw-lighter'>{department.departmentName}</span></p>
            </>
          )}
          {
            side === 'teacher' && (
              <>
                <p className='label fw-semibold'>Department: <span className='fw-lighter'>{department.departmentName}</span></p>
              </>
            )
          }
        </div>
        {side === 'student' && (
          <table className='table table-style table-bordered'>
            <thead>
              <tr>
                <th className='fw-semibold'>Semester</th>
                <th className='fw-semibold'>SGPI</th>
                <th className='fw-semibold'>CGPI</th>
              </tr>
            </thead>
            <tbody>
              {data.results?.map((result, index) => (
                <tr key={result.semester}>
                  <td>{result.semester}</td>
                  <td>{result.sgpi}</td>
                  <td>{result.cgpi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

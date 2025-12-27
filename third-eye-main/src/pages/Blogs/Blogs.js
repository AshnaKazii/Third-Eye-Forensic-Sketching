import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";



function Blogs(props) {



  return (
    <>
      <Navbar />
      <div className="wrapper d-flex align-items-stretch">
        <Sidebar />
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-lg-12'>
                <div>

                </div>
              </div>
            </div>
          </div>
       </div>
    </>
  );

}

export default Blogs;

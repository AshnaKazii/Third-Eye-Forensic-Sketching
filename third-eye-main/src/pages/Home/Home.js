import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import HomeBanner from "./home-banner.jpg";
import HomeBanner1 from "./home-banner-2.jpg";
import HomeBanner2 from "./home-banner-3.jpg";

function Home(props) {
  return (
    <>
      <Navbar />
      <div className="wrapper d-flex align-items-stretch">
        <Sidebar />
        <div className="container-fluid main bg-light py-5">
          <h2 className="text-danger mb-4 text-center">Face Detection and Recognition System using Digital Image Processing</h2>

          {/* Section 1 */}
          <div className="row g-4 align-items-stretch mb-4">
            <div className="col-lg-6 d-flex">
              <div className="card shadow-sm rounded p-4 w-100 d-flex flex-column justify-content-between">
                <p className="text-black mb-4">
                  Traditional hand-drawn face sketches in forensic art are plagued by limitations, including time-consuming creation and limited compatibility with modern recognition technologies. This paper explores the recent advancements in forensic face sketch construction and recognition application that leverages intuitive drag-and-drop functionality, advanced deep learning algorithms, and cloud-based infrastructure to streamline the process of creating composite face sketches and matching them with police records. The application enables users to effortlessly generate sketches of suspects without the need for forensic artists, significantly improving the efficiency of criminal identification processes.
                </p>
                <button
                    className="btn btn-sm btn-primary mt-auto"
                    onClick={() =>
                      window.open(
                        'https://www.ijprems.com/uploadedfiles/paper//issue_11_november_2024/36954/final/fin_ijprems1732083859.pdf',
                        '_blank',
                        'noopener,noreferrer'
                      )
                    }
                  >
                    Read Article
                  </button>              
                </div>
            </div>
            <div className="col-lg-6 d-flex">
              <div className="w-100">
                <img src={HomeBanner} className="img-fluid rounded shadow-sm h-100 object-fit-cover" alt="banner" />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="row g-4 align-items-stretch mb-4">
            <div className="col-lg-6 d-flex">
              <div className="w-100">
                <img src={HomeBanner1} className="img-fluid rounded shadow-sm h-100 object-fit-cover" alt="banner" />
              </div>
            </div>
            <div className="col-lg-6 d-flex">
              <div className="card shadow-sm rounded p-4 w-100 d-flex flex-column justify-content-between">
                <p className="text-black mb-4">
                  While recognizing any individual, the most important attribute is the face. It serves as an individual identity of everyone and therefore face recognition helps in authenticating any person's identity using his personal characteristics. The whole procedure is sub-divided into two phases: first, face detection; then, face recognition. Techniques like Eigenface (using PCA) and Fisherface are commonly used. The area of concern of this paper is using digital image processing to develop a face recognition system.
                </p>
                <button
                    className="btn btn-sm btn-primary mt-auto"
                    onClick={() =>
                      window.open(
                        'https://doi.org/10.1109/ICIMIA48430.2020.9074838',
                        '_blank',
                        'noopener,noreferrer'
                      )
                    }
                  >
                    Read Article
                  </button>      
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;

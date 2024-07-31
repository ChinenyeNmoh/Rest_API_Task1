import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import {Container} from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import Header from "../components/Header";

const Base = () => {
    return (
        <>
        <Header />
        <ToastContainer position="top-center" />
        <main className='py-3'>
          <Container>
            <Outlet />
          </Container>
        </main>
      </>
      )
}

export default Base
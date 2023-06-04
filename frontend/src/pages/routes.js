import { 
    createHashRouter,
    createRoutesFromChildren,
    Route
} from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import Error from './Error/Error';
import Login from './Login/Login';
import Home from './Home/Home';
import PatientList from './PatientList/PatientList';
import AddPatient from './AddPatient/AddPatient';
import Patient from './Patient/Patient';
import MyCalendar from './MyCalendar/MyCalendar';
import ShiftList from './ShiftList/ShiftList';
import AddShift from './AddShift/AddShift';
import Shift from './Shift/Shift';
import ShiftPatientList from "./ShiftPatientList/ShiftPatientList";
import EditShift from "./EditShift/EditShift";
import EditPatient from "./EditPatient/EditPatient";

// RUTAS
export const router = createHashRouter(
    createRoutesFromChildren(
        <Route path="/" element={<Navbar />}>
            <Route path="*" element={<Error />} />
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/listado-pacientes" element={<PatientList />} />
            <Route path="/agregar-paciente" element={<AddPatient />} />
            <Route path="/editar-paciente/:id" element={<EditPatient />} />
            <Route path="/paciente/:id" element={<Patient />} />
            <Route path="/mi-calendario" element={<MyCalendar />} />
            <Route path="/listado-turnos" element={<ShiftList />} />
            <Route path="/agregar-turno" element={<AddShift />} />
            <Route path="/editar-turno/:id" element={<EditShift />} />
            <Route path="/turno/:id" element={<Shift />} />
            <Route path="/turnos-paciente/:id" element={<ShiftPatientList />} />
        </Route>
    )
);

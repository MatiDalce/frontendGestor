import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from '../../assets/helpers/toast';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Checkbox from '../../components/Checkbox/Checkbox';
import './editPatient.css';
import { config } from '../../env/config';
import { convertUnixtimeToDate } from '../../assets/helpers/unixtimeToSomething';
import Swal from 'sweetalert2';
import { errorAlert } from '../../assets/helpers/customAlert';

const EditPatient = () => {
  const navigate = useNavigate()
  const { id } = useParams() 

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(true);

  // ===== ESTADO =====
  const [patient, setPatient] = useState({
    name: '',
    lastName: '',
    dni: '',
    socialService: '',
    email: '',
    gender: '',
    sexualOrientation: '',
    maritalStatus: '',
    birthday: '',
    father: '',
    mother: '',
    children: '',
    siblings: '',
    // livingSiblings: '',
    personalPhoneNumber: '',
    contactPhone: '',
    academicLevel: '',
    hasChronicDisease: '',
    chronicDisease: '',
    hasAllergies: '',
    allergies: '',
    bloodType: '',
    takesMedication: '',
    medication: '',
  })

  useEffect(() => {
    const patientNotExist = () => {
      Swal.fire({
        icon: 'error',
        title: "Paciente no encontrado",
        text: "Será redirigido a la lista de pacientes.",
        confirmButtonColor: 'var(--skyblue-bg)',
      }).then(() => {
        navigate('/listado-pacientes')
      })
    }
    // ===== GET DEL PACIENTE =====
    fetch(`${config.webAPI}/patients/${id}`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      if(res.status === 401 || res.status === 403) {
        throw new Error('auth'); // No está autorizado
      } else { return res.json() }
    })
    .then(res => {
      if(res) {
        if(res.message && res.message === "No patient record found for the given ID") {
          patientNotExist()
        } else {
          // SETEO DE ESTADO
          setPatient({
            name: res.name,
            lastName: res.lastName,
            dni: res.dni,
            socialNetwork: res.socialService,
            gender: res.gender,
            sexualOrientation: res.sexualOrientation,
            maritalStatus: res.maritalStatus,
            email: res.email,
            birthday: convertUnixtimeToDate(res.birthday, true),
            academicLevel: res.academicLevel,
            father: res.father,
            mother: res.mother,
            children: res.children, 
            siblings: res.siblings,
            // livingSiblings: res.livingSiblings,
            personalPhoneNumber: res.personalPhoneNumber,
            contactPhone: res.contactPhone,
            bloodType: res.bloodType,
            hasChronicDisease: res.hasChronicDisease,
            chronicDisease: res.chronicDisease,
            hasAllergies: res.hasAllergies,
            allergies: res.allergies,
            takesMedication: res.takesMedication,
            medication: res.medication,
          })
        }
      } else {
        toast('error', 'Algo salió mal, por favor recargue la página.')
        patientNotExist()
      }
    })
    .catch(err => {
      errorAlert('Error: EditPatient',`${(err.message && err.message.length) > 0 ? err.message : err}`); 
      navigate('/login');
    })
    .finally(() => setLoading(false));
  }, [id, navigate])

  // ===== MANEJADORES DE ESTADO =====
  const handleName = (e) => {
    setPatient({
      ...patient,
      name: e.target.value
    })
  };
  const handleLastName = (e) => {
    setPatient({
      ...patient,
      lastName: e.target.value
    })
  };
  const handleDNI = (e) => {
    setPatient({
      ...patient,
      dni: e.target.value
    })
  };
  const handleSocialNetwork = (e) => {
    setPatient({
      ...patient,
      socialNetwork: e.target.value
    })
  };
  const handleEmail = (e) => {
    setPatient({
      ...patient,
      email: e.target.value
    })
  };
  const handleGender = (value) => {
    setPatient({
      ...patient,
      gender: value
    })
  };
  const handleSexualOrientation = (e) => {
    setPatient({
      ...patient,
      sexualOrientation: e.target.value
    })
  };
  const handleMaritalStatus = (value) => {
    setPatient({
      ...patient,
      maritalStatus: value
    })
  }
  const handleBirthday = (e) => {
    setPatient({
      ...patient,
      birthday: e.target.value
    })
  }
  const handleFather = (value) => {
    setPatient({
      ...patient,
      father: value
    })
  }
  const handleMother = (value) => {
    setPatient({
      ...patient,
      mother: value
    })
  }
  const handleChildren = (value) => {
    setPatient({
      ...patient,
      children: value
    })
  }
  const handleSiblings = (value) => {
    setPatient({
      ...patient,
      siblings: value
    })
  }
  const handleAcademicLevel = (e) => {
    setPatient({
      ...patient,
      academicLevel: e.target.value
    })
  }
  const handlePersonalPhone = (e) => {
    setPatient({
      ...patient,
      personalPhoneNumber: e.target.value
    })
  }
  const handleContactPhone = (e) => {
    setPatient({
      ...patient,
      contactPhone: e.target.value
    })
  }
  const handleChronicDisease = (value) => {
    setPatient({
      ...patient,
      chronicDisease: value
    })
  }
  const handleAllergies = (value) => {
    setPatient({
      ...patient,
      allergies: value
    })
  }
  const handleBloodType = (e) => {
    setPatient({
      ...patient,
      bloodType: e.target.value
    })
  }
  const handleMedication = (value) => {
    setPatient({
      ...patient,
      medication: value
    })
  }

  // ===== MANEJADOR DEL PUT =====
  const handleEditPatient = (e) => {
    e.preventDefault()
    
    if(
      patient.name === '' ||
      patient.lastName === '' ||
      patient.personalPhoneNumber === '' ||
      patient.dni === '' ||
      patient.gender === '' ||
      patient.dni.length > 10 ||
      patient.personalPhoneNumber.length > 10
    ) {
      return errorAlert('Campos incompletos',`Revise que no haya errores`);
    }

    let body = {
      name: patient.name,
      lastName: patient.lastName,
      dni: patient.dni, // Number
      socialService: patient.socialService,
      email: patient.email,
      gender: patient.gender,
      sexualOrientation: patient.sexualOrientation,
      birthday: patient.birthday ? Date.parse(patient.birthday) / 1000 : 0, // Number
      maritalStatus: patient.maritalStatus,
      personalPhoneNumber: patient.personalPhoneNumber, // Number
      contactPhone: patient.contactPhone,
      familyMembers: '', // ! ESTE VA?
      parents: '', // ! ESTE VA?
      father: patient.father,
      mother: patient.mother,
      children: patient.children,
      siblings: patient.siblings,
      academicLevel: patient.academicLevel,
      bloodType: patient.bloodType,
      hasAllergies: patient.hasAllergies, // Boolean pero con 0 o 1
      allergies: patient.allergies,
      takesMedication: patient.takesMedication, // Boolean pero con 0 o 1
      medication: patient.medication,
      hasChronicDisease: patient.hasChronicDisease, // Boolean pero con 0 o 1
      chronicDisease: patient.chronicDisease,
    }

    Swal.fire({
      title: 'Esta por editar el paciente',
      text: 'Esta acción no se puede deshacer ¿Está seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--skyblue-bg)',
      cancelButtonColor: 'var(--red-bg)',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${config.webAPI}/patients/${id}`, { // id = id del turno
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        })
        .then(res => {
          if(res.status === 401 || res.status === 403) {
            throw new Error('auth'); // No está autorizado
          }
          if (!res.ok) {
              toast('error', 'No se pudo editar al paciente')
              return Promise.reject(new Error("FALLÓ"))
          } else return res.json();
        })
        .then(res => {
          console.log('res',res);
          if(res) {
            navigate('/listado-pacientes')
            toast('success', 'Se ha editado exitosamente')
          } else {
            toast('error', 'No se pudo editar el paciente. Revise los datos.')
            setError(true)
          }
        })
        .catch(err => {
          console.log('err',err);
          errorAlert('Error: EditPatient',`${(err.message && err.message.length) > 0 ? err.message : err}`); 
          navigate('/login');
        });
      } else return null
    })
  }

  // ===== HTML =====
  if(loading) return <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', width: '100%'}}><Spinner /></div>
  return (
    <>
      <h2 className='editPatient-title'>EDICIÓN DE DATOS</h2>
      <form>

        <div className="input-editPatient-row">
          <div className="input-editPatient-box">
            <Input
              isDisabled={loading}
              value={patient.name}
              onChange={handleName}
              colorLabel='var(--black-bg)' 
              hasLabel
              labelTitle='Nombre'
              isLabelCenter
              placeholder='Ingrese el nombre'
              nameProp='name'
            />
          { (error && !patient.name) && <p className='addPatient-error'>Este campo es requerido.</p> }
          </div>
          <div className="input-editPatient-box">
            <Input
              isDisabled={loading}
              value={patient.lastName}
              onChange={handleLastName}
              colorLabel='var(--black-bg)' 
              hasLabel
              labelTitle='Apellido'
              isLabelCenter
              placeholder='Ingrese el apellido'
              nameProp='lastname'
            />
            { (error && !patient.lastName) && <p className='addPatient-error'>Este campo es requerido.</p> }
          </div>
        </div>
        <div className="input-editPatient-row">
          <div className="input-editPatient-box">
            <Input
              isDisabled={loading}
              value={patient.dni}
              onChange={handleDNI}
              limitNumber={9999999999}
              type='number'
              colorLabel='var(--black-bg)' 
              hasLabel
              labelTitle='DNI'
              isLabelCenter
              placeholder='Ingrese el DNI'
              nameProp='dni'
            />
            { (error && !patient.dni) && <p className='addPatient-error'>Este campo es requerido.</p> }
            { patient.dni.length > 10 && <p className='addPatient-error'>Debe tener un máximo de 10 dígitos</p> }
          </div>
          <div className="input-editPatient-box">
            <Checkbox
              isDisabled={loading}
              formType='edit'
              hasLabel
              labelTitle='Género'
              options={['Masculino', 'Femenino', 'Otro']}
              value={patient.gender}
              onlyCheckboxes
              colorLabel='var(--black-bg)'
              isLabelCenter
              nameProp='gender'
              onChangeOnlyBoxes={handleGender}
              isChecked={patient.gender}
            />
            { (error && !patient.gender) && <p className='addPatient-error'>Este campo es requerido.</p> }
          </div>
        </div>
        <div className="input-editPatient-row">
          <div className="input-editPatient-box">
            <Input
              isDisabled={loading}
              value={patient.sexualOrientation}
              onChange={handleSexualOrientation}
              colorLabel='var(--black-bg)' 
              hasLabel
              labelTitle='Orientación sexual'
              isLabelCenter
              placeholder='Ingrese la orientación sexual'
              nameProp='sexualOrientation'
            />
          </div>
          <div className="input-editPatient-box">
              <Input
                isDisabled={loading}
                value={patient.email}
                onChange={handleEmail}
                type={'email'}
                colorLabel='var(--black-bg)' 
                hasLabel
                labelTitle='Email'
                isLabelCenter
                placeholder='Ingrese el email'
                nameProp='email'
              />
          </div>
      </div>
      <div className="input-editPatient-row">
        <div className="input-editPatient-box">
          <Input
            isDisabled={loading}
            value={patient.socialNetwork}
            onChange={handleSocialNetwork}
            colorLabel='var(--black-bg)' 
            hasLabel
            labelTitle='Obra Social'
            isLabelCenter
            placeholder='Ingrese la obra social'
            nameProp='socialService'
          />
        </div>
        <div className="input-editPatient-box">
          <Input
            isDisabled={loading}
            value={patient.birthday}
            onChange={handleBirthday}
            colorLabel='var(--black-bg)' 
            type={'date'}
            hasLabel
            labelTitle='Fecha de nacimiento'
            isLabelCenter
            placeholder='Ingrese la fecha de nacimiento'
            nameProp='birthday'
          />
        </div>
      </div>
      <div className="input-editPatient-row">
        <div className="input-editPatient-box">
          <Checkbox
            isDisabled={loading}
            formType='edit'
            options={['Casado', 'Soltero', 'Divorciado', 'Viudo']}
            onlyCheckboxes
            value={patient.maritalStatus}
            onChangeOnlyBoxes={handleMaritalStatus}
            colorLabel='var(--black-bg)'
            hasLabel
            labelTitle='Estado civil'
            isLabelCenter
            nameProp='maritalStatus'
            isChecked={patient.maritalStatus}
          />
        </div>
        <div className="input-editPatient-box">
          <Input
            isDisabled={loading}
            value={patient.personalPhoneNumber}
            onChange={handlePersonalPhone}
            colorLabel='var(--black-bg)' 
            type='number'
            limitNumber={9999999999}
            hasLabel
            labelTitle='Teléfono personal'
            isLabelCenter
            placeholder='Ingrese el teléfono personal'
            nameProp='personalPhoneNumber'
          />
          { (error && !patient.personalPhoneNumber) && <p className='addPatient-error'>Este campo es requerido.</p> }
          { patient.personalPhoneNumber.length > 10 && <p className='addPatient-error'>Debe tener un máximo de 10 dígitos</p> }
        </div>
      </div>
      <div className="input-editPatient-row">
        <div className="input-editPatient-box">
          <Input
            isDisabled={loading}
            value={patient.contactPhone}
            onChange={handleContactPhone}
            colorLabel='var(--black-bg)' 
            hasLabel
            labelTitle='Teléfono de contacto'
            isLabelCenter
            placeholder='Ingrese el teléfono de contacto'
            nameProp='contactPhone'
          />
        </div>
        <div className="input-editPatient-box">
          <Checkbox
            isDisabled={loading}
            formType='edit'
            withText={'¿Vive?'}
            value={patient.father}
            isChecked={patient.father !== ''}
            onChange={handleFather}
            colorLabel='var(--black-bg)' 
            hasLabel
            labelTitle='Padre'
            isLabelCenter
            placeholder='Ingrese el nombre del padre'
            nameProp='father'
            options={['Sí', 'No']}
          />
        </div>
      </div>
      <div className="input-editPatient-row">
      <div className="input-editPatient-box">
            <Checkbox
              isDisabled={loading}
              formType='edit'
              withText={'¿Vive?'}
              value={patient.mother}
              isChecked={patient.mother !== ''}
              onChange={handleMother}
              colorLabel='var(--black-bg)' 
              hasLabel
              labelTitle='Madre'
              isLabelCenter
              placeholder='Ingrese el nombre de la madre'
              nameProp='mother'
              options={['Sí', 'No']}
            />
          </div>
        <div className="input-editPatient-box">
          <Checkbox
            isDisabled={loading}
            formType='edit'
            withText={'Tiene?'}
            value={patient.children}
            isChecked={patient.children !== ''}
            onChange={handleChildren}
            colorLabel='var(--black-bg)' 
            hasLabel
            labelTitle='Hijos'
            isLabelCenter
            placeholder='Ingrese los nombres de los hijos'
            nameProp='children'
            options={['Sí', 'No']}
          />
        </div>
      </div>
      <div className="input-editPatient-row input-editPatient-row-extra">
        {/* <div className="input-editPatient-box">
            <div className="yesOrNoCheckboxes">
              <Checkbox
                isDisabled={loading}
                formType='edit'
                onlyCheckboxes
                hasLabel
                onChangeOnlyBoxes={handleLivingSiblings}
                value={patient.livingSiblings}
                labelTitle='¿Viven todos/as sus hermanos/as?'
                options={['Sí', 'No']}
                colorLabel='var(--black-bg)'
                isLabelCenter
                nameProp='livingSiblings'
              />
            </div>
        </div> */}
        <div className="input-editPatient-box">
          <Checkbox
            isDisabled={loading}
            formType='edit'
            withText={'Tiene?'}
            options={['Sí', 'No']}
            isChecked={patient.siblings !== ''}
            value={patient.siblings}
            onChange={handleSiblings}
            colorLabel='var(--black-bg)' 
            hasLabel
            labelTitle='Hermanos'
            isLabelCenter
            placeholder='Ingrese los nombres de los hermanos'
            nameProp='siblings'
          />
        </div>
        <div className="input-editPatient-box">
          <Select
            isDisabled={loading}
            options={[
              {
                value: 'Primaria incompleta',
                text: 'Primaria incompleta',
              },
              {
                value: 'Primaria en curso',
                text: 'Primaria en curso',
              },
              {
                value: 'Primaria completa',
                text: 'Primaria completa',
              },
              {
                value: 'Secundaria incompleta',
                text: 'Secundaria incompleta',
              },
              {
                value: 'Secundaria en curso',
                text: 'Secundaria en curso',
              },
              {
                value: 'Secundaria completa',
                text: 'Secundaria completa',
              },
              {
                value: 'Universidad incompleta',
                text: 'Universidad incompleta',
              },
              {
                value: 'Universidad en curso',
                text: 'Universidad en curso',
              },
              {
                value: 'Universidad completa',
                text: 'Universidad completa',
              },
            ]}
            value={patient.academicLevel}
            onChange={handleAcademicLevel}
            colorLabel='var(--black-bg)' 
            hasLabel
            labelTitle='Nivel académico'
            isLabelCenter
            nameProp='academicLevel'
          />
        </div>
      </div>
      <div className="input-editPatient-row">
      <div className="input-editPatient-box">
          <Select
            isDisabled={loading}
            options={[
              {
                value: 'Tipo A',
                text: 'Tipo A',
              },
              {
                value: 'Tipo A-',
                text: 'Tipo A-',
              },
              {
                value: 'Tipo B',
                text: 'Tipo B',
              },
              {
                value: 'Tipo B-',
                text: 'Tipo B-',
              },
              {
                value: 'Tipo AB',
                text: 'Tipo AB',
              },
              {
                value: 'Tipo AB-',
                text: 'Tipo AB-',
              },
              {
                value: 'Tipo O',
                text: 'Tipo O',
              },
              {
                value: 'Tipo O-',
                text: 'Tipo O-',
              }
            ]}
            value={patient.bloodType}
            onChange={handleBloodType}
            colorLabel='var(--black-bg)' 
            hasLabel
            labelTitle='Grupo sanguíneo'
            isLabelCenter
            nameProp='bloodType'
          />
        </div>
        <div className="input-editPatient-box">
          <Checkbox
            isDisabled={loading}
            formType='edit'
            withText
            onChange={handleAllergies}
            isChecked={patient.hasAllergies === '1'}
            value={patient.allergies}
            colorLabel='var(--black-bg)' 
            hasLabel
            labelTitle='¿Tiene alguna alergia?'
            placeholder='Nombre la/as alergia/s'
            isLabelCenter
            nameProp='hasAllergies'
          />
        </div>
      </div>
      <div className="input-editPatient-row">
        <div className="input-editPatient-box">
          <Checkbox
            isDisabled={loading}
            formType='edit'
            withText
            onChange={handleMedication}
            isChecked={patient.takesMedication === '1'}
            value={patient.medication}
            colorLabel='var(--black-bg)' 
            hasLabel
            labelTitle='¿Toma algún medicamento?'
            placeholder='Nombre los medicamentos'
            isLabelCenter
            nameProp='medication'
          />
        </div>
        <div className="input-editPatient-box">
          <Checkbox
            isDisabled={loading}
            formType='edit'
            withText
            onChange={handleChronicDisease}
            isChecked={patient.hasChronicDisease === '1'}
            value={patient.chronicDisease}
            colorLabel='var(--black-bg)' 
            hasLabel
            labelTitle='¿Tiene alguna enfermedad crónica?'
            placeholder='Nombre la/s enfermedades'
            isLabelCenter
            nameProp='chronicDisease'
          />
        </div>
      </div>

      <div className="btn-editPatient-center">
        <div className='btn-editPatient-container'>
          <Button 
            title={'Editar'} 
            type='submit'
            onClick={handleEditPatient}
            isDisabled={
              patient.name === '' ||
              patient.lastName === '' ||
              patient.personalPhoneNumber === 0 ||
              patient.dni === '' ||
              patient.gender === '' ||
              loading
            }
          />
        </div>
      </div>

      </form>
    </>
  )
}

export default EditPatient
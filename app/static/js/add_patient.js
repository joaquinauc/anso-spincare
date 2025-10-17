const patientInfoContainer = document.querySelector('#patient-info-container');
const editButton = document.querySelector('.edit-button');
const closeModalButton = document.querySelector('.close');
const addPatientModal = document.querySelector('.modal-patient');

const PATIENT_INFO_LABELS = ['Nombre Completo:', 'Edad:', 'Sexo:', 'Teléfono:', 'Padecimiento:', 'Medicamentos:', 'Expediente No.:', 'Alergias:'];
const PATIENT_INFO_DATA_ID = ['patient-show-name', 'patient-show-age', 'patient-show-phone', 'patient-show-illness', 'patient-show-medicine', 'patient-show-expedient-number', 'patient-show-allergies']

for (let i = 0; i < PATIENT_INFO_DATA_ID.length; i++) {
    const patientInfoSubContainer = document.createElement('div');
    patientInfoSubContainer.setAttribute('class', 'patient-info-subcontainer');

    const patientInfoLabel = document.createElement('label');
    patientInfoLabel.setAttribute('class', 'patient-info-label');
    patientInfoLabel.textContent = PATIENT_INFO_LABELS[i];

    const patientInfoData = document.createElement('p');
    patientInfoData.setAttribute('id', `${PATIENT_INFO_DATA_ID[i]}`)

    patientInfoSubContainer.appendChild(patientInfoLabel);
    patientInfoSubContainer.appendChild(patientInfoData);
    patientInfoContainer.appendChild(patientInfoSubContainer);
}

// ABRIR MODAL
editButton.addEventListener('click', () => {
    addPatientModal.setAttribute('style', 'display: flex;');
});

// CERRAR MODAL
closeModalButton.addEventListener('click', () => {
    addPatientModal.setAttribute('style', 'display: none;');
});

window.addEventListener('click', event => {
    if (event.target.matches('.modal-patient') && !event.target.closest('.modal-patient-content')) {
        addPatientModal.setAttribute('style', 'display: none;');
    }
});

// VARIABLES DE LOS DATOS QUE SE VEN FUERA DEL MODAL
const infoName = document.querySelector('#patient-show-name');
const infoAge = document.querySelector('#patient-show-age');
const infoSex = document.querySelector('#patient-show-sex');
const infoPhone = document.querySelector('#patient-show-phone');
const infoIllness = document.querySelector('#patient-show-illness');
const infoMedicine = document.querySelector('#patient-show-medicine');
const infoExpedient = document.querySelector('#patient-show-expedient');
const infoAllergies = document.querySelector('#patient-show-allergies');

// GUARDAR INFO DEL MODAL
saveFormDataButton.addEventListener('click', () => {
    // VARIABLES DE LOS DATOS QUE INGRESES AL MODAL
    const nameInput = document.querySelector('#patient-name');
    const ageInput = document.querySelector('#patient-age');
    const sexInput = document.querySelector('#patient_sex');
    const phoneInput = document.querySelector('#patient-phone');
    const illnessInput = document.querySelector('#patient-illness');
    const medicineInput = document.querySelector('#patient-medicine');
    const expedientInput = document.querySelector('#patient-expedient-number');
    const allergiesInput = document.querySelector('#patient-allergies');

    // PASAR LOS DATOS DEL LOS INPUT DEL MODAL A LA INFORMACIÓN FUERA DEL MODAL
    infoName.textContent = nameInput.value;
    infoAge.textContent = ageInput.value;
    infoSex.textContent = sexInput.value;
    infoPhone.textContent = phoneInput.value;
    infoIllness.textContent = illnessInput.value;
    infoMedicine.textContent = medicineInput.value;
    infoExpedient.textContent = expedientInput.value;
    infoAllergies.textContent = allergiesInput.value;

    // CERRAR MODAL
    addPatientModal.setAttribute('style', 'display: none;');
});

addPatientButton.addEventListener("click", async function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('patient_name', infoName.textContent);
    formData.append('patient_age', infoAge.textContent);
    formData.append('patient_sex', infoSex.textContent);
    formData.append('patient_phone_number', infoPhone.textContent);
    formData.append('patient_illness', infoIllness.textContent);
    formData.append('patient_medicine', infoMedicine.textContent);
    formData.append('patient_expedient_number', infoExpedient.textContent);
    formData.append('patient_allergies', infoAllergies.textContent);
    // Necesita el CSRF TOKEN para que funcione el forms de Flask y pueda hacer la validación
    formData.append(
        'csrf_token',
        document.querySelector('[name=csrf_token]').value
    );

    try {
        const response = await fetch('/api/add_patient', {
            method: 'POST',
            body: formData,
            headers: {
                'Cache-Control': 'no-store', // Evita caché en la petición
            },
        });

        const result = await response.json();
        console.log(result);

        if (result.success) {
            // 3. Redirección que no deja historial
            window.location.replace(result.redirect);
        } else {
            alert('Algo salió mal.');
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al conectar con el servidor");
    }
});


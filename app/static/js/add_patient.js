const patientInfoContainer = document.querySelector('#patient-info-container');

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
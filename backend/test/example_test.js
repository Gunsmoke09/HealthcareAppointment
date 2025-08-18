const { expect } = require('chai');
const sinon = require('sinon');

const Appointment = require('../models/Appointment');
const {
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');

const MedicalRecord = require('../models/MedicalRecord');
const {
  getMedicalRecords,
  addMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require('../controllers/medicalRecordController');

// helper to mock Express res object
const mockRes = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

describe('Appointment Controller CRUD', () => {
  afterEach(() => sinon.restore());

  it('should retrieve appointments', async () => {
    const req = { user: { id: 'user1' } };
    const res = mockRes();
    const data = [{ doctor: 'Doc', patientName: 'Pat' }];
    sinon.stub(Appointment, 'find').resolves(data);

    await getAppointments(req, res);
    expect(res.json.calledWith(data)).to.be.true;
  });

  it('should add an appointment', async () => {
    const req = {
      user: { id: 'user1' },
      body: {
        doctor: 'Doc',
        patientName: 'Pat',
        date: '2024-01-01',
        reason: 'Check',
        status: 'scheduled',
      },
    };
    const res = mockRes();
    const created = { _id: '1', ...req.body, userId: 'user1' };
    sinon.stub(Appointment, 'create').resolves(created);

    await addAppointment(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(created)).to.be.true;
  });

  it('should update an appointment', async () => {
    const req = { params: { id: '1' }, body: { status: 'completed' } };
    const res = mockRes();
    const appointment = {
      status: 'scheduled',
      save: sinon.stub().resolves({ status: 'completed' }),
    };
    sinon.stub(Appointment, 'findById').resolves(appointment);

    await updateAppointment(req, res);
    expect(appointment.status).to.equal('completed');
    expect(res.json.called).to.be.true;
  });

  it('should delete an appointment', async () => {
    const req = { params: { id: '1' } };
    const res = mockRes();
    const appointment = { remove: sinon.stub().resolves() };
    sinon.stub(Appointment, 'findById').resolves(appointment);

    await deleteAppointment(req, res);
    expect(res.json.calledWith({ message: 'Appointment deleted' })).to.be.true;
  });
});

describe('MedicalRecord Controller CRUD', () => {
  afterEach(() => sinon.restore());

  it('should retrieve medical records', async () => {
    const req = { user: { id: 'user1' } };
    const res = mockRes();
    const records = [{ patientName: 'Pat', reasonForVisit: 'Check' }];
    sinon
      .stub(MedicalRecord, 'find')
      .returns({ sort: sinon.stub().resolves(records) });

    await getMedicalRecords(req, res);
    expect(res.json.calledWith(records)).to.be.true;
  });

  it('should add a medical record', async () => {
    const req = {
      user: { id: 'user1' },
      body: {
        patientName: 'Pat',
        dob: '1990-01-01',
        gender: 'M',
        medicalHistory: [],
        reasonForVisit: 'Check',
      },
    };
    const res = mockRes();
    const created = { _id: '1', ...req.body, userId: 'user1' };
    sinon.stub(MedicalRecord, 'create').resolves(created);

    await addMedicalRecord(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(created)).to.be.true;
  });

  it('should update a medical record', async () => {
    const req = { params: { id: '1' }, body: { reasonForVisit: 'Flu' } };
    const res = mockRes();
    const record = {
      reasonForVisit: 'Check',
      save: sinon.stub().resolves({ reasonForVisit: 'Flu' }),
    };
    sinon.stub(MedicalRecord, 'findById').resolves(record);

    await updateMedicalRecord(req, res);
    expect(record.reasonForVisit).to.equal('Flu');
    expect(res.json.called).to.be.true;
  });

  it('should delete a medical record', async () => {
    const req = { params: { id: '1' } };
    const res = mockRes();
    const record = { remove: sinon.stub().resolves() };
    sinon.stub(MedicalRecord, 'findById').resolves(record);

    await deleteMedicalRecord(req, res);
    expect(res.json.calledWith({ message: 'Medical record deleted' })).to.be.true;
  });
});
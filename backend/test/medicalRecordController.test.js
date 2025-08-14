const chai = require('chai');
const sinon = require('sinon');
const MedicalRecord = require('../models/MedicalRecord');
const { addMedicalRecord } = require('../controllers/medicalRecordController');

const { expect } = chai;

describe('MedicalRecord Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should add a medical record', async () => {
    const req = {
      user: { id: 'user123' },
      body: {
        patientName: 'John Doe',
        dob: '1990-01-01',
        gender: 'Male',
        medicalHistory: ['none'],
        reasonForVisit: 'Checkup',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const created = { ...req.body, userId: req.user.id };
    sinon.stub(MedicalRecord, 'create').resolves(created);
    await addMedicalRecord(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(created)).to.be.true;
  });
});

import React, { useState } from 'react'
import Header from './Header'
import ProgressBar from './ProgressBar'
import { useNavigate } from 'react-router-dom'
import { IoClose } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import PatientModal from './SelectClinicModal'


const Management = () => {

    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    // Close modal function
    const closeModal = () => setModal(false);


    
  const openModal = () => setIsModalOpen(true);

    return(
        <div className='ml-72 py-8 px-8 w-fit flex flex-col gap-12'>
            
     {isModalOpen && <PatientModal setIsModalOpen={setIsModalOpen} />}

     {modal && (
  <div
    role="dialog"
    aria-modal="true"
    className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-15 backdrop-blur-sm"
    onClick={(e) => {
      // Close modal when clicking outside it
      if (e.target === e.currentTarget) closeModal();
    }}
  >
    <div className="relative mt-20 bg-white p-6 rounded-lg border border-t-0 border-r-0 border-l-4 border-b-0 border-[#0F973D] w-fit">
      <button
        className="absolute top-4 right-3 text-xl font-semibold cursor-pointer"
        onClick={closeModal}
        aria-label="Close"
      >
        <IoClose size={20}/>
      </button>
      <div className="flex items-start gap-6 pr-8">
        <span className="w-10 h-10 rounded-lg justify-center items-center p-1.5 bg-green-100">
          <IoIosCheckmarkCircle size={20} color='#0f973d' />
        </span>
        <div className="flex flex-col items-start gap-2 pr-6 border border-l-0 border-r border-b-0 border-t-0 border-gray-300">
          <h3 className="text-base font-bold">Success!</h3>
          <p className="text-base font-medium">
            You have finished attending to your patient
          </p>
          <div className="flex justify-between gap-4 mt-4">
            <button
              onClick={() => {
                closeModal();
                openModal();
              }}
              className="bg-[#0F973D] text-white px-4 py-2 rounded-lg"
            >
              Attend to next patient
            </button>
            <button
              onClick={() => {
                closeModal();
                navigate('/');
              }}
              className="border border-gray-600 px-4 py-2 rounded-lg"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

        <Header/>
        <ProgressBar />
        <form action="" className='flex flex-col gap-5 w-fit'>
            <main className="flex gap-40">
            <section className='flex flex-col gap-12 w-fit'>

                <div className="flex flex-col gap-2">
                    <label htmlFor="treatmentMgtOptions" className="font-medium text-base">Treatment / Management Option(s)</label>
                    <div className="grid grid-cols-2 gap-5">
                        <label htmlFor="refractiveCorrection" className="flex items-center gap-1">
                            <input type="checkbox" name="refractiveCorrection" id="" className='h-5 w-5' />
                            Refractive Correction
                        </label>
                        <label htmlFor="medications" className="flex items-center gap-1">
                            <input type="checkbox" name="medications" id="" className='h-5 w-5' />
                            Medications
                        </label>
                        <label htmlFor="counselling" className="flex items-center gap-1">
                            <input type="checkbox" name="counselling" id="" className='h-5 w-5' />
                            Counselling
                        </label>
                        <label htmlFor="lowVisionAid" className="flex items-center gap-1">
                            <input type="checkbox" name="lowVisionAid" id="" className='h-5 w-5' />
                            Low Vision aid
                        </label>
                        <label htmlFor="therapy" className="flex items-center gap-1">
                            <input type="checkbox" name="therapy" id="" className='h-5 w-5' />
                            Therapy
                        </label>
                        <label htmlFor="surgery" className="flex items-center gap-1">
                            <input type="checkbox" name="surgery" id="" className='h-5 w-5' />
                            Surgery
                        </label>
                        <label htmlFor="referral" className="flex items-center gap-1">
                            <input type="checkbox" name="referral" id="" className='h-5 w-5' />
                            Referral
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="refractiveCorrectionType" className="text-base font-medium">Type of Refractive Correction</label>
                    <select name="refractiveCorrectionType" className='h-14 border border-[#d0d5dd] w-[375px] rounded-md' id=""></select>
                </div>


                <div className="flex flex-col gap-2">
                    <label htmlFor="finalPrescription" className="text-base font-medium flex items-center">Final Prescription <span className='text-red-600 font-bold'>*</span></label>

                <aside className="flex gap-4">
                    <div className="flex flex-col justify-end gap-4 items-baseline">
                    <h1 className='text-xl font-bold text-center'>OD</h1>
                    <h1 className='text-xl font-bold text-center'>OS</h1>
                    </div>

                    <div className='flex gap-4'>
                <div className='flex flex-col'>
                    <label htmlFor="" className='px-4 text-center font-normal text-base'>SPH
                    </label>
                    <input type="text" className='w-20 h-9 mb-4 rounded-md border border-[#d0d5dd] px-4' name='finalPrescriptionSphOd' placeholder='-2.00' />
                    <input type="text" name='finalPrescriptionSphOs' placeholder='-2.00' className='w-20 h-9 px-4 rounded-md border border-[#d0d5dd]' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor=""  className='text-center font-normal text-base'>CYL
                    </label>
                    <input type="text" className='w-20 px-4 h-9 mb-4 rounded-md border border-[#d0d5dd]' name='finalPrescriptionCylOd' placeholder='-1.25' />
                    <input type="text" name='finalPrescriptionCylOs' placeholder='-1.25' className='w-20 px-4 h-9 rounded-md border border-[#d0d5dd]'  />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-center font-normal text-base'>AXIS
                    </label>
                    <input type="text" className='w-20 px-4 h-9 mb-4 rounded-md border border-[#d0d5dd]' name='finalPrescriptionAxisOd' placeholder='90' />
                    <input type="text" className='w-20 h-9 rounded-md border border-[#d0d5dd] px-4' name='finalPrescriptionAxisOs' placeholder='90'/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="" className='text-center font-normal text-base'>ADD
                    </label>
                    <input type="text" name='finalPrescriptionAddOd' placeholder='+2.25' className='w-20 px-4 h-9 mb-4 rounded-md border border-[#d0d5dd]' />
                    <input type="text" className='w-20 px-4 h-9 rounded-md border border-[#d0d5dd]' placeholder='+2.25' name='finalPrescriptionAddOs' />
                </div>

                </div>
                </aside>
                    

                </div>

                <div className="flex flex-col">
                    <label htmlFor="lensType" className="font-medium text-base">Type of Lens</label>
                    <select name="lensType" className='border border-[#d0d5dd] rounded-md h-14 w-[375px]' id=""></select>
                </div>

                <div className="flex gap-10 w-fit">
                    <label htmlFor="pd" className="flex flex-col gap-1">PD
                        <input type="text" name='pd' className='w-20 h-9 p-2 border border-[#d0d5dd] rounded-lg' placeholder='in mm' />
                    </label>
                    <label htmlFor="pd" className="flex flex-col gap-1">Segment Height
                        <input type="text" name='segmentHeight' className='w-20 h-9 p-2 border border-[#d0d5dd] rounded-lg' placeholder='in mm' />
                    </label>
                    <label htmlFor="pd" className="flex flex-col gap-1">Fitting Cross Height
                        <input type="text" name='fittingCrossHeight' className='w-20 h-9 p-2 border border-[#d0d5dd] rounded-lg' placeholder='in mm' />
                    </label>
                </div>
            </section>
            <section className="flex flex-col gap-12">
                <div className="flex flex-col gap-1">
                    <label htmlFor="eyeForMedication" className="text-base font-medium">Medication prescribed for which eye?</label>
                    <div className="flex gap-4">
                        <label htmlFor="rightEyeMedication" className="flex items-center  gap-1 font-medium text-base">
                            <input type="radio" name="rightEyeMedication" id="" />
                            OD
                        </label>
                        <label htmlFor="leftEyesMedication" className="flex items-center  gap-1 font-medium text-base">
                            <input type="radio" name="leftEyeMedication" id="" />
                            OS
                        </label>
                        <label htmlFor="bothEyesMedication" className="flex items-center  gap-1 font-normal text-base">
                            <input type="radio" name="bothEyesMedication" id="" />
                            OU
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="medicationName" className="text-base font-medium">Medication Name</label>
                    <select name="medicationName" id="" className='border border-[#d0d5dd] rounded-md h-14 w-[375px]'></select>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="medicationType" className="text-base font-medium">Medication Type</label>
                    <select name="medicationType" id="" className='border border-[#d0d5dd] rounded-md h-14 w-[375px]'></select>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="medicationDosage" className="font-medium text-base">Medication Dosage</label>
                    <textarea name="medicationDosage" 
                    placeholder='
                    Example: 
                    TID x 2/52' id="" 
                    className='border border-[#d0d5dd] h-48 w-[375px] rounded-md p-4'
                    ></textarea>
                </div>
            
            </section>

            </main>
            <button
          type='button'
          onClick={() => setModal(true)}
          className='w-24 h-14 mx-auto mr-0 p-4 rounded-lg bg-[#2f3192] text-white'
        >
          Finish
        </button>
        </form>
        
    </div>
  )
}

export default Management

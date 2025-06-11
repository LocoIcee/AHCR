import React from 'react';

const AdoptionProcess = () => {
  const steps = [
    {
      number: '01',
      title: 'ADOPTION APPLICATION',
      description: 'Begin by filling out an adoption application for the dog you wish to adopt. Please be thorough and truthful with your answers - any false or negative information may disqualify you for adoption. An adoption application should be viewed like a job application. Take your time when filling it out and make sure to include important information that will make your application stand out.',
      note: 'Please note that only those selected to move on to the next stage of the process will be contacted'
    },
    {
      number: '02',
      title: 'PHONE SCREENING',
      description: 'Once your adoption application has been received, selected applicants (not every applicant) will be contacted by one of our team members for a phone screening. This is an opportunity to go over your adoption application and discuss the Almost Home Canine Rescue process and provide more context to you application.'
    },
    {
      number: '03',
      title: 'MEET THE DOG',
      description: 'If you meet the preliminary screening criteria, we will arrange a time and date for you to meet the dog at our rescue, or possibly with the foster at an agreed upon location. We ask you to be able to meet within 24 hours of your phone screening, and ask all household members attend the meeting. We have found that scheduling farther out results in too many cancellations and the dog missing out on potential applications.',
      note: 'Please note that a meet and greet does not guarantee you will be selected as the adopter. We want the dogs to find their best fit, and therefore we cannot hold dogs.'
    },
    {
      number: '04',
      title: 'HOME CHECK',
      description: 'If the decision is made that the dog and your family are a good match, arrangements will be made for a home check. The purpose is to look at safety aspects, escape routes and home environment. We are looking for dog-friendly and dog-safe homes.',
      note: 'Please note, due to Covid-19, we will not always make home visits, but do require photos of your home, yard and anywhere the dog would be spending its time. The requested pictures can be submitted at the end of the online application'
    },
    {
      number: '05',
      title: 'TIME TO THINK',
      description: 'There is a mandatory 24-hour cooling off period after the meeting to give you and the team member time to determine whether the dog would be a good fit in your home. This is a good time to talk about this decision with the entire family. During this time, AHCR will discuss all meets and select the best fit for the dog.'
    },
    {
      number: '06',
      title: 'FINALIZING THE ADOPTION',
      description: 'If both you and the team member agree to move forward with the adoption, arrangements will be made to finalize it. You will be asked to sign an adoption contract, and pay the adoption fee. Almost Home Canine Rescue (AHCR) dogs 6 months and older will be spayed/neutered and the procedure will be covered by AHCR. They will be scheduled as soon as appointments are available with our vet. Puppies younger than 6 months are required to be spayed/neutered at 6 months at the adopters expense. The adoption fee covers their vaccinations to date, deworming, microchip and any other treatments and tests medically required prior to adoption. More details regarding spay and neuter are provided in the adoption contract.'
    }
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      {steps.map((step, index) => (
        <div key={index} className={`mb-8 ${index !== steps.length - 1 ? 'border-b border-gray-200 pb-6' : ''}`}>
          <div className="flex items-start mb-3">
            <div className="mr-4">
              <div className="bg-[#9c7459] text-white text-2xl font-bold py-2 px-4 rounded">
                {step.number}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-700 mb-3">{step.title}</h3>
              <p className="text-gray-600 mb-2">{step.description}</p>
              {step.note && (
                <p className="text-sm italic text-gray-500 mt-2">
                  <strong>*</strong> {step.note}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="text-center mt-6">
        <a href="#dog-listings" className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded transition inline-block">
          View Available Dogs
        </a>
      </div>
    </div>
  );
};

export default AdoptionProcess;
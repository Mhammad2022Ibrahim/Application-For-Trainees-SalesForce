import { LightningElement, wire, track } from 'lwc';
import getAcceptedInterviewApplicants from '@salesforce/apex/InterviewController.getAcceptedInterviewApplicants';
import getInterviewDetails from '@salesforce/apex/InterviewController.getInterviewDetails';

export default class InterviewsProcesses extends LightningElement {

    @track acceptedInterviewApplicants;

    @track showInterviewDetails;

    @track interviewDetails = {
        Interview_Status__c: '',
        Interviewer__c: '',
        Interview_Date__c: '' 
    };

    _wiredInterview;

    // Fetch accepted interview applicants
    @wire(getAcceptedInterviewApplicants)

    wiredAcceptedInterviewApplicants(result) {
        if (result.data) {
            this.acceptedInterviewApplicants = [...result.data];
            console.log('Fetched Data:', this.acceptedInterviewApplicants); // Log fetched data
        } else if (result.error) {
            console.error('Error fetching Accepted Interview Applicants:', result.error);
        }
    }


    // Method to handle applicant click
    // handleApplicantClick(event) {
    //     const applicantId = event.currentTarget.dataset.id;
        
    //     // Call Apex method to get interview details
    //     getInterviewDetails({ applicantId })
    //         .then(result => {
    //             this.showInterviewDetails = result;
    //         })
    //         .catch(error => {
    //             // Handle error if any
    //             console.error('Error fetching interview details:', error);
    //         });
    // }


    handleApplicantClick(event) {
        const applicantId = event.currentTarget.dataset.id;
        
        // Call Apex method to get interview details
        getInterviewDetails({ applicantId })
            .then(result => {
                this.showInterviewDetails = result;
    
                // Assign the value from applicant.Date_Interview__c to showInterviewDetails.Interview_Date__c
                this.showInterviewDetails.Interview_Date__c = this.acceptedInterviewApplicants.find(applicant => applicant.Id === applicantId).Date_Interview__c;
            })
            .catch(error => {
                // Handle error if any
                console.error('Error fetching interview details:', error);
            });
    }
    

}








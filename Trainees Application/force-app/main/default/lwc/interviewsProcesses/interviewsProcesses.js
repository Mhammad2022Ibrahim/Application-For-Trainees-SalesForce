// interviewsProcesses.js
import { LightningElement, wire, track, api } from 'lwc';
import getAcceptedInterviewApplicants from '@salesforce/apex/InterviewController.getAcceptedInterviewApplicants';
import getInterviewDetails from '@salesforce/apex/InterviewController.getInterviewDetails';
import getFeedbackInterview from '@salesforce/apex/InterviewController.getFeedbackInterview';
import { refreshApex } from '@salesforce/apex';

export default class InterviewsProcesses extends LightningElement {
    @track acceptedInterviewApplicants;

    @track showInterviewDetails;

    @track interviewFeedback;

    @track showFeedbackForm = false;

    @wire(getAcceptedInterviewApplicants)
    wiredAcceptedInterviewApplicants(result) {
        if (result.data) {
            this.acceptedInterviewApplicants = [...result.data];
            console.log('Fetched Data:', this.acceptedInterviewApplicants);
        } else if (result.error) {
            console.error('Error fetching Accepted Interview Applicants:', result.error);
        }
    }

    // wiredFeedbackResult a variable to hold the wired getFeedbackInterview result
    wiredFeedbackResult;

    @wire(getFeedbackInterview)
    wiredFeedbackInterview(result) {
        this.wiredFeedbackResult = result;
        if (result.data) {
            this.interviewFeedback = [...result.data];
            console.log('Fetched Data:', this.interviewFeedback);
        } else if (result.error) {
            console.error('Error fetching Feedback Interview:', result.error);
        }
    }


    handleApplicantClick(event) {
        const applicantId = event.currentTarget.dataset.id;

        // Call Apex method to get interview details
        getInterviewDetails({ applicantId })
            .then(result => {
                this.showInterviewDetails = result;

                const interviewDetails = this.template.querySelector('c-interview-details');
                if (interviewDetails) {
                    interviewDetails.interviewData = this.showInterviewDetails;
                }
            })
            .catch(error => {
                console.error('Error fetching interview details:', error);
            });
    }


    handleInterviewUpdated(event) {

    }





    cancelEditForm() {
        this.showInterviewDetails = null;
        // Refresh the list of accepted interview applicants
        refreshApex(this.wiredAcceptedInterviewApplicants);
    }



    handleClickAdded(event) {
        this.showFeedbackForm = true; // Show the Feedback form on button click
        // const interviewFeedback = this.template.querySelector('c-feedback');
        // if (interviewFeedback) {
        //     interviewFeedback.feedbackData = this.showInterviewDetails;
        // }

    }

    // Handle the custom event dispatched from c-feedback
    handleFeedbackAdded() {
        // Refresh the list of interview feedback by calling the Apex method again
        refreshApex(this.wiredFeedbackResult);
    }

    handleCloseForm() {
        this.showFeedbackForm = false; // Hide the Feedback form
    }



}



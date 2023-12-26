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

    wiredtest;
    @wire(getAcceptedInterviewApplicants)
    wiredAcceptedInterviewApplicants(result) {
        this.wiredtest = result;
        if (result.data) {
            this.acceptedInterviewApplicants = [...result.data];
            console.log('Fetched Data:', this.acceptedInterviewApplicants);
            console.log('wiredAcceptedInterviewApplicants: ', result);
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

        // Call the wire method to get interview details dynamically
        getInterviewDetails({ applicantId, cacheKey: new Date().getTime()})
            .then(result => {
                this.showInterviewDetails = result;
                console.log('Display details in get method:', result);

                const interviewDetails = this.template.querySelector('c-interview-details');
                if (interviewDetails) {
                    interviewDetails.interviewData = this.showInterviewDetails;
                }
            })
            .catch(error => {
                console.error('Error fetching interview details:', error);
            });

    }


    // Handle the custom event dispatched from c-interview-details
    handleInterviewUpdated(event) {
        const updatedDetails = event.detail.updatedInterviewDetails;

        // Update the component property
        this.showInterviewDetails = { ...updatedDetails };
        // this.showInterviewDetails = updatedDetails;
        console.log('get update: ', updatedDetails);

        // Bind the updated data to form fields
        const interviewDetailsComponent = this.template.querySelector('c-interview-details');
        if (interviewDetailsComponent) {
            interviewDetailsComponent.interviewData = this.showInterviewDetails;
        }

        refreshApex(this.wiredtest);
    }



    cancelEditForm() {
        this.showInterviewDetails = null;
        // Refresh the wired result for interview details
        return refreshApex(this.wiredtest);
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
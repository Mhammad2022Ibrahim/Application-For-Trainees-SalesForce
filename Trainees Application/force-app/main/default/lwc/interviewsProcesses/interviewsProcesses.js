// interviewsProcesses.js
import { LightningElement, wire, track } from 'lwc';
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
            console.log('Fetched Data:', this.acceptedInterviewApplicants); // Log fetched data
        } else if (result.error) {
            console.error('Error fetching Accepted Interview Applicants:', result.error);
        }
    }

    @wire(getFeedbackInterview)
    wiredFeedbackInterview(result) {
        if (result.data) {
            this.interviewFeedback = [...result.data];
            console.log('Fetched Data:', this.interviewFeedback); // Log fetched data
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

    cancelEditForm() {
        this.showInterviewDetails = null; // Reset the interview details to close the edit form
    }

    handleInterviewUpdated(event) {
        refreshApex(this.showInterviewDetails);

    }


    handleClickAdded(event) {
        this.showFeedbackForm = true; // Show the Feedback form on button click
        const interviewFeedback = this.template.querySelector('c-feedback');
        if (interviewFeedback) {
            interviewFeedback.feedbackData = this.showInterviewDetails;
        }
    }

    handleCloseForm() {
        this.showFeedbackForm = false; // Hide the Feedback form
    }


}



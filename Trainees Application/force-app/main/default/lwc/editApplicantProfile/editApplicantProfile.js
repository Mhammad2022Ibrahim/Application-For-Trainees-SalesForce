import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EditApplicantProfile extends LightningElement {

    @api applicantData;
    @api recordId;
    
    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;

        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }


    handleSuccess(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Record updated successfully',
                variant: 'success',
            })
        );
        // Emit a custom event upon successful record update
        const successEvent = new CustomEvent('applicantupdated');
        this.dispatchEvent(successEvent);

    }



    handleError(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Error updating record',
                variant: 'error',
            })
        );
    }

}







    // handleSuccess(event) {
    //     this.dispatchEvent(
    //         new ShowToastEvent({
    //             title: 'Success',
    //             message: 'Record updated successfully',
    //             variant: 'success',
    //         })
    //     );
    
    //     // Refresh the list of applicants
    //     const appInfoComponent = this.closest('c-application-information');
    //     if (appInfoComponent) {
    //         appInfoComponent.refreshList();
    //     }
    
    //     // Update the selected applicant's data
    //     const selectedApplicant = this.applicantData;
    //     if (selectedApplicant) {
    //         getApplicantDetails({ applicantId: selectedApplicant.Id })
    //             .then(result => {
    //                 this.applicantData = result;
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching updated applicant details:', error);
    //             });
    //     }

    //     getRecordNotifyChange([{ recordId: this.applicantData.recordId }]);
    //     // Refresh the list of applicants to reflect the changes
    //     return refreshApex(this._wiredApplicants);
    // }
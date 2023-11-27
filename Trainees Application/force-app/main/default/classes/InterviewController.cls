public with sharing class InterviewController {

    @AuraEnabled(cacheable=true)
    public static List<Applicant_Profile__c> getAcceptedInterviewApplicants() {
        return [SELECT Id, Name, Date_Interview__c FROM Applicant_Profile__c WHERE Status__c = 'Accepted to Interview'];
    }

    @AuraEnabled(cacheable=true)
    public static Interview__c getInterviewDetails(String applicantId) {
        List<Interview__c> interviews = [SELECT Id, Name, Interviewer__c, Interview_Status__c FROM Interview__c WHERE Applicant__c = :applicantId LIMIT 1];

        if (!interviews.isEmpty()) {
            return interviews[0];
        } else {
            return new Interview__c();
        }
    }

    @AuraEnabled
    public static void insertInterviewRecord(Interview__c interviewData) {
        try {
            insert interviewData;
        } catch (Exception e) {
            // Handle the exception, e.g., log the error
            System.debug('Error inserting interview record: ' + e.getMessage());
        }
    }
}



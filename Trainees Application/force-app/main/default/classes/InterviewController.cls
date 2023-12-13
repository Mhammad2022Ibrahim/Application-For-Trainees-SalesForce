public with sharing class InterviewController {

    @AuraEnabled(cacheable=true)
    public static List<Applicant_Profile__c> getAcceptedInterviewApplicants() {
        return [SELECT Id, Name, Status__c FROM Applicant_Profile__c WHERE Status__c = 'Accepted to Interview'];
    }

    @AuraEnabled(cacheable=true)
    public static Interview__c getInterviewDetails(String applicantId) {
        List<Interview__c> interviews = [SELECT Id, Name, Interview_Date__c, Applicant__c, Interviewer__c, Interview_Status__c 
        FROM Interview__c WHERE Applicant__c = :applicantId LIMIT 1];

        if (!interviews.isEmpty()) {
            return interviews[0];
        } else {
            return new Interview__c();
        }
    }


    @AuraEnabled(cacheable=true)
    public static List<Feedback__c> getFeedbackInterview() {
       return [SELECT Id, Feedback_Text__c, Applicant__r.Name, Interviewer__r.Name 
               FROM Feedback__c];
    }

}



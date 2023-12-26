public with sharing class InterviewController {

    // @AuraEnabled(cacheable=true)
    // public static List<SObject> getAcceptedInterviewApplicants() {
    //     String queryString = 'SELECT Id, Name, Status__c FROM Applicant_Profile__c WHERE Status__c = \'Accepted to Interview\'';
    //     return Database.query(queryString);
    // }


    // @AuraEnabled(cacheable=true)
    // public static Interview__c getInterviewDetails(String applicantId) {
        
    //     String query = 'SELECT Id, Name, Interview_Date__c, Applicant__c, Interviewer__c, Interview_Status__c FROM Interview__c WHERE Applicant__c = :applicantId LIMIT 1';
    //     Interview__c interview = Database.query(query);

    //     if (interview != null) {
    //         return interview;
    //     } else {
    //         return new Interview__c();
    //     }
    // }

    @AuraEnabled(cacheable=true)
    public static Interview__c getInterviewDetails(String applicantId, String cacheKey) {
        String query = 'SELECT Id, Name, Interview_Date__c, Applicant__c, Interviewer__c, Interview_Status__c FROM Interview__c WHERE Applicant__c = :applicantId LIMIT 1';
        Interview__c interview = Database.query(query);
    
        if (interview != null) {
            return interview;
        } else {
            return new Interview__c();
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Applicant_Profile__c> getAcceptedInterviewApplicants() {
        String queryString = 'SELECT Id, Name, Status__c, (SELECT Id, Name, Interview_Date__c, Interviewer__c, Interview_Status__c FROM Interviews__r LIMIT 1) FROM Applicant_Profile__c WHERE Status__c = \'Accepted to Interview\'';
        return Database.query(queryString);
    }




    @AuraEnabled(cacheable=true)
    public static List<Feedback__c> getFeedbackInterview() {
        String query = 'SELECT Id, Feedback_Text__c, Applicant__r.Name, Interviewer__r.Name FROM Feedback__c';
        return Database.query(query);
    }


    }
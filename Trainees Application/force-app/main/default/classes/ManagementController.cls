public with sharing class ManagementController {
    @AuraEnabled(cacheable=true)
    public static List<Training_Progress__c> getTrainingProgress() {
        String query = 'SELECT Id, Trainee__r.Name,Task_Assignment__r.Name, Task_Assignment__r.Status__c FROM Training_Progress__c';
        return Database.query(query);
    }



}
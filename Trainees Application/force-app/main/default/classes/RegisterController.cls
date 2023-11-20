// public with sharing class RegisterController {
//     @AuraEnabled
//     public static void saveRegister(String traineeJson) {
//         try {
//             Trainee__c trainee = (Trainee__c)JSON.deserialize(traineeJson, Trainee__c.class);

//             if (Schema.SObjectType.Trainee__c.isCreateable()) {
//                 insert new List<Trainee__c>{ trainee };
//             } else {
//                 throw new AuraHandledException('Insufficient permissions to create Trainee records.');
//             }
//         } catch (Exception ex) {
//             throw new AuraHandledException(ex.getMessage());
//         }
//     }
// }


public with sharing class RegisterController {
    @AuraEnabled
    public static void saveRegister(Trainee__c trainee) {
        try {
            if (Schema.SObjectType.Trainee__c.isCreateable()) {
                insert new List<Trainee__c>{ trainee };
            } else {
                throw new AuraHandledException('Insufficient permissions to create Trainee records.');
            }
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
}


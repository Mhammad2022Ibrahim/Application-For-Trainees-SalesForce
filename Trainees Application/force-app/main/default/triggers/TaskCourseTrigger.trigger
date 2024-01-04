// trigger TaskCourseTrigger on Task_Assignment__c (after insert) {
//     Set<Id> traineeIds = new Set<Id>();
//     for (Task_Assignment__c task : Trigger.new) {
//         traineeIds.add(task.Trainee__c);
//     }

//     Map<Id, Trainee__c> traineeMap = new Map<Id, Trainee__c>([SELECT Id, Name FROM Trainee__c WHERE Id IN :traineeIds]);

//     // Query existing Training_Progress__c records for the Trainee__c
//     Map<Id, Training_Progress__c> progressMap = new Map<Id, Training_Progress__c>([SELECT Id, Trainee__c FROM Training_Progress__c WHERE Trainee__c IN :traineeIds]);

//     List<Training_Progress__c> progressList = new List<Training_Progress__c>();
//     for (Task_Assignment__c task : Trigger.new) {
//         if (task.Trainee__c != null) {
//             String progressName = traineeMap.get(task.Trainee__c).Name + ' Training Progress';

//             // Check if a Training_Progress__c record already exists for the Trainee__c
//             if (progressMap.containsKey(task.Trainee__c)) {
//                 // If a record exists, update it
//                 Training_Progress__c existingProgress = progressMap.get(task.Trainee__c);
//                 existingProgress.Task_Assignment__c = task.Id;  // Update the Task_Assignment__c field
//                 progressList.add(existingProgress);
//             } else {
//                 // If no record exists, create a new one
//                 Training_Progress__c progress = new Training_Progress__c(
//                     Name = progressName,
//                     Task_Assignment__c = task.Id,
//                     Trainee__c = task.Trainee__c
//                 );
//                 progressList.add(progress);
//             }
//         }
//     }

//     // Use upsert instead of insert to handle both insert and update operations
//     if (!progressList.isEmpty()) {
//         upsert progressList;
//     }
// }



trigger TaskCourseTrigger on Task_Assignment__c (after insert) {
    Set<Id> traineeIds = new Set<Id>();
    for (Task_Assignment__c task : Trigger.new) {
        traineeIds.add(task.Trainee__c);
    }

    Map<Id, Trainee__c> traineeMap = new Map<Id, Trainee__c>([SELECT Id, Name FROM Trainee__c WHERE Id IN :traineeIds]);

    // Query existing Training_Progress__c records for the Trainee__c
    Map<Id, Training_Progress__c> progressMap = new Map<Id, Training_Progress__c>([SELECT Id, Trainee__c, Name FROM Training_Progress__c WHERE Trainee__c IN :traineeIds]);

    List<Training_Progress__c> progressList = new List<Training_Progress__c>();
    for (Task_Assignment__c task : Trigger.new) {
        if (task.Trainee__c != null) {
            String progressName = traineeMap.get(task.Trainee__c).Name + ' Training Progress';

            // Check if a Training_Progress__c record already exists for the Trainee__c
            if (progressMap.containsKey(task.Trainee__c)) {
                // If a record exists, update it
                Training_Progress__c existingProgress = progressMap.get(task.Trainee__c);
                if(existingProgress.Name == progressName) {
                    existingProgress.Task_Assignment__c = task.Id;  // Update the Task_Assignment__c field
                    progressList.add(existingProgress);
                }
            } else {
                // If no record exists, create a new one
                Training_Progress__c progress = new Training_Progress__c(
                    Name = progressName,
                    Task_Assignment__c = task.Id,
                    Trainee__c = task.Trainee__c
                );
                progressList.add(progress);
            }
        }
    }

    // Use upsert instead of insert to handle both insert and update operations
    if (!progressList.isEmpty()) {
        upsert progressList;
    }
}



























// trigger TaskCourseTrigger on Task_Assignment__c (after insert) {
//     // Get the IDs of the Trainee__c records related to the Task_Assignment__c records in Trigger.new
//     Set<Id> traineeIds = new Set<Id>();
//     for (Task_Assignment__c task : Trigger.new) {
//         traineeIds.add(task.Trainee__c);
//     }

//     // Query the Trainee__c records to get the Name field
//     Map<Id, Trainee__c> traineeMap = new Map<Id, Trainee__c>([SELECT Id, Name FROM Trainee__c WHERE Id IN :traineeIds]);

//     List<Training_Progress__c> progressList = new List<Training_Progress__c>();
//     for (Task_Assignment__c task : Trigger.new) {
//         if (task.Trainee__c != null) {
//             // Use the Name field from the queried Trainee__c record
//             String progressName = traineeMap.get(task.Trainee__c).Name + ' Training Progress';

//             Training_Progress__c progress = new Training_Progress__c(
//                 Name = progressName,
//                 Task_Assignment__c = task.Id,
//                 Trainee__c = task.Trainee__c
//             );
//             progressList.add(progress);
//         }
//     }

//     if (!progressList.isEmpty()) {
//         insert progressList;
//     }
// }




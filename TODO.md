
*CODE* 
1.	user has hit landing page and inputs a job title, afterwards the form is shown, user asked to sign up. Using Redux save state when user sign up or sign in to save the form. 
2.	User selects contractor in contractor details page, triggers email to contractor. (State management) 
3.	when the Contractor accepts the job, it should automatically update the Job Request table with contractor’s ID (trigger) and the status set to “In Progress” in the database. 
4.	User is on accounts page and clicks “Become a Pro” directed to contractor form (Page request)
5.	User has changed their mind and wants a different contractor. User selects update contractor (this button is only available to pending and in progress jobs). User clicks Yes on prompt, status updates to “Pending” until new contractor is selected
6.	Contractor doesn’t wish to perform job anymore selects cancel. Job request set to “Pending” user is notified and contract id is removed. User can navigate to contractor overview when they click on the job request with status pending or in progress.
7.	User clicks cancel, job status set to cancelled. User may leave a review as cancelled and completed jobs trigger the hidden button “Leave Review” on the dashboard Contractor notified
8.	User clicks completed; job status set to completed. User may leave a review as cancelled and completed jobs trigger the hidden button “Leave Review”. Contractor notified
    a.	Have review form greyed on job details form unless status set to cancelled or completed. 
9.	User had made it to contractor page. User allowed to fill out email form when submitted triggers email to contractor with Title, Message, Name, email, and phone
10.	user is updating the job and selects new contractor; popup prompts the user to verify then redirects to contractor overview (setting job status is reverted to “Pending”).


*Documentation*
1. Models Doc
    a. implementation models w/ diagrams
        i. Should have what system we used, explain why, and indicate how it all integrates to form the solution architecture
            1. Component
            2. Integration
            3. Deployment
2. SRS Doc
    a. UML diagrams (sequence, activity, use case, class). 1 of each. Basically, at a high level how actors and systems work – for SRS
    b. Redress domain model (basically just how objects interact and their relations)
    c. Requirements model (functional/nonfunctional requirements but as a models)

3. Testing
    a. Create test plan
        i. Unit testing
        ii. integration testing
        iii. system testing
        iv. acceptance testing
    b. Test cases by module
    c. Can use selenium web drive (can use any language
4. Presentation Doc
    a. Video Presentation/powerpoint – 5 mins
# Day 1 Review

Please address your current understanding of the following topics we covered (or began to cover) in class today. Your thoughts about these can and should be revised throughout the training (and your career!) as your understanding grows.

I am *not* looking for super "technical" stuff here. Just your ability to express and convey in your way your understanding of these things.

## 1. Git

We created a git repository on our VMs and added some existing code and committed it. We then used the `gh` cli tool to push that code to Github. 

- Say a few words about why *we* are using source control in this class?
We are using source control in this class so we can learn and experience working on a team, coding together, and so Jeff can check every single line of code we type. This check from Jeff is so he can grade and fail all of us.
- Say a few words about how source control is used by teams of developers working on the same code base.
This is to allow multiple developers to work on the same code/project at the same time. By creating branches and merging the changes each person makes to allow them to progress up the pipeline.
- What is meant when we say a copy of the repository is the "origin"? (That's our copy on github).
It is the main line of the code/program that everyone can grab to have the most up to date code/program. This allows minimal merge conflicts and allows us to make sure our code isn't using "old" methods.
- Why do we create commits locally?
This is so as we are woking through code it doesnt consistantly updating and cause a backlog of updates, or over writing of code. This allows us to work through our code make mistakes, update and send the code up in one batch and deal with conflicts in one shot.
- Why do we push those commits to Github?
Everyone can pull down changes and if anything goes wrong we can pull it to a new computer. Or even our team can look into problems if you have them.


### Extra Credit

What were the steps, as detailed as you like, that we took to create our repository and push it to Github.
get init >>> git add . >> git commit -m "Initial" >>> gh repo create >> Lots of enter buttons lol 
All done

What are some other ways you might do the same thing?



## 2. Services

We began a project in Visual Studio to create a service. What is meant by the term "Service" in software development?

Our service exposes an *interface* that other applications can use to drive our service (make it do stuff). This is an
"Application Programming Interfact". How does an API differ from a "User Interface" (UI)? How are they similiar?

What are some benefits of exposing a service's interface using the HTTP Protocol?

We "tested" our API three different ways. 

1. Manually using SwaggerUI
2. Manually using the `.http` file functionality in Visual Studio
3. Automated using an xUnit test project.

Which is the *right* way to do it? Why give preference to automated tests? 

### Extra Credit

Have you used any existing HTTP APIs in other projects?

Have you created any other HTTP APIs in your own work or studies?


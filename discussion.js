var submitQuestionNode=document.getElementById("submitBtn")
var questionTitleNode=document.getElementById("subject")
var questionDescriptionNode= document.getElementById("question")
var allQuestionsListNOde=document.getElementById("dataList");
var createQuestionFormNode=document.getElementById("toggleDisplay")
var QuestionDetailContainerNode=document.getElementById("respondQue")
var resolveQuestionContainerNode=document.getElementById(" resolveHolder")
var resolveQuestionNode=document.getElementById("resolveQuestion")
var upvote=document.getElementById("upvote")
var downvote=document.getElementById("downvote")
var responseContainerNode=document.getElementById("respondAns")
var commentContainerNode=document.getElementById("commentHolder")
var commentatorNameNode=document.getElementById("pickName")
var commentNode=document.getElementById("pickComment")
var submitCommentNode=document.getElementById("commentBtn")
var questionSearchNode=document.getElementById("questionSearch")


//listen to value change
questionSearchNode.addEventListener("change",function(event)
{
      //show filtered result
      filterResult(event.target.value);
})
 //filter result
 function filterResult(query){
     var allQuestions=getAllQuestions();

     if(query)
     {
        clearQuestionPanel()
         var filterQuestions=allQuestions.filter(function(question){
        if(question.title.includes(query))
           {
               return true;
            }
        })
        if(filterQuestions.length){
            filterQuestions.forEach(function(question){
                addQuestionToPanel(question)
            })
        }
        else{
            printNoMatchFound();
        }
    }
    else
    {
        clearQuestionPanel()
        // var allQuestions=getAllQuestions();
        allQuestions.forEach(function(question)
        {
            
            addQuestionToPanel(question)
        })
    }
 }



//clear all question
function clearQuestionPanel(){
    allQuestionsListNOde.innerHTML="";
}

//display existing item
function onLoad()
{
    //get all queston from storage
    var allQuestions=getAllQuestions();
    allQuestions.forEach (function(question)
    {
        addQuestionToPanel(question)
    })
}

onLoad();

//listen for the submit button to create questtion
submitQuestionNode.addEventListener("click",onQuestionSubmit)

function onQuestionSubmit()
{
    var question={
        title: questionTitleNode.value,
        description:questionDescriptionNode.value,
        responses:[],
        upvotes:0,
        downvotes:0
    }

     saveQuestion(question);
    addQuestionToPanel(question)

}




//save question to the storage
function saveQuestion(question)
{
       //  localStorage.setItem("question",question)    -//it will overwrite the all value coz only one is saved
   
    var allQuestions=getAllQuestions();
    allQuestions.push(question)
    localStorage.setItem("questions",JSON.stringify(allQuestions));
}

//get all question from storage
function getAllQuestions()
{
    var allQuestions=localStorage.getItem("questions");
    if(allQuestions){
        allQuestions=JSON.parse(allQuestions)
       }
       else{
        allQuestions=[];
       }
       return allQuestions;
}




//append question to the left pannel
function addQuestionToPanel(question)
{
          var questionContainer=document.createElement("div");
          questionContainer.setAttribute("id",question.title)
          var newQuestionTitleNode=document.createElement("h4")
          newQuestionTitleNode.innerHTML=question.title
          
          questionContainer.appendChild(newQuestionTitleNode)
          questionContainer.style.background="grey"
          
          var newQuestionDescriptionNode=document.createElement("p")
          newQuestionDescriptionNode.innerHTML=question.description
          questionContainer.appendChild(newQuestionDescriptionNode)
           

          var upvoteTextNode =document.createElement("h4")
          upvoteTextNode.innerHTML="upvote ="+ question.upvotes
          questionContainer.appendChild(upvoteTextNode)

          var downvoteTextNode =document.createElement("h4")
          downvoteTextNode.innerHTML="downvote ="+ question.upvotes
          questionContainer.appendChild(downvoteTextNode)


          allQuestionsListNOde.appendChild(questionContainer)
          questionContainer.addEventListener("click",onQuestionClick(question))

}
   function clearquestionform()
   {

   }



//clearquqestionform



//listen for click on question and diplay in right pane

function onQuestionClick(question){
     return function()
     {
          //by closure we can aceess question
          //hidequestionpanel
          hideQuestionPanel();
          

          //clearlastques
          clearquestionDetails()
          clearResponsePanel()

          //show clicked function whixh ae left side
          showDetails();

          //add question to right
          addQuestionToRight(question);

          //show all previous question
          question.responses.forEach(function(response){
            addResponseInPanel(response)
          })

          //listen for response submit
          submitCommentNode.onclick=("click",onResponseSubmit(question))
          downvote.onclick=downvoteQuestion(question)
          upvote.onclick=upvoteQuestion(question)
     }
    }
 //downvotes
    function downvoteQuestion(question){
        return function(){
            question.downvotes++
            console.log(question.downvotes++);
            updateQuestion(question)
            updatedQuestionUI(question)
        }
        
    }
    //upvotes
    function upvoteQuestion(question){
        return function(){
            // console.log("iii");
            question.upvotes++
            
            // console.log(question.upvotes++);
            updateQuestion(question)
            updatedQuestionUI(question)
    }
}


//update question ui
function updatedQuestionUI(question){
     //get question container from dom
          var questionContainerNode=document.getElementById(question.title)
          questionContainerNode.childNodes[2].innerHTML="upvote="+question.upvotes
          questionContainerNode.childNodes[3].innerHTML="downvote="+question.downvotes
}

//save for click on submit response button
function onResponseSubmit(question)
{
    return function()
    {
       var response={
        name: commentatorNameNode.value,
        description: commentNode.value
    }
        saveResponse(question,response)
        addResponseInPanel(response)
    }
}

//display response in response section
function addResponseInPanel(response){
    var userNameNode=document.createElement("h4")
    userNameNode.innerHTML=response.name

    var userCommentNode=document.createElement("p")
    userCommentNode.innerHTML=response.description

    var container=document.createElement("div")
    container.appendChild(userNameNode)
    container.appendChild(userCommentNode)

    responseContainerNode.appendChild(container)

}
//Hide Question panel
function hideQuestionPanel(){
      createQuestionFormNode.style.display = "none";
}


//show deatails on right panel after click on question on left
function showDetails()
{
    QuestionDetailContainerNode.style.display = "block"
    // resolveQuestionContainerNode.style.display = "block"
    resolveQuestionNode.style.display = "block"
    responseContainerNode.style.display = "block"
    commentContainerNode.style.display = "block"
}

function addQuestionToRight(question)
{
   var titleNode=document.createElement("h3")
   titleNode.innerHTML=question.title;

   var descriptionNode=document.createElement("p")
   descriptionNode.innerHTML=question.description;

   QuestionDetailContainerNode.appendChild(titleNode)
   QuestionDetailContainerNode.appendChild(descriptionNode) 
   QuestionDetailContainerNode.appendChild(resolveQuestionNode) 
   QuestionDetailContainerNode.appendChild(upvote) 
   QuestionDetailContainerNode.appendChild(downvote) 
}

//update question 
function updateQuestion(updatedQuestion)
{
    var allQuestions=getAllQuestions();
    var revisedQuestions=allQuestions.map(function(question){
        if(updatedQuestion.title===question.title){
            return updatedQuestion
        }
        return question
    })
    localStorage.setItem("questions",JSON.stringify(revisedQuestions))
}

function saveResponse(updatedQuestion,response)
{
     var allQuestions=getAllQuestions();
     var revisedQuestions=allQuestions.map(function(question)
     {
        if(updatedQuestion.title===question.title)
        { 
            question.responses.push(response)
        }
        return question;
     })
     localStorage.setItem("questions",JSON.stringify(revisedQuestions))
}

function clearquestionDetails()
{
    QuestionDetailContainerNode.innerHTML=""
}

function clearResponsePanel(){
    responseContainerNode.innerHTML=""
}

function printNoMatchFound(){
    var title=document.createElement("h1")
    title.innerHTML="NO MATCH FOUND"
    allQuestionsListNOde.appendChild(title)
}
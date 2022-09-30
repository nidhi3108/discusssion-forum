var submitQuestionNode=document.getElementById("submitBtn")
var questionTitleNode=document.getElementById("subject")
var questionDescriptionNode= document.getElementById("question")
var allQuestionsListNOde=document.getElementById("dataList");
var createQuestionFormNode=document.getElementById("toggleDisplay")
var QuestionDetailContainerNode=document.getElementById("respondQue")
var resolveQuestionContainerNode=document.getElementById(" resolveHolder")
var resolveQuestionNode=document.getElementById("resolveQuestion")
var responseContainerNode=document.getElementById("respondAns")
var commentContainerNode=document.getElementById("commentHolder")
var commentatorNameNode=document.getElementById("pickName")
var commentNode=document.getElementById("pickComment")
var submitCommentNode=document.getElementById("commentBtn")





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
        responses:[]
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
          var newQuestionTitleNode=document.createElement("h4")
          newQuestionTitleNode.innerHTML=question.title
          
          questionContainer.appendChild(newQuestionTitleNode)
          questionContainer.style.background="grey"
          
          var newQuestionDescriptionNode=document.createElement("p")
          newQuestionDescriptionNode.innerHTML=question.description
          questionContainer.appendChild(newQuestionDescriptionNode)


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

          //show clicked function whixh ae left side
          showDetails();

          //add question to right
          addQuestionToRight(question);

          //listen for response submit
          submitCommentNode.addEventListener("click",onResponseSubmit(question))
     }
}



//save for click on submit response button
function onResponseSubmit(question)
{
    return function()
    {
        saveResponse(question)
    }
}

//display response in response section

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
}

function saveResponse(updatedQuestion)
{
     var allQuestions=getAllQuestions();
     var revisedQuestions=allQuestions.map(function(question)
     {
        if(updatedQuestion.title===question.title)
        { 
            question.responses.push({
                name: commentatorNameNode.value,
                description: commentNode.value
            })
        }
        return question;
     })
     localStorage.setItem("questions",JSONstringify(revisedQuestions))
}
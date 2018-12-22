$(document).on("click", ".collapse-toggle", function(event) {
  event.preventDefault();

  const formSib = $(this).siblings(".collapsed-element");
  const numCom = $(this).siblings(".collapsed-element").children("div.card").length;
  let dispTxt;
  if (formSib.hasClass("new")) {
    dispTxt = formSib.hasClass("show") ? "-" : "+";
  } else if (formSib.hasClass("existing")) {
    dispTxt = numCom + " Comments";
  }
  $(this).text(dispTxt);
  if (formSib.hasClass("show")) {
    formSib.removeClass("show");
  } else {
    formSib.addClass("show");
  }
  $(this).text(dispTxt);
});

$(document).on("click", ".comment-submit", function(event) {
  event.preventDefault();
  const newComment = {
    author: $(this).siblings(".form-group").find("input.author").val(),
    body: $(this).siblings(".form-group").find("textarea.body").val()
  }

  $.ajax("/submit", {
    method: "POST",
    data: {
      comment: newComment,
      id: $(this).siblings(".form-group").find("input.article-id").val()
    }
  });
  location.reload();
});

setInterval(function(){ 
  $.ajax("/scrape", {
    method: "GET"
  });
}, 1320000);

$(document).on("click", ".collapse-toggle", function(event) {
  event.preventDefault();

  const formSib = $(this).siblings(".collapsed-element");
  const numCom = formSib.find("div.card").length();
  if (formSib.hasClass("show")) {
    formSib.removeClass("show");
    $(this).text("Comments");
  } else {
    formSib.addClass("show");
    $(this).text(numCom + "Comments");
  }
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

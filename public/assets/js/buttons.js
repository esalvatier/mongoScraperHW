$(document).on("click", ".collapse-toggle", function(event) {
  event.preventDefault();
  const formSib = $(this).siblings(".collapsed-element");
  if (formSib.hasClass("show")) {
    formSib.removeClass("show");
    $(this).text("+");
  } else {
    formSib.addClass("show");
    $(this).text("-");
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
  console.log($(this).siblings(".form-group").find("input.article-id").val());
  console.log(newComment);
});
const getValue = (id) => {
  return document.getElementById(id).value;
}

const deleteDataTextarea = (id, data) => {
  return document.getElementById(id).value = data;
}

const insertInHTML = (id, data) => {
  return document.getElementById(id).innerHTML += data;
}

const dataJson = (comment) => {
  let publication = {
    comment: comment
  };
  return publication;
}

const insertComment = () => {
  let comentario = getValue('comment');
  let publicationArray = dataJson(comentario);
  console.log(publicationArray);
  let commentCollection = firebase.database().ref('commentCollection/' + comentario);
  commentCollection.set(publicationArray);
  deleteDataTextarea('comment', '');
}

const commentContainer = (comment) => {
  return '<div class="contenedorDeComentarios">'+ comment + '<a href="#" class="btn-delete badge badge-danger"><i class="fas fa-trash-alt"></i></a>'+'</div>'
}

const obsCommentCollection = () => {
  let commentCollection = firebase.database().ref('commentCollection/');
  console.log(commentCollection);
  commentCollection.on('child_added', function(data){
      let commentCollectionValue = data.val(); 
      console.log('commentCollectionValue:' + commentCollectionValue);
      let result = commentContainer(commentCollectionValue.comment);
      insertInHTML('container-comments', result);
  });
}